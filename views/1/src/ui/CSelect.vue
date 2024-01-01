<template>
  <a-select class="c-select" v-bind="$attrs">
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
};
</script>
<style lang="scss">
.c-select {
  color: var(--text-primary) !important;
  .ant-select-selector {
    background-color: var(--button-primary) !important;
    border: unset !important;
  }
  .ant-select-selector {
    color: var(--text-primary) !important;
    font-weight: 700;
  }
}
</style>
