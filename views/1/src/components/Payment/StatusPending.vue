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
        :value="payment.fullAmountCalculated"
        readonly
        @copy="() => onCopy(payment.fullAmountCalculated)"
    />
    <CCopyableInput
        :prefix="t('payment.totalAmountReceived')"
        :value="payment?.receivedAmountCalculated"
        readonly
        @copy="() => onCopy(payment?.receivedAmountCalculated)"
    />
    <CCopyableInput
        :prefix="t('payment.walletAddress')"
        :value="shortAddress(payment?.address)"
        readonly
        @copy="() => onCopy(payment?.address)"
    />
    <CCopyableInput
        v-if="payment?.receivedAddress"
        :prefix="t('payment.receivedAddress')"
        :value="shortAddress(payment?.receivedAddress)"
        readonly
        @copy="() => onCopy(payment?.receivedAddress)"
    />
    <CCopyableInput
        :prefix="t('payment.networkFrom')"
        :value="payment?.networkFrom || payment?.currencyFrom"
        readonly
        @copy="() => onCopy(payment?.networkFrom || payment?.currencyFrom)"
    />
    <CCopyableInput
        :prefix="t('payment.networkTo')"
        :value="payment?.networkTo|| payment?.currencyTo"
        readonly
        @copy="() => onCopy(payment?.networkTo|| payment?.currencyTo)"
    />
  </a-flex>
</template>

<script>
import { Grid } from "ant-design-vue";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { usePayment } from "../../composables/usePayment.js";
import { cMessage } from "../../heplers/message.js";
import CCopyableInput from "../../ui/CCopyableInput.vue";

export default defineComponent({
  name: "StatusPending",
  components: {  CCopyableInput },
  setup() {
    const { t } = useI18n();

    const payment = computed(usePayment)
    const screens = Grid.useBreakpoint();

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
