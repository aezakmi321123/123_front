import { defineStore } from 'pinia';

// import { cMessage } from '../heplers/message';
import rest from '../rest';
export const useWalletStore = defineStore('wallet', {
  state: () => ({
    coins: [],
  }),
  actions: {
    async getCoins() {
      try {
        const { data } = await rest.wallet.getCoins();
        this.coins = data;
      } catch (e) {
        // console.log(e);
      }
    },
    // async signIn(params) {
    //   try {
    //     const { data } = await rest.auth.login(params);
    //     cMessage('success', 'success');
    //     this.user = data;
    //     this.isLoggedIn = true;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // async logOut() {
    //   try {
    //     await rest.auth.logout();
    //     this.isLoggedIn = false;
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // async updateUser(data) {
    //   try {
    //     await rest.auth.updateUser(data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // async confirmEmail(params) {
    //   try {
    //     const { data } = await rest.auth.confirmEmail(params);
    //     cMessage('success', data.message);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
    // async confirmEmailCode(params) {
    //   try {
    //     await rest.auth.confirmEmailCode(params);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // },
  },
  persist: true,
});
