<template>
  <a-input
    :style="{ width: '100%' }"
    class="c-input"
    v-bind="$attrs"
    :controls="false"
  >
    <slot name="prefix" />
    <slot name="suffix" />
    <slot />
  </a-input>
</template>
<style lang="scss">
.c-input {
  padding-left: 10px !important;
  border: 1px solid var(--border-input) !important;
  height: 50px !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  background-color: var(--bg-input) !important;
  color: var(--text-primary) !important;
  border-radius: 4px !important;
  &::placeholder {
    color: var(--text-link);
    opacity: 0.8;
  }
}
.ant-input-status-error {
  border-color: #ff4d4f !important;
}
.ant-input-focused {
  box-shadow: unset !important;
  &.ant-input {
    border: 1px solid var(--border-input-focused) !important;
  }
}
</style>
