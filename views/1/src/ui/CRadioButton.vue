<template>
  <a-radio-button v-bind="$attrs" class="radio-button">
    <slot></slot>
  </a-radio-button>
</template>

<script>
  export default {
    name: 'CRadioButton'
  }
</script>

<style lang="scss">
.radio-button {
  width: 25%;
  display: flex;
  flex-shrink: 0;
  background: var(--bg-base) !important;
  border-color: var(--bg-base);
  color: var(--text-primary);
  &.ant-radio-button-wrapper{
    &:first-of-type{
      border-inline-color: var(--bg-base);
    }

    &:before {
      background-color: var(--button-primary);
    }

    &:hover {
      color: var(--button-secondary);

      &:before {
        background-color: var(--bg-base);
      }
    }

    &.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
      color: var(--button-secondary);
      border-color: var(--button-secondary);

      &:before {
        background-color: var(--button-secondary);
      }
    }
  }
}
</style>
