<template>
  <div class="wallet_table">
    <a-row class="wallet_table__filters">
      <a-col class="wallet_table__search">
        <CInput v-model:value="search" :placeholder="t('wallets.search')">
          <template #prefix>
            <SearchOutlined
              :style="{ fontSize: '20px', color: 'var(--text-link)' }"
            />
          </template>
        </CInput>
      </a-col>
      <a-col class="wallet-table__switch">
        <div>{{ t('wallets.hide_zero') }}</div>
        <CSwitch v-model:checked="hideBalances" />
      </a-col>
    </a-row>
    <a-table
      :data-source="source"
      :columns="columns"
      :pagination="false"
      row-key="id"
      :custom-row="customRow"
      :row-class-name="customRowClassName"
      :loading="isUserLoading"
      :scroll="{ x: true }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <CoinInfo :abbr="record.abbr" :name="record.name"/>
        </template>
        <template v-if="column.dataIndex === 'coinQuantity'">
          <a-flex vertical>
            <a-typography-paragraph class="text-nowrap text-primary mb-0">{{
              record.coinQuantity
            }}</a-typography-paragraph>
            <a-typography-paragraph class="text-nowrap text-grey mb-0"
              >{{ getCoinData(record).price }}$</a-typography-paragraph
            >
          </a-flex>
        </template>
        <template v-if="column.dataIndex === 'change'">
          <a-typography-paragraph
            :class="getCoinData(record).class"
            class="mb-0 text-nowrap"
          >
            {{ getCoinData(record).change }}
          </a-typography-paragraph>
        </template>
        <template v-if="column.dataIndex === 'rate'">
          <a-typography-paragraph
            :class="getCoinData(record).class"
            class="mb-0 text-nowrap"
          >
            {{ getCoinData(record).rate }}
          </a-typography-paragraph>
        </template>
        <template v-if="column.dataIndex === 'direction'">
          <a-typography-paragraph
            :class="getCoinData(record).class"
            class="mb-0 text-nowrap"
          >
            <ArrowUpOutlined v-if="getCoinData(record).icon === 'up'" />
            <ArrowDownOutlined v-if="getCoinData(record).icon === 'down'" />
          </a-typography-paragraph>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue';
import { isEmpty } from 'lodash';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../modules/auth.js';
import { useWalletStore } from '../modules/wallet.js';
import CInput from '../ui/CInput.vue';
import CSwitch from '../ui/CSwitch.vue';
import CoinInfo from "./CoinInfo.vue";
export default {
  components: {
    CoinInfo,
    CInput,
    CSwitch,
    SearchOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
  props: {
    coin: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['pushCoin'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const walletsStore = useWalletStore();
    const hideBalances = ref(false);
    const search = ref('');
    const dataSource = computed(() => authStore.user.coins);
    const isUserLoading = computed(() => authStore.isLoading);
    const source = computed(() => {
      const dataWithNoZeroBalances = hideBalances.value
        ? dataSource.value.filter(({ coinQuantity }) => +coinQuantity > 0)
        : dataSource.value;

      return dataWithNoZeroBalances.filter(({ abbr, name }) => {
        const newSearch = search.value.toLowerCase();
        const newName = name.toLowerCase();
        const newAbbr = abbr.toLowerCase();
        return newAbbr.includes(newSearch) || newName.includes(newSearch);
      });
    });
    const columns = [
      {
        title: t('wallets.name'),
        dataIndex: 'name',
      },
      {
        title: t('wallets.qty'),
        className: 'column-money',
        dataIndex: 'coinQuantity',
      },
      {
        title: t('wallets.rate'),
        dataIndex: 'rate',
        className: 'column-rate',
      },
      {
        title: t('wallets.change'),
        dataIndex: 'change',
        className: 'column-change',
      },
      {
        title: t('wallets.direction'),
        dataIndex: 'direction',
      },
    ];
    const rowSelect = e => {
      console.log(e);
    };
    const customRow = record => {
      return {
        onClick: () => {
          emit('pushCoin', record);
        },
      };
    };
    const customRowClassName = record => {
      return props.coin?.abbr === record.abbr ? 'active' : '';
    };
    watch(
      source,
      () => {
        if (source.value.length && isEmpty(props.coin)) {
          emit('pushCoin', source.value[0]);
        }
      },
      { deep: true, immediate: true },
    );
    const socketCoinsData = computed(() => walletsStore.wsData.coins);

    const getCoinData = record => {
      if (record.abbr === 'USDT') {
        return {
          change: '0%',
          class: 'text-primary',
          price: (parseFloat(record.coinQuantity) || 0).toFixed(6),
          icon: null,
          rate: 1,
        };
      }

      const currentData = socketCoinsData.value[record.abbr];
      const price = (
        parseFloat(currentData?.c || 0) * parseFloat(record.coinQuantity)
      ).toFixed(6);

      return currentData?.P?.indexOf?.('-')
        ? {
            change: `+${currentData?.P}%`,
            class: 'text-green',
            price,
            rate: parseFloat(currentData?.c || 0).toFixed(6),
            icon: 'up',
          }
        : {
            change: `${currentData?.P}%`,
            class: 'text-red',
            price,
            rate: parseFloat(currentData?.c || 0).toFixed(6),
            icon: 'down',
          };
    };

    return {
      columns,
      source,
      search,
      hideBalances,
      customRow,
      rowSelect,
      t,
      customRowClassName,
      isUserLoading,
      socketCoinsData,
      getCoinData,
    };
  },
};
</script>
<style lang="scss">
.wallet_table {
  display: flex;
  flex-direction: column;
  gap: 20px;

  & .column-money {
    width: 250px;
  }

  & .column-rate {
    width: 200px;
  }

  & .column-change {
    width: 250px;
  }
}
.wallet_table__filters {
  display: flex;
  gap: 50px;
  justify-content: space-between;
  align-items: center;
}
.wallet_table__search {
  //   width: 50%;
}
.wallet-table__switch {
  display: flex;
  gap: 20px;
}
.ant-table-cell::before {
  background-color: var(--bg-base) !important;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr:last-child > td {
  border-bottom: 1px solid var(--bg-base) !important;
}

.ant-table-thead > tr > th {
  background: var(--button-primary) !important;
  color: var(--text-link) !important;
}
:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper
  .ant-table-tbody
  > tr.ant-table-row:hover
  > td,
:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper
  .ant-table-tbody
  > tr
  > td.ant-table-cell-row-hover {
  background: var(--bg-select);
}
.ant-table-tbody > tr > td {
  cursor: pointer;
  color: var(--text-primary);
  border-top: 1px solid var(--bg-base) !important;
}
.ant-table {
  background: var(--bg-input) !important;
}
:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper
  .ant-table-tbody
  > :is(tr.ant-table-placeholder:hover, tr.ant-table-row.active)
  > td {
  background: var(--bg-select);
}
.ant-empty-normal {
  color: var(--text-link);
}
</style>
