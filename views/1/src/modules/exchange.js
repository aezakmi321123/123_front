import { defineStore } from 'pinia';

import { handleAxiosError } from "../heplers/error.js";
import { cMessage } from "../heplers/message.js";
import { i18n } from "../main.js";
import rest from '../rest';
export const useExchangeStore = defineStore('exchange', {
    state: () => ({
        isLoading: false,
        pendingExchange: null,
    }),
    actions: {
        async exchange(params) {
            try {
                this.isLoading = true
                await rest.wallet.exchange(params);
                cMessage('success', i18n.t('exchange.success'));
            } catch (e) {
                handleAxiosError(e)
            }finally {
                this.isLoading = false
            }
        },
        setPendingExchange(exchange){
            this.pendingExchange = exchange
        },
    },
    persist: true
});
