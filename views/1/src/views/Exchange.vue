<template>
  <div class="container">
    <a-row :gutter="[{ xl: 40, lg: 20 }, 20]" justify="center">
      <a-col :lg="{ span: 11, offset: 2 }" span="24">
        <a-flex class="exchange-main-card">
          <ExchangeCard :selected-card="selectedCard" is-wallet />
        </a-flex>
      </a-col>
      <a-col :lg="9" span="24">
        <a-flex vertical gap="15">
          <Card
            v-for="(coin, i) in userCoins"
            :key="i"
            :coin="coin"
            :socket-data="socketCoinsData?.[coin.abbr]"
            :selected-card="selectedCard"
            @card-click="onCardClick"
          />
        </a-flex>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';

import Card from '../components/Exchange/Card.vue';
import { useAuthStore } from '../modules/auth.js';
import { useExchangeStore } from '../modules/exchange.js';
import { useWalletStore } from '../modules/wallet.js';
import ExchangeCard from '../ui/ExchangeCard.vue';

export default {
  components: { Card, ExchangeCard },
  setup() {
    const authStore = useAuthStore();
    const walletsStore = useWalletStore();
    const exchangeStore = useExchangeStore();

    const userCoins = computed(() => authStore.user?.coins);
    const pendingExchange = computed(() => exchangeStore.pendingExchange);
    const socketCoinsData = computed(() => walletsStore.wsData.coins);

    const selectedCard = ref({});

    const onCardClick = coin => {
      selectedCard.value = coin;
    };

    onMounted(() => {
      selectedCard.value =
        pendingExchange.value?.coinFrom || userCoins.value?.[0];

      exchangeStore.setPendingExchange(null);
    });

    return {
      selectedCard,
      userCoins,
      socketCoinsData,
      onCardClick,
    };
  },
};
</script>

<style lang="scss">
.exchange-main-card {
  position: sticky;
  top: 120px;

  & > div {
    width: 100%;
  }
}
</style>
