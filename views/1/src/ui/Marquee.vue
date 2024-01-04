<template>
  <a-spin :spinning="coinsLoading">
    <Vue3Marquee :duration="40">
      <div class="coin__wrap">
        <div v-for="opt of options" :key="opt.value">
          <div class="coin">
            <span class="icon__icon">
              <img
                :src="`crypto/${opt.value.toLowerCase()}.svg`"
                :style="{ width: '16px' }"
              />
            </span>
            <a-spin :spinning="getCoinData(opt).isLoading" size="small">
              <span :class="['coin__text']">
                <span class="">{{ opt.value }}</span>
                <span :class="getCoinData(opt).class">{{
                  getCoinData(opt).change
                }}</span>
                <span :class="getCoinData(opt).class">
                  <ArrowUpOutlined v-if="getCoinData(opt).icon === 'up'" />
                  <ArrowDownOutlined v-if="getCoinData(opt).icon === 'down'" />
                </span>
              </span>
            </a-spin>
          </div>
        </div>
      </div>
    </Vue3Marquee>
  </a-spin>
</template>
<script>
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons-vue';
import { computed } from 'vue';
import { Vue3Marquee } from 'vue3-marquee';

import { useWalletStore } from '../modules/wallet';
export default {
  components: {
    Vue3Marquee,
    ArrowDownOutlined,
    ArrowUpOutlined,
  },
  setup() {
    const walletStore = useWalletStore();
    const mapValue = (
      { abbr, name, networks, type } = {
        abbr: '',
        name: '',
        networks: [],
        type: '',
        isLoading: true,
      },
    ) => ({ label: name, value: abbr, networks, type });
    const socketCoinsData = computed(() => walletStore.wsData.coins);
    const getCoinData = record => {
      if (record.value === 'USDT') {
        return {
          change: '0%',
          class: 'text-primary',
          price: (parseFloat(record.coinQuantity) || 0).toFixed(6),
          icon: null,
          rate: 1,
          isLoading: false,
        };
      }

      const currentData = socketCoinsData.value[record.value];
      const price = parseFloat(currentData?.c || 0).toFixed(2);

      return currentData?.P?.indexOf?.('-')
        ? {
            change: `+${(currentData?.P || 0).toString()}%`,
            class: 'text-green',
            price,
            rate: parseFloat(currentData?.c || 0).toFixed(6),
            icon: 'up',
            isLoading: !currentData,
          }
        : {
            change: `${(currentData?.P || 0).toString()}%`,
            class: 'text-red',
            price,
            rate: parseFloat(currentData?.c || 0).toFixed(6),
            icon: 'down',
            isLoading: !currentData,
          };
    };
    const options = computed(() =>
      walletStore.coins
        ?.map?.(value => mapValue(value))
        .filter(({ type }) => type !== 'fiat'),
    );
    return {
      options,
      getCoinData,
      coinsLoading: walletStore.isLoading,
    };
  },
};
</script>
<style lang="scss">
.coin__wrap {
  display: flex;
  gap: 50px;
  padding-left: 50px;
}
.coin {
  display: flex;
  align-items: center;
  gap: 12px;
  &__icon {
    display: flex;
    align-items: center;
  }
  &__text {
    color: var(--text-link);
    display: flex;
    font-size: 14px;
    gap: 5px;
  }
}
</style>
