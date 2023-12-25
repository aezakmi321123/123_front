<template>
  <CHeader />
  <main>
    <router-view />
  </main>
  <CFooter />
</template>
<script>
import { Modal } from 'ant-design-vue';
import money from 'money';
import { onBeforeUnmount, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import CFooter from './components/Footer/index.vue';
import CHeader from './components/Header/index.vue';
import { cMessage } from './heplers/message.js';
import { useAuthStore } from './modules/auth.js';
import { useExchangeStore } from './modules/exchange.js';
import { useWalletStore } from './modules/wallet.js';
// import rest from './rest/index';
// import rest from './rest/index.js';
export default {
  components: {
    CHeader,
    CFooter,
  },
  setup() {
    const wallet = useWalletStore();
    const exchange = useExchangeStore();
    const auth = useAuthStore();
    const { t } = useI18n();
    const { push } = useRouter();

    onMounted(async () => {
      await wallet.getCoins();
      // const arr = rest.wallet.getRuble();
      console.log(money(1000).from('USD').to('GBP'));
      // money(1)

      wallet.bindEvents();
    });
    onBeforeUnmount(() => {
      wallet.disconnect();
    });

    watch(
      () => auth.isLoggedIn && exchange.pendingExchange,
      () => {
        if (auth.isLoggedIn && exchange.pendingExchange) {
          const {
            valueNumberReceive,
            valueNumberSend,
            valueReceive,
            valueSend,
          } = exchange.pendingExchange;

          Modal.confirm({
            title: t('exchangeConfirm.title'),
            content: t('exchangeConfirm.content', {
              coinFrom: `${valueNumberSend}${valueSend?.value}`,
              coinTo: `${valueNumberReceive}${valueReceive?.value}`,
            }),
            wrapClassName: 'exchangeConfirm',
            onOk() {
              if (
                auth.user.coins.some(
                  ({ abbr, coinQuantity }) =>
                    abbr === valueSend?.value &&
                    parseFloat(coinQuantity) < parseFloat(valueNumberSend),
                )
              ) {
                cMessage('error', t('exchangeConfirm.notEnoughError'));
                exchange.setPendingExchange(null);
                push('/wallets');
                return;
              }

              push('/exchange');
            },
            onCancel() {
              exchange.setPendingExchange(null);
            },
          });
        }
      },
      { immediate: true },
    );

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

.exchangeConfirm {
  .ant-modal-content {
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
    border-radius: 14px;

    .ant-modal-confirm-title {
      font-size: var(--fs-6);
    }

    .ant-modal-confirm-content {
      font-weight: 600;
    }

    .ant-modal-confirm-title,
    .ant-modal-confirm-content {
      color: var(--text-primary);
    }

    .ant-btn-default {
      background: var(--text-danger);
      color: var(--text-primary);
      border: none;
      font-weight: 600;
    }

    .ant-btn-primary {
      background: var(--icon-green);
      color: var(--text-primary);
      border: none;
      font-weight: 600;
    }
  }
}
</style>
