<template>
  <CHeader />
  <main>
    <router-view />
  </main>
  <CFooter />
</template>
<script>
import { onBeforeUnmount, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import CFooter from './components/Footer/index.vue';
import CHeader from './components/Header/index.vue';
import { useWalletStore } from './modules/wallet.js';
// import rest from './rest/index.js';
export default {
  components: {
    CHeader,
    CFooter,
  },
  setup() {
    const wallet = useWalletStore();
    // const auth = useAuthStore();
    const { t } = useI18n();
    onMounted(async () => {
      await wallet.getCoins();

      wallet.bindEvents();
    });

    onBeforeUnmount(() => {
      wallet.disconnect();
    });

    return {
      t,
    };
  },
};
</script>
<style lang="scss">
main {
  margin-top: 50px;
  width: 100%;
}
</style>
