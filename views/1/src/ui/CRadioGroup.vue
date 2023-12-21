<template>
  <a-radio-group v-bind="$attrs" class="radio-group">
    <slot />
  </a-radio-group>
</template>

<script>
export default {
  name: 'CRadioGroup',
};
</script>

<style lang="scss">
.radio-group {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 100%;
  .ant-radio-button-wrapper {
    background-color: var(--bg-input) !important;
  }
  .radio-button.ant-radio-button-wrapper.ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ) {
    border: 1px solid var(--button-secondary);
  }
}
</style>
