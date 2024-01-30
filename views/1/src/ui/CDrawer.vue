<template>
  <a-drawer :width="320" class="c-drawer" v-bind="$attrs">
    <slot />
    <template #extra> <slot name="extra" /></template>
    <slot name="footer" />
  </a-drawer>
</template>
<style lang="scss">
.ant-drawer {
  .ant-drawer-header-title {
    justify-content: flex-end;
    width: 100px;
  }
  .ant-drawer-extra {
    width: 120px;
  }
  .ant-drawer-header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .ant-drawer-body {
    @include mq(575px, max-width) {
      padding-top: 0px;
    }
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
  background: #15142b !important;
}
</style>
