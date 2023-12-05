import { defineStore } from 'pinia';

import { cMessage } from '../heplers/message';
import { i18n } from "../main.js";
import rest from '../rest';
export const useWithdrawStore = defineStore('withdraw', {
    state: () => ({
        isLoading: false,
    }),
    actions: {
        async generateWithdraw(params) {
            try {
                this.isLoading = true

                const { data } = await rest.withdraw.generateWithdraw(params)

                cMessage('success', i18n.t('wallets.withdrawSuccess', { withdrawId: data?.id }))

            } catch (e) {
                cMessage('error', i18n.t('apiErrors.common'))
                console.log(e);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
