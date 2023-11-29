<template>
  <a-drawer class="c-drawer" v-bind="$attrs">
    <slot />
    <slot name="footer" />
  </a-drawer>
</template>
<style lang="scss">
.ant-drawer {
  outline: none !important;
}
.c-drawer {
  background: var(--bg-base) !important;
}
</style>
