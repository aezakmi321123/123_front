<template>
  <div class="wallet_table">
    <a-table
      :data-source="source"
      :columns="columns"
      :pagination="false"
      row-key="id"
      :custom-row="customRow"
      :row-class-name="customRowClassName"
      :scroll="{ x: true }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <CoinInfo
            :abbr="record.abbr"
            :name="record.name"
            :type="record.type"
          />
        </template>
        <template v-if="column.dataIndex === 'coinQuantity'">
          <a-flex vertical>
            <a-typography-paragraph class="text-nowrap text-primary mb-0">{{
              record.coinQuantity
            }}</a-typography-paragraph>
            <a-typography-paragraph class="text-nowrap text-grey mb-0"
              >{{ getCoinData(record).price }}$
            </a-typography-paragraph>
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
            {{ getCoinData(record).rate }}$
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
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { computed, h, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useWalletStore } from '../modules/wallet.js';
import CButton from './CButton.vue';
import CoinInfo from './CoinInfo.vue';
export default {
  components: {
    CoinInfo,
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
  props: {
    limit: {
      type: Number,
      default: 5,
    },
  },
  emits: ['pushCoin'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const router = useRouter();
    const walletsStore = useWalletStore();
    const hideBalances = ref(false);
    const search = ref('');
    const dataSource = computed(() => walletsStore.coins.slice(0, props.limit));
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
        title: t('wallets.convert'),
        customRender() {
          return h(
            CButton,
            {
              type: 'secondary',
              onClick: () => router.push({ path: '/wallets' }),
            },
            t('wallets.convert'),
          );
        },
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
            class: record.type === 'crypto' ? 'text-green' : 'text-red',
            price,
            rate: parseFloat(currentData?.c || 0).toFixed(6),
            icon: 'up',
          }
        : {
            change: `${currentData?.P}%`,
            class: record.type === 'crypto' ? 'text-red' : 'text-green',
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
.ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {
  background-color: var(--button-primary) !important;
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
.ant-table-cell {
  background: var(--bg-input) !important;
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
