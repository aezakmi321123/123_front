<template>
  <div class="container">
    <a-row justify="space-between" :gutter="[50, 20]">
      <a-col :lg="14">
        <CoinTable />
      </a-col>
      <a-col :lg="10">
        <TransferCard />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CoinTable from '../ui/CoinTable.vue';
import TransferCard from '../ui/TransferCard.vue';
export default {
  components: {
    CoinTable,
    TransferCard,
  },
};
</script>
