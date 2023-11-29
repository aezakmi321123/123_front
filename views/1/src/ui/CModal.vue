<template>
  <a-modal :footer="null" class="c-modal" v-bind="$attrs">
    <slot />
    <template #closeIcon>
      <CloseOutlined :style="{ color: '#fff' }"
    /></template>
  </a-modal>
</template>
<script>
import { CloseOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    CloseOutlined,
  },
};
</script>
<style lang="scss">
.c-modal {
  .ant-modal-content {
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  }
}
</style>
