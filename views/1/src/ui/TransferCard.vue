<template>
  <div class="transfer-card">
    <a-tabs v-model:activeKey="activeKey" size="large" type="card" class="wallets__tabs">
      <a-tab-pane key="1" :tab="t('wallets.dep')" class="wallets__tab">
        <div class="transfer-card__content-wrapper">
          <DepositTab :coin="coin"/>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="t('wallets.withdraw')" class="wallets__tab">
        <div class="transfer-card__content-wrapper">
          <WithdrawTab :coin="coin" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>

</template>
<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DepositTab from "../components/Wallets/DepositTab.vue";
import WithdrawTab from "../components/Wallets/WithdrawTab.vue";

export default {
  components: {
    WithdrawTab,
    DepositTab,
  },
  props: {
    coin: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const activeKey = ref('1');
    const { t } = useI18n();

    return {
      activeKey,
      t,
    };
  },
};
</script>
<style lang="scss">
.info {
  display: flex;
  justify-content: space-between;
  color: var(--text-link);
  font-size: 16px;
  &:last-child {
    padding-bottom: 10px;
  }
}
.info-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ant-tabs-tab {
  background-color: var(--bg-select) !important;
  color: var(--text-primary);
  width: 100% !important;
  display: flex;
  border-bottom: 2px solid var(--bg-base) !important;
  justify-content: center;
}
.ant-tabs-tab-btn {
  width: 49% !important;
  text-align: center;
  font-size: 18px;

  font-weight: 500;
}
.ant-tabs-tab-active {
  border-bottom: 2px solid var(--button-secondary) !important;
  .ant-tabs-tab-btn {
    color: var(--button-secondary) !important;
  }
}
.ant-tabs-nav-list {
  width: 99% !important;
  display: flex;
  justify-content: space-between;
  overflow: hidden !important;
}
.select1 {
  .ant-input-affix-wrapper {
    background-color: var(--bg-input) !important;
  }
}
.transfer-card {

  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  border-radius: 14px;

  &__content-wrapper {
    padding: 20px;
  }
}

.wallets {
  &__tabs {

    & .ant-tabs-nav-wrap {
      border-radius: 14px 14px 0 0;
      background: var(--button-primary) !important;

      & .ant-tabs-nav-list {
        width: 100% !important;
      }
    }

    & .ant-tabs-tab {
      background: transparent !important;
    }
  }
}
</style>
