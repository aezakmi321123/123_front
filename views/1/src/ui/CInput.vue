<template>
  <a-input
    :style="{ width: '100%' }"
    class="c-input"
    v-bind="$attrs"
    :controls="false"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>

    <!-- Default slot for input content -->
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <slot />
  </a-input>
</template>
<style lang="scss">
.c-input {
  .ant-input {
    color: var(--text-primary) !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    &::placeholder {
      color: var(--text-link);
      opacity: 0.8;
    }
  }
  padding-left: 10px !important;
  border: 1px solid var(--border-input) !important;
  height: 50px !important;
  background-color: var(--bg-input) !important;
  color: var(--text-primary) !important;
  border-radius: 4px !important;

  & .ant-input {
    background-color: var(--bg-input) !important;
  }
}
.ant-input-status-error {
  border-color: #ff4d4f !important;
}
.ant-input-affix-wrapper {
  border: 1px solid rgba(0,0,0,0) !important;
}
.ant-input-focused, .ant-input-affix-wrapper-focused{
  box-shadow: unset !important;
  border: 1px solid var(--border-input-focused) !important;
}
</style>
