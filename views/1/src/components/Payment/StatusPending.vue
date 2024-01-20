<template>
  <div :key="payment.currencyTo" class="payment">
    <div class="payment__number">
      {{ t('payment.main_pay') }}{{ payment.id }}
    </div>
    <div class="payment__currency">
      <h3>
        {{ t('payment.pay') }} {{ payment.currencyFrom }} =
        {{ payment.paymentRate }}
        {{ payment.currencyTo }}
      </h3>

      <a-row :gutter="[{ xs: 0, sm: 20 }, { xs: 30 }]" class="payment__coins">
        <a-col :xs="24" :md="10" class="payment__coin">
          <div class="payment__coin-info">
            <img
              :style="{ width: '60px' }"
              :src="getImageUrl(payment.currencyFrom, !isBank.send)"
            />
            <div v-if="isBank.send">
              <img
                :style="{ width: '60px' }"
                :src="getImageUrl(payment.networkFrom, false)"
              />
            </div>
            <CRadioGroup v-else>
              <CRadioButton>{{ payment.networkFrom }}</CRadioButton>
            </CRadioGroup>
          </div>
          <div>{{ payment.fullAmount }} {{ payment.currencyFrom }}</div>
        </a-col>
        <a-col :xs="24" :md="4" class="payment__switch"><SyncOutlined /></a-col>
        <a-col :xs="24" :md="10" class="payment__coin end">
          <div class="payment__coin-info">
            <img
              :style="{ width: '60px' }"
              :src="getImageUrl(payment.currencyTo, !isBank.receive)"
            />
            <div v-if="isBank.receive">
              <img
                :style="{ width: '60px' }"
                :src="getImageUrl(payment.networkTo, false)"
              />
            </div>
            <CRadioGroup v-if="payment.networkTo && !isBank.receive">
              <CRadioButton>{{ payment.networkTo }}</CRadioButton>
            </CRadioGroup>
          </div>
          <div>{{ payment.fullAmountInCurrency }} {{ payment.currencyTo }}</div>
        </a-col>
      </a-row>

      <div class="payment__address">
        <div class="step-title">
          <div class="step-title__step">1</div>
          <div class="step-title__text">{{ t('payment.make_pay') }}</div>
        </div>
        <CCopyableInput
          :prefix="t('payment.cryptoAmount')"
          :value="`${payment.fullAmount} ${payment.currencyFrom}`"
          readonly
          @copy="() => onCopy(payment.fullAmountCalculated)"
        />
        <CCopyableInput
          :prefix="t('payment.walletAddress')"
          :value="payment?.address"
          readonly
          :address="payment?.address"
          @copy="() => onCopy(payment?.address)"
        />
      </div>
      <div class="payment__address">
        <div class="step-title">
          <div class="step-title__step">2</div>
          <div class="step-title__text">{{ t('payment.take_pay') }}</div>
        </div>
        <CCopyableInput
          :prefix="t('payment.cryptoAmount')"
          :value="`${payment.fullAmountInCurrency} ${payment.currencyTo}`"
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
          v-if="payment?.receivedAddress"
          :prefix="t('payment.receivedAddress')"
          :value="payment?.receivedAddress"
          readonly
          @copy="() => onCopy(payment?.receivedAddress)"
        />
      </div>
    </div>
  </div>

  <!-- <div>
    <a-flex :vertical="!screens.md" justify="space-between" gap="10">
      <a-flex class="payment__qr-code w-fc m-auto">
        <a-qrcode size="120" color="#fff" :value="payment?.address || ''" />
      </a-flex>
      <a-flex vertical>
        <a-typography-title
          :level="2"
          :class="{
            'text-primary': true,
            'mb-0': true,
            'text-center': !screens.md,
          }"
          >{{ t('payment.title') }}</a-typography-title
        >
        <a-typography-text class="text-primary">{{
          t('payment.description')
        }}</a-typography-text>
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
        :value="payment?.networkTo || payment?.currencyTo"
        readonly
        @copy="() => onCopy(payment?.networkTo || payment?.currencyTo)"
      />
    </a-flex>
  </div> -->
</template>

<script>
import { SyncOutlined } from '@ant-design/icons-vue';
import { Grid } from 'ant-design-vue';
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

import { usePayment } from '../../composables/usePayment.js';
import { BANKS } from '../../data/constants';
import { cMessage } from '../../heplers/message.js';
import CCopyableInput from '../../ui/CCopyableInput.vue';
import CRadioButton from '../../ui/CRadioButton.vue';
import CRadioGroup from '../../ui/CRadioGroup.vue';
export default defineComponent({
  name: 'StatusPending',
  components: { CCopyableInput, SyncOutlined, CRadioButton, CRadioGroup },
  setup() {
    const { t } = useI18n();

    const payment = computed(usePayment);
    const screens = Grid.useBreakpoint();

    const isBank = computed(() => {
      return {
        send: payment.value.networkFrom?.toLowerCase() in BANKS,
        receive: payment.value.networkTo?.toLowerCase() in BANKS,
      };
    });
    const getImageUrl = (name, isCrypto = true) => {
      const url = isCrypto
        ? `/assets/crypto/${name?.toLowerCase?.()}.svg`
        : `/assets/${name?.toLowerCase?.()}.svg`;
      return new URL(url, import.meta.url).href;
    };
    const shortAddress = address => {
      if (!address) return;
      if (isBank.value.receive) return address;
      return `${address.slice(0, 6)}...${address.slice(-6)}`;
    };
    const onCopy = async value => {
      try {
        await navigator.clipboard.writeText(value);

        cMessage('success', t('payment.copied'));
      } catch (e) {
        cMessage('error', t('payment.error'));
        console.error('Unable to copy to clipboard', e);
      }
    };

    return {
      t,
      payment,
      shortAddress,
      onCopy,
      screens,
      isBank,
      getImageUrl,
    };
  },
});
</script>

<style lang="scss">
.step-title {
  display: flex;
  align-items: center;
  gap: 20px;
  &__step {
    color: var(--bg-purple);
    display: flex;
    font-weight: 500;
    justify-content: center;
    font-size: 30px;
    border: 5px solid var(--bg-purple);
    border-radius: 50%;
    min-width: 50px;
    height: 50px;
  }
  &__text {
    font-size: 22px;
  }
}
.payment {
  min-width: 100%;
  &__number {
    color: var(--text-link);
    font-size: 24px;
  }
  &__currency {
    margin-top: 20px;
  }
  &__coins {
    margin-top: 20px;
    display: flex;
    align-items: center;
    // gap: 50px;
  }
  &__coin {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 20px;
    font-weight: 500;
    color: var(--text-link);
    &.end {
      align-items: flex-end;
    }
  }
  &__coin-info {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__switch {
    font-size: 40px;
    display: flex;
    justify-content: center;
    color: var(--bg-purple);
  }
  &__address {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  &__qr-code {
    border-radius: 6px;
    border: 1px solid var(--border-input);
    flex-shrink: 0;
  }
}
</style>
