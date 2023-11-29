<template>
  <a-input-number
    :style="{ width: '100%' }"
    class="c-input-number"
    v-bind="$attrs"
    :controls="false"
  >
  </a-input-number>
</template>
<style lang="scss">
.ant-input-number {
  border: 1px solid var(--border-input) !important;
}
.ant-input-number-focused {
  box-shadow: unset !important;
  &.ant-input-number {
    border: 1px solid var(--border-input-focused) !important;
  }
}
.ant-input-number-input {
  height: 50px !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  background-color: var(--bg-input) !important;
  color: var(--text-primary) !important;
  border-radius: 4px !important;
}
</style>
