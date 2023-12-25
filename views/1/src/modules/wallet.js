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
        const { data: ruble } = await rest.wallet.getRuble();
        console.log(data);
        this.coins = orderBy(data, 'type', 'desc').map(el => {
          if (el.abbr === 'RUB') {
            return {
              ...el,
              price24: ruble.RAW.USD.RUB.CHANGE24HOUR || 0,
              price: ruble.RAW.USD.RUB.PRICE || 90,
            };
          } else {
            return el;
          }
        });
      } catch (e) {
        handleAxiosError(e);
      } finally {
        this.isLoading = false;
      }
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

        if (data.e === '24hrTicker') {
          this.wsData.coins = {
            ...this.wsData.coins,
            [data.s.slice(0, -4)]: { ...data },
          };
        }
      });
    },
    disconnect() {
      socket.close();
    },
  },
});
