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
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <a-flex gap="10" align="center">
            <CryptoIcon :size="40" :name="record.abbr.toLowerCase()" />
            <a-flex vertical>
              <div>{{ record.abbr }}</div>
              <div>{{ record.name }}</div>
            </a-flex>

          </a-flex>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { SearchOutlined } from '@ant-design/icons-vue';
import { isEmpty } from "lodash";
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../modules/auth.js';
import CInput from '../ui/CInput.vue';
import CSwitch from '../ui/CSwitch.vue';
export default {
  components: {
    CInput,
    CSwitch,
    SearchOutlined,
  },
  props: {
    coin: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['pushCoin'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const hideBalances = ref(false);
    const search = ref('');
    const dataSource = ref(authStore.user.coins);
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
        dataIndex: 'address',
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
    const customRowClassName = (record) => {
      return props.coin?.abbr === record.abbr ? 'active' : ''
    }
    watch(source, () => {
      if (source.value.length && isEmpty(props.coin)) {
        emit('pushCoin', source.value[0])
      }
    }, { deep: true, immediate: true });

    return {
      columns,
      source,
      search,
      hideBalances,
      customRow,
      rowSelect,
      t,
      customRowClassName
    };
  },
};
</script>
<style lang="scss">
.wallet_table {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
