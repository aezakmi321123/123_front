<template>
  <div class="container">
    <a-col :lg="12">
      <div class="transfer-card">
        <a-tabs
          v-model:activeKey="activeKey"
          centered
          size="large"
          type="card"
          class="wallets__tabs"
        >
          <a-tab-pane
            key="1"
            :tab="t('history.deposits')"
            class="wallets__tab"
          />

          <a-tab-pane
            key="2"
            :tab="t('history.withdraws')"
            class="wallets__tab"
          />
          <a-tab-pane
            key="3"
            :tab="t('history.exchanges')"
            class="wallets__tab"
          />
        </a-tabs>
      </div>
    </a-col>
    <DepTable :loading="loading" :cols="reactiveCols" :data="arr" />
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { computed, h, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../modules/auth';
import rest from '../rest/index';
import DepTable from '../ui/DepTable.vue';
export default {
  components: {
    DepTable,
  },
  setup() {
    const { user } = useAuthStore();
    const activeKey = ref('1');
    const { t } = useI18n();
    const arr = ref([]);
    const loading = ref(false);
    const requestObj = key => {
      const obj = {
        1: rest.payment.getPayments,
        2: rest.withdraw.getWithdrawals,
        3: rest.wallet.getExchangeInfo,
      };
      return obj[key](user.id);
    };
    watch(
      () => activeKey.value,
      async val => {
        loading.value = true;
        const { data } = await requestObj(val).finally(
          () => (loading.value = false),
        );
        arr.value = cloneDeep(data);
      },
      { immediate: true },
    );
    const cols = {
      1: [
        {
          title: 'id',
          dataIndex: 'id',
        },
        {
          title: t('history.currency'),
          dataIndex: 'currency',
        },
        {
          title: t('history.status'),
          dataIndex: 'status',
        },
        {
          title: t('history.address'),
          dataIndex: 'address',
        },
        {
          title: t('history.fullAmount'),
          dataIndex: 'fullAmount',
        },
        {
          title: t('history.usdtAmount'),
          dataIndex: 'fullAmountInUsdt',
        },
        {
          title: t('history.created'),
          dataIndex: 'dataCreated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
        {
          title: t('history.updated'),
          dataIndex: 'dataUpdated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
      ],
      2: [
        {
          title: 'id',
          dataIndex: 'id',
        },
        {
          title: t('history.currency'),
          dataIndex: 'currency',
        },
        {
          title: t('history.status'),
          dataIndex: 'status',
        },
        {
          title: t('history.address'),
          dataIndex: 'address',
        },
        {
          title: t('history.fullAmount'),
          dataIndex: 'fullAmount',
        },
        {
          title: t('history.usdtAmount'),
          dataIndex: 'fullAmountInUsdt',
        },
        {
          title: t('history.created'),
          dataIndex: 'dataCreated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
        {
          title: t('history.updated'),
          dataIndex: 'dataUpdated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
      ],
      3: [
        {
          title: 'id',
          dataIndex: 'id',
        },
        {
          title: t('history.coinFrom'),
          dataIndex: 'coinFrom',
        },
        {
          title: t('history.coinTo'),
          dataIndex: 'coinTo',
        },
        {
          title: t('history.quantityFrom'),
          dataIndex: 'quantityFrom',
        },
        {
          title: t('history.quantityTo'),
          dataIndex: 'quantityTo',
        },
        {
          title: t('history.created'),
          dataIndex: 'dataCreated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
        {
          title: t('history.updated'),
          dataIndex: 'dataUpdated',
          customRender(el) {
            return h('div', moment(el.value).format('YYYY-MM-DD HH:mm:ss'));
          },
        },
      ],
    };
    const reactiveCols = computed(() => cols[activeKey.value]);
    return {
      t,
      reactiveCols,
      activeKey,
      arr,
      loading,
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
  position: sticky;
  top: 120px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  border-radius: 14px;

  &__content-wrapper {
    padding: 20px;
  }
}

.wallets {
  &__tabs {
    & .ant-tabs-nav {
      margin-bottom: 0;
      & .ant-tabs-nav-wrap {
        border-radius: 14px 14px 0 0;
        background: var(--button-primary) !important;
      }
    }

    & .ant-tabs-tab {
      background: transparent !important;
    }
  }
}
</style>
