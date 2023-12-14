import { defineStore } from 'pinia';

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
        if (!data) await this.logOut();
      } catch (e) {
        await this.logOut();
      }
    },
    async signUp(params) {
      try {
        const { data } = await rest.auth.register(params);
        cMessage('success', 'success');
        this.user = data;
        this.isLoggedIn = true;
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
      }
    },
    async signIn(params) {
      try {
        const { data } = await rest.auth.login(params);
        cMessage('success', 'success');
        this.user = data;
        this.isLoggedIn = true;
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
      }
    },
    async logOut() {
      try {
        await rest.auth.logout();
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
      } finally {
        this.isLoggedIn = false;
        this.user = null;
        this.$router.push({ path: '/' });
      }
    },
    async updateUser(data) {
      try {
        await rest.auth.updateUser(data);
        cMessage('success', 'success');
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
        console.log(e);
      }
    },
    async getUser() {
      this.isLoading = true;
      if (!this.isLoggedIn) return;
      try {
        const { data } = await rest.auth.getUser(this.user.id);
        this.user = data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isLoading = false;
      }
    },
    async confirmEmail(params) {
      try {
        const { data } = await rest.auth.confirmEmail(params);
        cMessage('success', data.message);
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
        console.log(e);
      }
    },
    async confirmEmailCode(params) {
      try {
        await rest.auth.confirmEmailCode(params);
      } catch (e) {
        cMessage(
          'error',
          e?.response?.data?.message || i18n.t('apiErrors.common'),
        );
        console.log(e);
      }
    },
  },
  persist: true,
});
