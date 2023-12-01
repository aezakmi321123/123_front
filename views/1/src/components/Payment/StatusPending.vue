<template>
  <CButton size="medium" class="payment__back-button" type="primary" @click="router.go(-1)">{{
      t('payment.back')
    }}</CButton>
  <a-flex justify="space-between" gap="10">
    <a-flex class="payment__qr-code">
      <a-qrcode size="120" color="#fff" :value="payment?.address || ''" />
    </a-flex>
    <a-flex vertical>
      <a-typography-title :level="2" class="text-primary mb-0">{{ t('payment.title') }}</a-typography-title>
      <a-typography-text class="text-primary">{{ t('payment.description') }}</a-typography-text>
    </a-flex>
  </a-flex>
  <a-flex vertical gap="15">
    <CCopyableInput
        :prefix="t('payment.cryptoAmount')"
        :value="`${payment?.fullAmount} ${payment?.currency}`"
        readonly
        @copy="() => onCopy(`${payment?.fullAmount} ${payment?.currency}`)"
    />
    <CCopyableInput
        :prefix="t('payment.totalAmountReceived')"
        :value="`${payment?.receivedAmount || 0} ${payment?.currency}`"
        readonly
        @copy="() => onCopy(`${payment?.receivedAmount || 0} ${payment?.currency}`)"
    />
    <CCopyableInput
        :prefix="t('payment.walletAddress')"
        :value="shortAddress(payment?.address)"
        readonly
        @copy="() => onCopy(payment?.address)"
    />
    <CCopyableInput
        :prefix="t('payment.network')"
        :value="payment?.network || payment?.currency"
        readonly
        @copy="() => onCopy(payment?.network || payment?.currency)"
    />
  </a-flex>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { cMessage } from "../../heplers/message.js";
import { usePaymentStore } from "../../modules/payment.js";
import CButton from "../../ui/CButton.vue";
import CCopyableInput from "../../ui/CCopyableInput.vue";

export default defineComponent({
  name: "StatusPending",
  components: { CButton, CCopyableInput },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const paymentData = usePaymentStore()

    const payment = computed(() => paymentData.payment)

    const shortAddress = (address) => {
      if(!address) return

      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    }
    const onCopy = async (value) => {
      try {
        await navigator.clipboard.writeText(value)

        cMessage('success', this.t('payment.copied'))

      }catch (e){
        cMessage('error', this.t('payment.error'))
        console.error('Unable to copy to clipboard', e);
      }

    }

    return { t, payment, router, shortAddress, onCopy };
  },

})
</script>

<style lang="scss">
.payment {
  &__back-button {
    width: fit-content;
    padding-left: 30px;
    padding-right: 30px;
  }

  &__qr-code {
    border-radius: 6px;
    border: 1px solid var(--border-input);
    flex-shrink: 0;
  }
}
</style>
