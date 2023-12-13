<template>
  <div class="container">
    <a-row :gutter="[{ sm: 10, md: 50 }, { sm: 20 }]">
      <a-col
        :lg="{ order: 0, span: 16 }"
        :md="{ span: 24, justify: 'center' }"
        :order="1"
      >
        <CoinTable :coin="coin" @push-coin="getCoin" />
      </a-col>
      <a-col :lg="8" :span="24">
        <TransferCard :coin="coin" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import { ref } from 'vue';

import CoinTable from '../ui/CoinTable.vue';
import TransferCard from '../ui/TransferCard.vue';
export default {
  components: {
    CoinTable,
    TransferCard,
  },
  setup() {
    const coin = ref(null);
    const getCoin = e => {
      coin.value = cloneDeep(e);
    };
    return {
      getCoin,
      coin,
    };
  },
};
</script>
