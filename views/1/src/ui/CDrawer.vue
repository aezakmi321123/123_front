<template>
  <a-drawer :width="320" class="c-drawer" v-bind="$attrs">
    <slot />
    <slot name="footer" />
  </a-drawer>
</template>
<style lang="scss">
.ant-drawer {
  .ant-drawer-header-title {
    justify-content: flex-end;
  }
  .anticon svg {
    color: var(--text-primary) !important;
    height: 24px;
    width: 24px;
  }
  outline: none !important;
  .ant-drawer-close {
    .anticon {
      color: var(--text-primary) !important;
    }
  }
}

.c-drawer {
  background: var(--bg-input) !important;
}
</style>
