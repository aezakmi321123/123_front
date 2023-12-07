<template>
  <a-radio-group v-bind="$attrs" class="radio-group">
    <slot />
  </a-radio-group>
</template>

<script>
  export default {
    name: 'CRadioGroup'
  }
</script>

<style lang="scss">
.radio-group {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  width: 100%;
}
</style>
