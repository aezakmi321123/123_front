<template>
  <a-auto-complete style="width: 100%" class="c-autocomplete" v-bind="$attrs">
    <template #option="{ value }">
      <div class="aligned">
        <CryptoIcon :size="24" :name="value.toLowerCase()" />
        <div>{{ value }}</div>
      </div>
    </template>
    <a-input :bordered="false">
      <template #suffix>
        <CaretDownFilled :style="{ 'font-size': '14px' }" />
      </template>
    </a-input>
  </a-auto-complete>
</template>
<script>
import { CaretDownFilled } from '@ant-design/icons-vue';
export default {
  components: {
    CaretDownFilled,
  },
};
</script>
<style lang="scss">
/* clears the ‘X’ from Internet Explorer */
.c-autocomplete {
  .ant-input {
    font-size: 20px !important;
    color: var(--text-primary) !important;
    font-weight: 700 !important;
    height: 50px !important;
  }
  .ant-select-selector {
    background-color: transparent !important;
    border: 0px;
    height: 50px !important;
  }
}
.ant-select-selection-search-input {
  font-size: 20px !important;
  color: var(--text-primary) !important;
  font-weight: 700 !important;
  height: 50px !important;
}
.ant-select-dropdown {
  background: var(--bg-select-options) !important;
  .ant-select-item {
    color: var(--text-tertiary) !important;
    font-size: 16px;
  }
}
.ant-select-open {
  .ant-select-selector {
    background-color: var(--bg-select-options) !important;
  }
}
.aligned {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
