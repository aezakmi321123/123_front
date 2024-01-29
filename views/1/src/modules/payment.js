import { isEmpty } from 'lodash';
import { defineStore } from 'pinia';

import { handleAxiosError } from '../heplers/error.js';
import rest from '../rest';
export const usePaymentStore = defineStore('payment', {
  state: () => ({
    isLoading: false,
    payment: {},
  }),
  actions: {
    async getPayment(id) {
      try {
        this.isLoading = true;

        const { data } = await rest.payment.getPayment(id);

        if (isEmpty(data)) {
          this.$router.push('/');
          return;
        }

        this.payment = data;
      } catch (e) {
        handleAxiosError(e);
        this.$router.push('/');
      } finally {
        this.isLoading = false;
      }
    },
    async generatePayment(params) {
      try {
        this.isLoading = true;

        const { data } = await rest.payment.generatePayment(params);

        this.$router.push({
          path: `/payment/${data.id}`,
          query: { deposit: true },
        });
      } catch (e) {
        handleAxiosError(e);
      } finally {
        this.isLoading = false;
      }
    },
    async getUnauthPayment(id) {
      try {
        this.isLoading = true;

        const { data } = await rest.payment.getUnauthPayment(id);

        if (isEmpty(data)) {
          this.$router.push('/');
          return;
        }

        this.payment = data;
      } catch (e) {
        handleAxiosError(e);
        this.$router.push('/');
      } finally {
        this.isLoading = false;
      }
    },
    async generateUnauthPayment(params) {
      try {
        this.isLoading = true;

        const { data } = await rest.payment.generateUnauthPayment(params);

        this.$router.push(`/payment/${data.id}`);
      } catch (e) {
        if (e.response.data.message === 'min_dep_error') {
          return handleAxiosError(e, 'min_dep_error');
        }
        handleAxiosError(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
