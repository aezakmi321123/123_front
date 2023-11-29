<template>
  <a-tag class="c-tag" v-bind="$attrs">
    <slot />
    <slot name="icon" />
  </a-tag>
</template>
<style lang="scss">
.c-tag {
  background: transparent !important;
  // border-color: unset !important;
  padding: 5px 10px !important;
  // font-size: 16px !important;
}
</style>
