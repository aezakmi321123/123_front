<template>
  <div class="container">
    <div class="wallet_table">
      <div class="wallet_table__filters">
        <div class="wallet_table__search">
          <CInput v-model:value="search" placeholder="Search wallets...">
            <template #suffix>
              <UserOutlined />
            </template>
          </CInput>
        </div>
        <div class="wallet-table__switch">
          <div>Hide zero balances</div>
          <CSwitch v-model:checked="hideBalances" />
        </div>
      </div>
      <a-table :data-source="source" :columns="columns" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <div class="d-flex">
              <CryptoIcon :size="24" :name="record.abbr.toLowerCase()" />
              <a> {{ record.name }} </a>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { computed, ref } from 'vue';

import { useAuthStore } from '../modules/auth.js';
import CInput from '../ui/CInput.vue';
import CSwitch from '../ui/CSwitch.vue';
export default {
  components: {
    CInput,
    CSwitch,
    UserOutlined,
  },
  setup() {
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
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'QTY',
        className: 'column-money',
        dataIndex: 'coinQuantity',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];
    return {
      columns,
      source,
      search,
      hideBalances,
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
:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper
  .ant-table-tbody
  > tr.ant-table-row:hover
  > td,
:where(.css-dev-only-do-not-override-kqecok).ant-table-wrapper
  .ant-table-tbody
  > tr
  > td.ant-table-cell-row-hover {
  background: var(--bg-input);
}
.ant-table-tbody > tr > td {
  border-top: 1px solid var(--bg-base) !important;
}
.ant-table {
  background: var(--bg-input) !important;
}
.d-flex {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
