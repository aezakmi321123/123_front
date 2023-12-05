import { isEmpty } from "lodash";
import { defineStore } from 'pinia';

import { cMessage } from '../heplers/message';
import { i18n } from "../main.js";
import rest from '../rest';
export const usePaymentStore = defineStore('payment', {
    state: () => ({
        isLoading: false,
        payment: {},
    }),
    actions: {
        async getPayment(id) {
            try {
                this.isLoading = true

                const { data } = await rest.payment.getPayment(id);

               if (isEmpty(data)){
                   this.$router.push('/')
                   return
               }

                this.payment = data;
            } catch (e) {
                cMessage('error', i18n.t('apiErrors.common'))
                console.log(e);
            } finally {
                this.isLoading = false;
            }
        },
        async generatePayment(params) {
            try {
                this.isLoading = true

                const { data } = await rest.payment.generatePayment(params);

                this.$router.push(`/payment/${data.id}`)
            } catch (e) {
                cMessage('error', i18n.t('apiErrors.common'))
                console.log(e);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
