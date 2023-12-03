import { defineStore } from 'pinia';

import { cMessage } from '../heplers/message';
import rest from '../rest';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async refreshTokens() {
      try {
        const data = await rest.auth.refreshTokens();
        if (!data) await this.logOut();
      } catch (e) {
        console.log(e);
        await this.logOut();
      }
    },
    async signUp(params) {
      try {
        await rest.auth.register(params);
      } catch (e) {
        console.log(e);
      }
    },
    async signIn(params) {
      try {
        const { data } = await rest.auth.login(params);
        cMessage('success', 'success');
        this.user = data;
        this.isLoggedIn = true;
      } catch (e) {
        console.log(e);
      }
    },
    async logOut() {
      try {
        await rest.auth.logout();
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoggedIn = false;
        this.user = null;
        this.router.push({ path: '/' });
      }
    },
    async updateUser(data) {
      try {
        await rest.auth.updateUser(data);
        cMessage('success', 'success');
      } catch (e) {
        console.log(e);
      }
    },
    async getUser() {
      if (!this.isLoggedIn) return;
      try {
        const { data } = await rest.auth.getUser(this.user.id);
        console.log(data);
        this.user = data;
      } catch (e) {
        console.log(e);
      }
    },
    async confirmEmail(params) {
      try {
        const { data } = await rest.auth.confirmEmail(params);
        cMessage('success', data.message);
      } catch (e) {
        console.log(e);
      }
    },
    async confirmEmailCode(params) {
      try {
        await rest.auth.confirmEmailCode(params);
      } catch (e) {
        console.log(e);
      }
    },
  },
  persist: true,
});
