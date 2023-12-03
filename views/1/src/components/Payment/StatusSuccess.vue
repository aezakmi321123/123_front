<template>
  <a-flex vertical align="center" gap="15">
    <CheckCircleOutlined class="payment__success-icon" />
    <a-typography-title :level="2" class="text-primary text-center mb-0">{{ t('payment.successPaymentTitle') }}</a-typography-title>
    <a-typography-text :strong="true" class="text-primary">{{ t('payment.successPaymentDescription') }}</a-typography-text>
  </a-flex>
</template>

<script>
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import { useI18n } from "vue-i18n";
  export default {
    name: "StatusRejected",
    components: { CheckCircleOutlined },
    setup(){
      const { t } = useI18n();

      return { t }
    }
  }
</script>

<style lang="scss">
  .payment{
    &__success-icon {
      font-size: 100px;

      @media screen and (min-width: 767px)  {
        font-size: 160px;
      }

      & svg {
        fill: var(--text-success);
      }
    }
  }
</style>

