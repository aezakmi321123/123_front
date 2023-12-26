<template>
  <a-form :model="depositForm" layout="vertical" @finish="onFinish">
    <a-form-item name="depositCurrencySend" label="Value send:">
      <CAutocomplete
        class="select1"
        :options="options"
        :value="depositForm.depositCurrencySend"
        @change="changeCoin($event)"
      />
    </a-form-item>
    <a-form-item
      v-if="depositForm.depositNetworksSend.length"
      name="withdrawNetwork"
    >
      <CRadioGroup
        v-if="depositForm.depositCurrencySend.type === 'crypto'"
        v-model:value="depositForm.depositNetworkSend"
      >
        <CRadioButton
          v-for="network in depositForm.depositNetworksSend"
          :key="network"
          class="text-nowrap"
          :value="network"
        >
          {{ network }}
        </CRadioButton>
      </CRadioGroup>
      <CBankAutoComplete
        v-else
        v-model:value="depositForm.depositNetworkSend"
        :options="depositForm.depositNetworksSend"
      />
    </a-form-item>
    <a-form-item name="depositAmountSend" :label="t('wallets.deposit')">
      <CInputNumber
        v-model:value="depositForm.depositAmountSend"
        type="number"
      />
    </a-form-item>
    <a-form-item name="depositCurrencyReceive" label="Value receive:">
      <CAutocomplete
        class="select1"
        :options="options"
        :value="depositForm.depositCurrencyReceive"
        @change="changeCoin($event, true)"
      />
    </a-form-item>
    <a-form-item
      v-if="depositForm.depositNetworksReceive.length"
      name="withdrawNetwork"
    >
      <CRadioGroup
        v-if="depositForm.depositCurrencyReceive.type === 'crypto'"
        v-model:value="depositForm.depositNetworkReceive"
      >
        <CRadioButton
          v-for="network in depositForm.depositNetworksReceive"
          :key="network"
          class="text-nowrap"
          :value="network"
        >
          {{ network }}
        </CRadioButton>
      </CRadioGroup>
      <CBankAutoComplete
        v-else
        v-model:value="depositForm.depositNetworkReceive"
        :options="depositForm.depositNetworksReceive"
      />
    </a-form-item>
    <a-form-item>
      <CButton
        type="secondary"
        :disabled="
          !depositForm.depositAmountSend ||
          !depositForm.depositCurrencySend ||
          payment.isLoading
        "
        block
        html-type="submit"
        >{{ t('wallets.get_address') }}</CButton
      >
    </a-form-item>
  </a-form>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../../modules/auth.js';
import { usePaymentStore } from '../../modules/payment.js';
import CAutocomplete from '../../ui/CAutocomplete.vue';
import CBankAutoComplete from '../../ui/CBankAutoComplete.vue';
import CButton from '../../ui/CButton.vue';
import CInputNumber from '../../ui/CInputNumber.vue';
import CRadioButton from '../../ui/CRadioButton.vue';
import CRadioGroup from '../../ui/CRadioGroup.vue';
export default {
  components: {
    CRadioButton,
    CRadioGroup,
    CAutocomplete,
    CInputNumber,
    CButton,
    CBankAutoComplete,
  },
  props: {
    coin: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const payment = usePaymentStore();

    const mapValue = el => ({ label: el.name, value: el.abbr, ...el });
    const depositForm = ref({
      depositCurrencySend: undefined,
      depositAmountSend: 0,
      depositNetworkSend: '',
      depositNetworksSend: [],
      depositCurrencyReceive: undefined,
      depositAmountReceive: 0,
      depositNetworkReceive: '',
      depositNetworksReceive: [],
    });
    const mapNetworks = networks => networks?.map(({ name }) => name) || [];
    const options = computed(() =>
      authStore.user.coins.map(value => mapValue(value)),
    );
    const changeCoin = (e, isReceive = false) => {
      if (isReceive) {
        depositForm.value.depositCurrencyReceive =
          options.value.find(({ abbr }) => abbr === e) || e;
        const transformedNetworks = mapNetworks(
          depositForm.value.depositCurrencyReceive.networks,
        );

        depositForm.value.depositNetworkReceive = transformedNetworks?.[0];
        depositForm.value.depositNetworksReceive = transformedNetworks;
      } else {
        depositForm.value.depositCurrencySend =
          options.value.find(({ abbr }) => abbr === e) || e;
        const transformedNetworks = mapNetworks(
          depositForm.value.depositCurrencySend.networks,
        );

        depositForm.value.depositNetworkSend = transformedNetworks?.[0];
        depositForm.value.depositNetworksSend = transformedNetworks;
      }
    };
    watch(
      () => props.coin,
      e => {
        const transformedNetworks = mapNetworks(e.networks);

        depositForm.value.depositCurrencySend = mapValue(e);
        depositForm.value.depositNetworkSend = transformedNetworks?.[0];
        depositForm.value.depositNetworksSend = transformedNetworks;
        if (!depositForm.value.depositCurrencyReceive) {
          const currency = options.value.find(({ value }) => value === 'USDT');
          const transformedNetworksReceive = mapNetworks(currency.networks);
          depositForm.value.depositCurrencyReceive = currency;

          depositForm.value.depositNetworkReceive =
            transformedNetworksReceive?.[0];
          depositForm.value.depositNetworksReceive = transformedNetworksReceive;
        }
      },
      { deep: true, immediate: true },
    );

    const onFinish = async values => {
      const { depositAmountSend, depositCurrencySend, depositCurrencyReceive } =
        values;
      await payment.generatePayment({
        currencyFrom: depositCurrencySend.abbr,
        networkFrom: depositForm.value.depositNetworkSend,
        currencyTo: depositCurrencyReceive.abbr,
        networkTo: depositForm.value.depositNetworkReceive,
        fullAmount: depositAmountSend.toString(),
        commission: import.meta.env.VITE_BASE_COMMISSION,
      });
    };

    return {
      options,
      depositForm,
      changeCoin,
      t,
      onFinish,
      payment,
    };
  },
};
</script>

<style lang="scss"></style>
