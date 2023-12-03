<template>
  <a-flex :vertical="!screens.md" justify="space-between" gap="10">
    <a-flex class="payment__qr-code w-fc m-auto">
      <a-qrcode size="120" color="#fff" :value="payment?.address || ''" />
    </a-flex>
    <a-flex vertical>
      <a-typography-title :level="2" :class="{'text-primary': true,  'mb-0': true, 'text-center': !screens.md }">{{ t('payment.title') }}</a-typography-title>
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
import { Grid } from "ant-design-vue";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { cMessage } from "../../heplers/message.js";
import { usePaymentStore } from "../../modules/payment.js";
import CCopyableInput from "../../ui/CCopyableInput.vue";

export default defineComponent({
  name: "StatusPending",
  components: {  CCopyableInput },
  setup() {
    const { t } = useI18n();
    const paymentData = usePaymentStore()

    const payment = computed(() => paymentData.payment)

    const useBreakpoint = Grid.useBreakpoint;
    const screens = useBreakpoint();

    const shortAddress = (address) => {
      if(!address) return

      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    }
    const onCopy = async (value) => {
      try {
        await navigator.clipboard.writeText(value)

        cMessage('success', t('payment.copied'))

      }catch (e){
        cMessage('error', t('payment.error'))
        console.error('Unable to copy to clipboard', e);
      }
    }

    return { t, payment, shortAddress, onCopy, screens };
  },

})
</script>

<style lang="scss">
.payment {
  &__qr-code {
    border-radius: 6px;
    border: 1px solid var(--border-input);
    flex-shrink: 0;
  }
}
</style>
