<template>
  <div class="container">
    <a-row :gutter="[{ xl: 40, lg: 20 }, { md: 50 }]" justify="center">
      <a-col :lg="{span: 11, offset: 2}" span="24">
        <a-flex class="exchange-main-card">
          <ExchangeCard :selected-card="selectedCard"/>
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
              @cardClick="onCardClick"
          />
        </a-flex>
      </a-col>
    </a-row>
  </div>
</template>


<script>
import { computed, onMounted, ref } from "vue";

import Card from "../components/Exchange/Card.vue";
import { useAuthStore } from "../modules/auth.js";
import { useWalletStore } from "../modules/wallet.js";
import ExchangeCard from "../ui/ExchangeCard.vue";

export default {
  components: { Card, ExchangeCard },
  setup(){
    const authStore = useAuthStore();
    const walletsStore = useWalletStore()

    const userCoins = computed(() => authStore.user?.coins);
    const socketCoinsData = computed(() => walletsStore.wsData.coins);

    const selectedCard = ref({})

    const onCardClick = (coin) => {
      selectedCard.value = coin
    }
    
    onMounted(() => {
      selectedCard.value = userCoins.value?.[0]
    })

    return {
      selectedCard,
      userCoins,
      socketCoinsData,
      onCardClick
    }
  }

}
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
