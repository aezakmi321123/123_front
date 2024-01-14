<template>
  <a-select class="c-autocomplete" v-bind="$attrs">
    <template #option="{ value }">
      <div class="aligned">
        <img
          :style="{ width: '26px', height: '26px' }"
          :src="getImageUrl(value)"
        />
        <div>{{ value.toUpperCase() }}</div>
      </div>
    </template>
    <template #suffixIcon>
      <CaretDownFilled
        :style="{ 'font-size': '14px', color: '#fff' }"
      /> </template
  ></a-select>
</template>
<script>
import { CaretDownFilled } from '@ant-design/icons-vue';
export default {
  components: {
    CaretDownFilled,
  },
  setup() {
    const getImageUrl = name => {
      return new URL(
        `/public/assets/${name.toLowerCase()}.svg`,
        import.meta.url,
      ).href;
    };
    return { getImageUrl };
  },
};
</script>
<style lang="scss">
.ant-select-arrow .anticon:not(.ant-select-suffix) {
  pointer-events: none !important;
}
.ant-select-selection-item {
  font-size: 20px !important;
  color: var(--text-primary) !important;
  font-weight: 700 !important;
  display: flex;
  align-items: center;
}
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
