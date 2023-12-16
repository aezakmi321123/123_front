import { defineStore } from 'pinia';

import { socket } from "../data/socket.js";
import { cMessage } from "../heplers/message.js";
import { i18n } from "../main.js";
// import { cMessage } from '../heplers/message';
import rest from '../rest';

const websocketUrl = 'wss://stream.binance.com:9443/ws'
export const useWalletStore = defineStore('wallet', {
  state: () => ({
    isLoading: false,
    coins: [],
    wsData: {
      isConnected: false,
      coins: {}
    }
  }),
  actions: {
    async getCoins() {
      this.isLoading = true
      try {
        const { data } = await rest.wallet.getCoins();
        this.coins = data;
      } catch (e) {
        // console.log(e);
      }finally {
        this.isLoading = false
      }
    },
    async exchange(params) {
      try {
        await rest.wallet.exchange(params);
        cMessage('success', i18n.t('exchange.success'));
      } catch (e) {
        cMessage(
            'error',
            e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
      }
    },
    bindEvents() {
      socket.init(websocketUrl)

      socket.addEventListener("open", () => {
        this.wsData.isConnected = true;
        const params = this.coins.filter(({ abbr }) => abbr.toLowerCase() !== 'usdt').map(({ abbr }) => `${abbr?.toLowerCase()}usdt@ticker`)

        socket.send(JSON.stringify({ method: "SUBSCRIBE", params, id: 1 }))
      });
      socket.addEventListener("close", () => {
        this.wsData.isConnected = false;
      });
      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);

        if (data.e === '24hrTicker') {
          this.wsData.coins = { ...this.wsData.coins, [data.s.slice(0, -4)]: { ...data } }
        }
      });
    },
    disconnect(){
      socket.close()
    }
  },
  persist: false,
});
