<template>
  <a-select style="width: 100%" class="c-autocomplete" v-bind="$attrs">
    <template #option="{ value, label, type }">
      <div class="aligned">
        <CryptoIcon
          v-if="!country && type === 'crypto'"
          :size="24"
          :name="value.toLowerCase()"
        />

        <img
          v-if="!country && type === 'fiat'"
          :style="{ width: '26px' }"
          :src="`${value.toLowerCase()}.svg`"
        />
        <div>{{ country ? label : value }}</div>
      </div>
    </template>
    <template #suffixIcon>
      <CaretDownFilled :style="{ 'font-size': '14px', color: '#fff' }" />
    </template>
  </a-select>
</template>
<script>
import { CaretDownFilled } from '@ant-design/icons-vue';
export default {
  components: {
    CaretDownFilled,
  },
  props: {
    country: {
      type: Boolean,
      default: false,
    },
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
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border: 1px solid transparent !important;
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
