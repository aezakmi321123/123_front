<template>
  <a-select class="c-select" v-bind="$attrs"> </a-select>
</template>
<style lang="scss">
.c-select {
  color: var(--text-primary) !important;
  .ant-select-selector {
    background-color: var(--button-primary) !important;
    border: unset !important;
  }
  .ant-select-selector {
    color: var(--text-primary) !important;
    font-weight: 700;
  }
}
</style>
