import { orderBy } from 'lodash';
import { defineStore } from 'pinia';

import { socket } from '../data/socket.js';
import { handleAxiosError } from '../heplers/error.js';
// import { cMessage } from '../heplers/message';
import rest from '../rest';

const websocketUrl = 'wss://stream.binance.com:9443/ws';
export const useWalletStore = defineStore('wallet', {
  state: () => ({
    isLoading: false,
    coins: [],
    rates: {},
    wsData: {
      isConnected: false,
      coins: {},
    },
  }),
  actions: {
    async getCoins() {
      this.isLoading = true;
      try {
        const { data } = await rest.wallet.getCoins();

        this.coins = orderBy(data, 'type', 'desc');
      } catch (e) {
        handleAxiosError(e);
      } finally {
        this.isLoading = false;
      }
    },
    async getRubble() {
      const {
        data: { RAW },
      } = (await rest.wallet.getRuble()) ?? {
        data: { RAW: { RUB: { USD: null } } },
      };

      if (!RAW.RUB.USD) {
        return;
      }

      const {
        FROMSYMBOL,
        TOSYMBOL,
        CHANGE24HOUR,
        CHANGEPCT24HOUR,
        MEDIAN,
        PRICE,
        LASTVOLUME,
        OPEN24HOUR,
        HIGH24HOUR,
        LOW24HOUR,
        VOLUME24HOUR,
        VOLUME24HOURTO,
        LASTTRADEID,
        TOTALVOLUME24H,
        LASTUPDATE,
      } = RAW.RUB.USD;

      const c = (typeof RAW.PRICE === 'number' ? PRICE : parseFloat(PRICE)) * (this.rates?.RUB || 1);

      this.wsData.coins = {
        ...this.wsData.coins,
        [FROMSYMBOL]: {
          e: '[cryptocompare] 5',
          E: Date.now(),
          s: `${TOSYMBOL}${FROMSYMBOL}`,
          p: CHANGE24HOUR.toString(),
          P: CHANGEPCT24HOUR.toString(),
          w: MEDIAN.toString(),
          x: OPEN24HOUR.toString(),
          c: c.toString(),
          Q: LASTVOLUME.toString(),
          b: HIGH24HOUR.toString(),
          B: '',
          a: HIGH24HOUR.toString(),
          A: '',
          o: OPEN24HOUR.toString(),
          h: HIGH24HOUR.toString(),
          l: LOW24HOUR.toString(),
          v: VOLUME24HOUR.toString(),
          q: VOLUME24HOURTO.toString(),
          O: LASTUPDATE,
          C: null,
          F: null,
          L: LASTTRADEID,
          n: TOTALVOLUME24H,
          time: LASTUPDATE,
        },
      };
    },
    setRates(rates) {
      this.rates = rates;
    },
    bindEvents() {
      socket.init(websocketUrl);

      socket.addEventListener('open', () => {
        this.wsData.isConnected = true;
        const params = this.coins
          .filter(({ abbr }) => abbr.toLowerCase() !== 'usdt')
          .map(({ abbr }) => `${abbr?.toLowerCase()}usdt@ticker`);

        socket.send(JSON.stringify({ method: 'SUBSCRIBE', params, id: 1 }));
      });
      socket.addEventListener('close', () => {
        this.wsData.isConnected = false;
      });
      socket.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        const symbol = data.s?.replace('USDT', '');
        const c = parseFloat(data?.c) * this.rates[symbol];

        if (data.e === '24hrTicker') {
          this.wsData.coins = {
            ...this.wsData.coins,
            [symbol]: { ...data, c },
          };
        }
      });
    },
    disconnect() {
      socket.close();
    },
  },
});
