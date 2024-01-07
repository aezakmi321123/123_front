import { orderBy } from 'lodash';
import { defineStore } from 'pinia';

import { handleAxiosError } from '../heplers/error.js';
import { cMessage } from '../heplers/message';
import { i18n } from '../main.js';
import rest from '../rest';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    isLoading: false,
  }),
  actions: {
    async refreshTokens() {
      try {
        const { data } = await rest.auth.refreshTokens();
        if (!data) {
          return await this.logOut()
        }
        this.isLoggedIn = true
      } catch (e) {
        await this.logOut();
        handleAxiosError(e);
      }
    },
    async signUp(params) {
      try {
        const { data } = await rest.auth.register(params);
        cMessage('success', i18n.t('success'));
        this.user = data;
        this.isLoggedIn = true;
      } catch (e) {
        handleAxiosError(e);
      }
    },
    async signIn(params) {
      try {
        const { data } = await rest.auth.login(params);
        cMessage('success', i18n.t('success'));
        this.user = data;
        this.isLoggedIn = true;
      } catch (e) {
        handleAxiosError(e);
      }
    },
    async logOut() {
      try {
        await rest.auth.logout();
      } catch (e) {
        handleAxiosError(e);
      } finally {
        this.isLoggedIn = false;
        this.user = null;
        this.$router.push({ path: '/' });
      }
    },
    async updateUser(data) {
      try {
        await rest.auth.updateUser(data);
        cMessage('success', i18n.t('success'));
      } catch (e) {
        handleAxiosError(e);
      }
    },
    async getUser() {
      this.isLoading = true;
      if (!this.isLoggedIn) return;
      try {
        const { data } = await rest.auth.getUser(this.user.id);
        this.user = data;
        this.user.coins = orderBy(this.user.coins, 'type', 'desc')
      } catch (e) {
        handleAxiosError(e);
      } finally {
        this.isLoading = false;
      }
    },
    async confirmEmail(params) {
      try {
        const { data } = await rest.auth.confirmEmail(params);
        cMessage('success', data.message);
      } catch (e) {
        handleAxiosError(e);
      }
    },
    async confirmEmailCode(params) {
      try {
        await rest.auth.confirmEmailCode(params);
      } catch (e) {
        handleAxiosError(e);
      }
    },
  },
  persist: true,
});
