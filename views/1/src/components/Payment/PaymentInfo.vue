<template>
    <a-col :lg="8" :span="24">
        <a-flex class="payment__right-side" vertical>
          <a-spin :spinning="payment.isLoading" size="large" wrapper-class-name="payment-info__preloader">
          <a-flex justify="space-between">
            <a-typography-title :level="3" class="text-primary mb-0">{{appName}}</a-typography-title>
            <BackButton v-if="!screens.lg && !screens.xl" />
          </a-flex>
          <a-divider class="payment__divider text-primary">{{$t('payment.paymentInfo')}}</a-divider>
          <a-flex>
            <ul class="payment__list">
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold">{{$t('payment.domain')}}</a-typography-text>
                <a-typography-text class="text-primary">{{appName}}</a-typography-text>
              </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary text-nowrap fw-bold">{{$t('payment.paymentNumber')}}</a-typography-text>
                <a-tooltip overlay-class-name="payment__list-item-tooltip">
                  <template #title><a-typography-text class="text-primary text-nowrap">{{payment?.id}}</a-typography-text></template>
                  <a-typography-text class="text-primary text-nowrap-ellipsis">{{payment?.id}}</a-typography-text>
                </a-tooltip>
              </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold text-nowrap">{{$t('payment.totalSend')}}</a-typography-text>
                <a-tooltip overlay-class-name="payment__list-item-tooltip">
                  <template #title><a-typography-text class="text-primary text-nowrap">{{payment?.fullAmount}} {{payment?.currencyFrom}} (${{payment?.fullAmountInCurrency }})</a-typography-text></template>
                  <a-typography-text class="text-primary text-nowrap-ellipsis">{{payment?.fullAmount}} {{payment?.currencyFrom}} (${{payment?.fullAmountInCurrency }})</a-typography-text>
                </a-tooltip>
              </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold text-nowrap">{{$t('payment.totalReceive')}}</a-typography-text>
                <a-tooltip overlay-class-name="payment__list-item-tooltip">
                  <template #title><a-typography-text class="text-primary text-nowrap">{{payment?.fullAmountInCurrency}} {{payment?.currencyTo}} (${{payment?.fullAmountInCurrency }})</a-typography-text></template>
                  <a-typography-text class="text-primary text-nowrap-ellipsis">{{payment?.fullAmountInCurrency}} {{payment?.currencyTo}} (${{payment?.fullAmountInCurrency }})</a-typography-text>
                </a-tooltip>
                </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold">{{$t('payment.commission')}}</a-typography-text>
                <a-typography-text class="text-primary">{{commission}}%</a-typography-text>
              </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold">{{$t('payment.invoiceExpiresIn')}}</a-typography-text>
                <a-typography-text class="text-primary">{{time}}</a-typography-text>
              </li>
              <li class="payment__list-item">
                <a-typography-text class="text-primary fw-bold">{{$t('payment.status')}}</a-typography-text>
                <a-typography-text :class="statusColor">{{payment?.status?.toUpperCase()}}</a-typography-text>
              </li>
            </ul>
          </a-flex>
          <a-divider class="payment__divider text-primary">{{$t('payment.toPay')}}</a-divider>
          <a-flex vertical>
            <a-typography-text class="text-primary fw-bold payment__to-pay-from">{{payment?.fullAmount}} {{payment?.currencyFrom}}</a-typography-text>
            <a-typography-text class="fw-bold payment__to-pay-to">{{payment?.coinToFullQuantity}} {{payment?.currencyTo}}</a-typography-text>
          </a-flex>
          </a-spin>
      </a-flex>
    </a-col>
</template>

<script>
  import { Grid } from "ant-design-vue";
  import moment from 'moment';
  import { computed, onBeforeUnmount, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";

  import { usePayment } from "../../composables/usePayment.js";
  import { PAYMENT_STATUSES } from "../../data/constants.js";
  import { useAuthStore } from "../../modules/auth.js";
  import { usePaymentStore } from "../../modules/payment.js";
  import BackButton from "./BackButton.vue";

  export default  {
    name: "PaymentInfo",
    components: { BackButton },
    setup(){
      const { t } = useI18n()
      const { params } = useRoute()
      const appName = import.meta.env.VITE_BASE_EXCHANGE_NAME
      const commission = import.meta.env.VITE_BASE_COMMISSION
      const paymentData = usePaymentStore()
      const authData = useAuthStore()
      const timer = ref(null);
      const time = ref('00:00')
      const requestCounter  = ref(0)

      const payment = computed(usePayment)

      const screens = Grid.useBreakpoint();

      const calculateRemainingTime = async () => {
        const milDiff = moment(payment.value.expirationDate).diff(moment())

        if(milDiff <= 0 || payment.value.status === PAYMENT_STATUSES.SUCCESSFUL){
          clearInterval(timer);
          time.value = t('payment.expired');
          return
        }

        time.value = moment(moment(payment.value.expirationDate).diff(moment())).format("mm:ss")

        if(requestCounter.value === 10){
          const { id } = params

          if(!authData.isLoggedIn){
            await paymentData.getUnauthPayment(id)
          }else {
            await paymentData.getPayment(id)
          }
          
          requestCounter.value = 0

          return
        }


        requestCounter.value++
      };

      const statusColor = computed(() =>{

        return {
          [PAYMENT_STATUSES.PENDING]: 'text-orange',
          [PAYMENT_STATUSES.REJECTED]: 'text-red',
          [PAYMENT_STATUSES.SUCCESSFUL]: 'text-green',
        }[payment?.value?.status] || "text-primary"
      })

      onMounted(() => {
        timer.value = setInterval(calculateRemainingTime, 1000)
      })

      onBeforeUnmount(() => {
        clearInterval(timer.value)
      })

      return { t, payment, appName, commission, time, statusColor, screens }
    }
  }
</script>

<style lang="scss">
  .payment{
    &__right-side {
      width: 100%;
      border-radius: var(--radius-lg);
      padding: 20px;
      background: var(--bg-purple);
    }

    &__divider {
      margin-top: var(--gutter-4) !important;
      margin-bottom: var(--gutter-4) !important;

      &:after, &:before {
        background: var(--text-primary);
      }
    }

    &__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: var(--gutter-4);
      width: 100%;

      &-item {
        display: flex;
        gap: var(--gutter-5);
        justify-content: space-between;

        &-tooltip {
          & .ant-tooltip-inner {
            width: fit-content;
          }
        }

        & > span {
          font-size: var(--fs-5);
        }

      }
    }

    &__to-pay-from {
      font-size: var(--fs-6);
      margin-left: auto;
    }

    &__to-pay-to {
      font-size: var(--fs-5);
      margin-left: auto;
      color: var(--border-input);
    }
  }

  .payment-info{
    &__preloader {
      & .ant-spin-container:after {
        border-radius: var(--radius-lg);
        background: var(--bg-purple);
      }

      & .ant-spin-dot-item {
        background-color: var(--text-primary) !important
      }
    }
  }
</style>
