<template>
  <a-modal :footer="null" class="c-modal" v-bind="$attrs">
    <ExchangeCard
      convert
      :selected-card="selectedCard"
      @close-modal="$emit('closeModal')"
    />
    <template #closeIcon>
      <CloseOutlined :style="{ color: '#fff' }"
    /></template>
  </a-modal>
</template>
<script>
import { CloseOutlined } from '@ant-design/icons-vue';

import ExchangeCard from '../ui/ExchangeCard.vue';
export default {
  components: {
    CloseOutlined,
    ExchangeCard,
  },
  props: {
    selectedCard: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['closeModal'],
};
</script>
<style lang="scss">
.c-modal {
  .ant-modal-content {
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  }
}
</style>
