<template>
  <a-flex gap="10" align="center">
    <CryptoIcon :size="40" :name="abbr.toLowerCase()" />
    <a-flex vertical>
      <a-flex align="center" gap="3">
        <a-typography-text class="text-primary">{{ abbr }}</a-typography-text>
        <a-tag class="tag" color="orange">USD</a-tag>
      </a-flex>
      <a-typography-text class="text-nowrap text-primary">{{ name }}</a-typography-text>
    </a-flex>
  </a-flex>
</template>

<script>
  export default {
    props: {
      abbr: { type: String, default: '' },
      name: { type: String, default: '' },
    }
  }
</script>

<style scoped lang="scss">
.tag {
  font-size: 10px;
  padding: 2px 7px;
  line-height: 1;
}
</style>
