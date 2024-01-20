<template>
  <a-card
    class="exchange-card"
    :class="coin.name === selectedCard.name ? 'active' : ''"
    :bordered="false"
    @click="onCardClick"
  >
    <template #title>
      <a-flex align="center" justify="space-between">
        <CoinInfo :name="coin.name" :abbr="coin.abbr" :type="coin.type" />
        <a-flex :vertical="true" align="end">
          <a-typography-text
            class="exchange-card__current-price fw-bold text-primary"
            >{{ currentPrice }}</a-typography-text
          >
          <a-typography-text class="text-grey"
            >{{ t('exchange.card.qty') }}:
            {{
              parseFloat(coin.coinQuantity || 0).toFixed(2)
            }}</a-typography-text
          >
        </a-flex>
      </a-flex>
    </template>
    <a-flex vertical>
      <a-flex justify="space-between">
        <a-flex vertical gap="5" align="start">
          <a-typography-text class="text-grey fw-semi-bold">{{
            t('exchange.card.change')
          }}</a-typography-text>
          <a-flex gap="5" align="center" :class="currentChange.class">
            <ArrowUpOutlined v-if="currentChange.icon === 'up'" />
            <ArrowDownOutlined v-if="currentChange.icon === 'down'" />
            <a-typography-text class="fs-16" :class="currentChange.class">{{
              currentChange.label
            }}</a-typography-text>
          </a-flex>
        </a-flex>
        <a-flex vertical gap="5" align="center">
          <a-typography-text class="text-grey fw-semi-bold">{{
            t('exchange.card.price')
          }}</a-typography-text>
          <a-typography-text class="text-primary fs-16"
            >${{ parseFloat(socketData?.c || 1).toFixed(2) }}</a-typography-text
          >
        </a-flex>
        <a-flex vertical gap="5" align="end">
          <a-typography-text class="text-grey fw-semi-bold align-right">{{
            t('exchange.card.volume')
          }}</a-typography-text>
          <a-typography-text class="text-primary fs-16">{{
            currentVolume
          }}</a-typography-text>
        </a-flex>
      </a-flex>
    </a-flex>
  </a-card>
</template>

<script lang="jsx">
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import CoinInfo from '../../ui/CoinInfo.vue';

export default {
  components: { ArrowUpOutlined, ArrowDownOutlined, CoinInfo },
  props: {
    coin: {
      type: Object,
      default: () => ({}),
    },
    socketData: {
      type: Object,
      default: () => ({}),
    },
    selectedCard: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['cardClick'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const currentVolume = computed(() => {
      if (props.coin.abbr === 'USDT') {
        return '-';
      }

      return `$${parseFloat(props.socketData?.v || 0).toFixed(2)}`;
    });
    const currentPrice = computed(
      () =>
        `$${(
          parseFloat(props.coin.coinQuantity || 0) *
          parseFloat(props.socketData?.c || 1)
        ).toFixed(2)}`,
    );
    const currentChange = computed(() => {
      if (props.coin.abbr === 'USDT') {
        return { icon: 'none', label: '-', class: 'text-primary' };
      }

      if (parseFloat(props.socketData?.P || 0) > 0) {
        return {
          icon: 'up',
          label: `+${parseFloat(props.socketData?.P || 0).toFixed(2)}%`,
          class: props.coin.type === 'fiat' ? 'text-red' : 'text-green',
        };
      }

      return {
        icon: 'down',
        label: `${parseFloat(props.socketData?.P || 0).toFixed(2)}%`,
        class: props.coin.type === 'fiat' ? 'text-green' : 'text-red',
      };
    });

    const onCardClick = () => {
      emit('cardClick', props.coin);
    };

    return {
      t,
      currentPrice,
      currentVolume,
      currentChange,
      onCardClick,
    };
  },
};
</script>

<style lang="scss">
.exchange-card {
  padding: 20px;
  border-radius: 14px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  border: 1px solid transparent;
  cursor: pointer;
  &:hover,
  &.active {
    box-shadow: 0px 3px 20px rgba(64, 64, 242, 0.48);
    border: 1px solid var(--button-secondary);
  }

  & .ant-card-head {
    border-color: var(--border-input);
    padding: 0;
  }

  &__current-price {
    font-size: 18px;
  }
}
</style>
