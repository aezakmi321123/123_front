<template>
  <a-select
    style="width: 100%"
    class="c-autocomplete"
    v-bind="$attrs"
    :options="mappedOptions"
    option-label-prop="title"
  >
    <template #option="{ value, label }">
      <div class="aligned">
        <img
          :style="{ width: '26px', height: '26px' }"
          :src="getImageUrl(value, false)"
        />
        <div>{{ label }}</div>
      </div>
    </template>
    <template #suffixIcon>
      <CaretDownFilled :style="{ 'font-size': '14px', color: '#fff' }" />
    </template>
  </a-select>
</template>
<script>
import { CaretDownFilled } from '@ant-design/icons-vue';
import { computed, h } from 'vue';

import { BANKS } from '../data/constants';
export default {
  components: {
    CaretDownFilled,
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const getImageUrl = (name, isCrypto = true) => {
      const url = isCrypto
        ? `../assets/icons/crypto/${name.toLowerCase()}.svg`
        : `../assets/icons/${name.toLowerCase()}.svg`;
      return new URL(url, import.meta.url).href;
    };
    const mapBanks = banks =>
      banks.map(el => ({
        label: BANKS[el.toLowerCase()],
        title: h(
          'div',
          { style: { display: 'flex', 'align-items': 'center', gap: '10px' } },
          [
            h('img', {
              src: getImageUrl(el, false),
              style: {
                width: '26px',
                height: '26px',
              },
            }),
            h('span', {}, BANKS[el.toLowerCase()]),
          ],
        ),
        value: el,
      }));
    const mappedOptions = computed(() => {
      return mapBanks(props.options);
    });
    return {
      mappedOptions,
      getImageUrl,
    };
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
}
:where(.css-dev-only-do-not-override-1qb1s0s).ant-select:not(
    .ant-select-customize-input
  )
  .ant-select-selector {
  border: unset !important;
}
.ant-select-selection-item {
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
.ant-select-arrow .anticon:not(.ant-select-suffix) {
  pointer-events: none !important;
}
</style>
