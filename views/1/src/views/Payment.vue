<template>
  <div class="container">
    <a-row gutter="30">
      <a-col :span="16">
        <a-flex class="payment__left-side" vertical>
          <a-spin :spinning="payment.isLoading" size="large" wrapper-class-name="payment__preloader">
            <a-flex class="payment__left-side-inner" gap="25" vertical>
              <StatusPending/>
            </a-flex>
          </a-spin>
        </a-flex>
      </a-col>
      <RightSide />
    </a-row>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from "vue-router";

import RightSide from "../components/Payment/PaymentInfo.vue";
import StatusPending from "../components/Payment/StatusPending.vue";
import { usePaymentStore } from "../modules/payment.js";

export default {
  name: 'Payment',
  components: { StatusPending, RightSide },
  setup() {
    const { t } = useI18n();
    const paymentData = usePaymentStore()
    const { params } = useRoute()

    const values = ref({
      cryptoAmount: '6 BTC',
      totalAmountReceived: '0 BTC',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'BTC',
    });

    onMounted(() => {
      const { id } = params

      paymentData.getPayment(id)
    })

    const payment = computed(() => ({ ...paymentData.payment, isLoading: paymentData.isLoading }))

    return { t, values, payment };
  },
};
</script>

<style lang="scss">
.payment {
  &__left-side {
    border-radius: var(--radius-lg);
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);

    &-inner {
      padding: 20px;
    }
  }
}
</style>
