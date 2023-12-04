<template>
  <a-switch class="c-switch" v-bind="$attrs" />
</template>
<style lang="scss">
.ant-switch {
  background-color: var(--bg-input) !important;
}
.ant-switch[aria-checked='true'] {
  background-color: var(--button-secondary) !important;
}
</style>
