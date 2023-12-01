import { isEmpty } from "lodash";
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";

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

                const router = useRouter()

                const { data } = await rest.payment.getPayment(id);

               if (isEmpty(data)){
                   router.push('/')
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
    },
});
