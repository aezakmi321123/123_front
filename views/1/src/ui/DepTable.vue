<template>
  <div class="wallet_table">
    <a-table
      :data-source="props.data"
      :columns="props.cols"
      :pagination="false"
      :loading="props.loading"
      row-key="id"
      :scroll="{ x: true }"
    >
    </a-table>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
  props: {
    cols: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { t } = useI18n();
    const hideBalances = ref(false);
    const search = ref('');

    return {
      search,
      hideBalances,
      t,
      props,
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
