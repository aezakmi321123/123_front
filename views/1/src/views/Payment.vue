<template>
  <div class="container">
    <a-row>
      <a-col :span="16">
        <a-flex class="payment__left-side" gap="25" vertical>
          <CButton size="medium" class="payment__back-button" type="primary">{{
            t('payment.back')
          }}</CButton>
          <a-flex justify="space-between" gap="10">
            <a-flex class="payment__qr-code">
              <a-qrcode size="120" color="#fff" :value="values.walletAddress" />
            </a-flex>
            <div>
              <h2>{{ t('payment.title') }}</h2>
              <p>
                {{ t('payment.description') }}
              </p>
            </div>
          </a-flex>
          <a-flex vertical gap="15">
            <CInput
              class="payment__field"
              :prefix="t('payment.cryptoAmount')"
              :value="values.cryptoAmount"
              readonly
            />
            <CInput
              class="payment__field"
              :prefix="t('payment.totalAmountReceived')"
              :value="values.totalAmountReceived"
              readonly
            />
            <CInput
              class="payment__field"
              :prefix="t('payment.walletAddress')"
              :value="shortAddress(values.walletAddress)"
              readonly
            />
            <CInput
              class="payment__field"
              :prefix="t('payment.network')"
              :value="values.network"
              readonly
            />
          </a-flex>
        </a-flex>
      </a-col>
      <a-col :span="8">
        <a-flex class="payment__right-side" vertical> </a-flex>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CButton from '../ui/CButton.vue';
import CInput from '../ui/CInput.vue';

export default {
  name: 'Payment',
  components: { CInput, CButton },
  setup() {
    const { t } = useI18n();

    const values = ref({
      cryptoAmount: '6 BTC',
      totalAmountReceived: '0 BTC',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'BTC',
    });

    return { t, values };
  },
  methods: {
    shortAddress(address) {
      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    },
  },
};
</script>

<style lang="scss">
.payment {
  &__left-side {
    padding: 20px;
    display: flex;
    border-radius: 14px;
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
    flex-direction: column;
    gap: 20px;
  }

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

  &__field {
    height: 40px !important;

    & .ant-input-prefix {
      font-size: 14px;
      margin-right: 10px;
      border-right: 1px solid var(--text-primary);
      padding-right: 10px;
    }

    & .ant-input {
      font-size: 18px !important;
      font-weight: 600 !important;
      background: transparent !important;
      color: var(--text-primary);
    }
  }

  &__right-side {
    width: 200px;
    background: white;
  }
}
</style>
