<template>
  <div class="container">
    <a-row :gutter="[30, 30]">
      <a-col :lg="{order: 0, span: 16}" :order="1">
        <a-flex class="payment__left-side" vertical>
          <a-spin :spinning="payment.isLoading" size="large" wrapper-class-name="payment__preloader">
            <a-flex class="payment__left-side-inner" gap="25" vertical>
              <BackButton v-if="screens.lg" />
              <component :is="payment.currentComponent" />
            </a-flex>
          </a-spin>
        </a-flex>
      </a-col>
      <RightSide />
    </a-row>
  </div>
</template>

<script>
import { Grid } from 'ant-design-vue';
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import BackButton from "../components/Payment/BackButton.vue";
import RightSide from "../components/Payment/PaymentInfo.vue";
import StatusPending from "../components/Payment/StatusPending.vue";
import StatusRejected from "../components/Payment/StatusRejected.vue";
import StatusSuccess from "../components/Payment/StatusSuccess.vue";
import { PAYMENT_STATUSES } from "../data/constants.js";
import { useAuthStore } from "../modules/auth.js";
import { usePaymentStore } from "../modules/payment.js";
import CButton from "../ui/CButton.vue";

export default {
  name: 'Payment',
  components: { BackButton, CButton, StatusPending, StatusRejected, StatusSuccess, RightSide },
  setup() {
    const { t } = useI18n();
    const paymentData = usePaymentStore()
    const authData = useAuthStore();
    const { params } = useRoute()
    const router = useRouter();
    const statusComponentMap = {
      [PAYMENT_STATUSES.PENDING]: StatusPending,
      [PAYMENT_STATUSES.REJECTED]: StatusRejected,
      [PAYMENT_STATUSES.SUCCESSFUL]: StatusSuccess,
    }
    const screens = Grid.useBreakpoint();

    onMounted(() => {
      const { id } = params

      if(!authData.isLoggedIn){
        paymentData.getUnauthPayment(id)
        return;
      }

      paymentData.getPayment(id)
    })

    const payment = computed(() => ({
      ...paymentData.payment,
      isLoading: paymentData.isLoading,
      currentComponent: statusComponentMap[paymentData.payment?.status || PAYMENT_STATUSES.PENDING]
    }))

    return { t, payment, router, screens };
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
