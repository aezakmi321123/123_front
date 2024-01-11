import { defineStore } from 'pinia';

import { handleAxiosError } from "../heplers/error.js";
import rest from '../rest';
export const useDomainStore = defineStore('domain', {
    state: () => ({
        domain: {},
        isLoading: false
    }),
    actions: {
        async getDomain() {
            try {
                const { host } = window.location;

                this.isLoading = true
                const { data } = await rest.domain.getDomain(host);

                this.domain = data
            } catch (e) {
                handleAxiosError(e)
            } finally {
                this.isLoading = false
            }
        },
    },
    persist: true
});
