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
  &::placeholder {
    color: var(--text-link) !important;
    opacity: 0.8;
  }
  height: 50px !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  @include mq(575px, max-width) {
    font-size: 14px !important;
  }
  background-color: var(--bg-input) !important;
  color: var(--text-primary) !important;
  border-radius: 4px !important;
}
</style>
