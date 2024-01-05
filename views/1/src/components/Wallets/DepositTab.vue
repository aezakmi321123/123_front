<template>
  <a-form :model="depositForm" layout="vertical" @finish="onFinish">
    <a-form-item name="depositCurrencySend" label="Value send:">
      <CAutocomplete
        class="select1"
        :options="options"
        option-label-prop="title"
        :value="depositForm.depositCurrencySend.value"
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
      <div class="text-primary mt-3">
        {{ $t('wallets.rate') }}:
        {{ currentRate * depositForm.depositAmountSend || 0.0 }}
      </div>
    </a-form-item>
    <a-form-item name="depositCurrencyReceive" label="Value receive:">
      <CAutocomplete
        class="select1"
        :options="options"
        option-label-prop="title"
        :value="depositForm.depositCurrencyReceive.value"
        @change="changeCoin($event, true)"
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
import { computed, h, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useCurrentRate } from '../../composables/useCurrentRate';
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

    const mapValue = el => ({
      label: el.name,
      value: el.abbr,
      ...el,
      title: h(
        'div',
        { style: { display: 'flex', 'align-items': 'center', gap: '10px' } },
        [
          h('img', {
            src: `${
              el.type === 'fiat' ? '' : 'crypto'
            }/${el.abbr?.toLowerCase()}.svg`,
            style: {
              width: '26px',
              height: '26px',
            },
          }),
          h('span', {}, el.abbr?.toUpperCase()),
        ],
      ),
    });
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
          depositForm.value.depositCurrencyReceive = options.value.find(
            ({ value }) => value === 'USDT',
          );
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
        fullAmount: depositAmountSend.toString(),
        commission: import.meta.env.VITE_BASE_COMMISSION,
      });
    };

    const currentRate = computed(() =>
      useCurrentRate(
        depositForm.value.depositCurrencySend?.value,
        depositForm.value.depositCurrencyReceive?.value,
      ),
    );

    return {
      options,
      depositForm,
      changeCoin,
      t,
      onFinish,
      payment,
      currentRate,
    };
  },
};
</script>

<style lang="scss"></style>
