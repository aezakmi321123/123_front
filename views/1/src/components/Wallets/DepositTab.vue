<template>
  <a-form :model="depositForm" layout="vertical" @finish="onFinish">
    <a-form-item
      v-if="depositForm.depositNetworks.length"
      name="withdrawNetwork"
    >
      <CRadioGroup
        v-if="depositForm.depositCurrency.type === 'crypto'"
        v-model:value="depositForm.depositNetwork"
      >
        <CRadioButton
          v-for="network in depositForm.depositNetworks"
          :key="network"
          class="text-nowrap"
          :value="network"
        >
          {{ network }}
        </CRadioButton>
      </CRadioGroup>
      <CBankAutoComplete
        v-else
        v-model:value="depositForm.depositNetwork"
        :options="depositForm.depositNetworks"
      />
    </a-form-item>
    <a-form-item name="depositCurrency" :label="t('wallets.currency')">
      <CAutocomplete
        class="select1"
        :options="options"
        :value="depositForm.depositCurrency"
        @change="changeCoin"
      />
    </a-form-item>
    <a-form-item name="depositAmount" :label="t('wallets.deposit')">
      <CInputNumber v-model:value="depositForm.depositAmount" type="number" />
    </a-form-item>
    <a-form-item>
      <CButton
        type="secondary"
        :disabled="
          !depositForm.depositAmount ||
          !depositForm.depositCurrency ||
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
      depositCurrency: undefined,
      depositAmount: 0,
      depositNetwork: '',
      depositNetworks: [],
    });
    const mapNetworks = networks => networks?.map(({ name }) => name) || [];
    const options = computed(() =>
      authStore.user.coins.map(value => mapValue(value)),
    );
    const changeCoin = e => {
      depositForm.value.depositCurrency =
        options.value.find(({ abbr }) => abbr === e) || e;

      const transformedNetworks = mapNetworks(
        depositForm.value.depositCurrency.networks,
      );

      depositForm.value.depositNetwork = transformedNetworks?.[0];
      depositForm.value.depositNetworks = transformedNetworks;
    };
    watch(
      () => props.coin,
      e => {
        const transformedNetworks = mapNetworks(e.networks);

        depositForm.value.depositCurrency = mapValue(e);
        depositForm.value.depositNetwork = transformedNetworks?.[0];
        depositForm.value.depositNetworks = transformedNetworks;
      },
      { deep: true, immediate: true },
    );

    const onFinish = async values => {
      const { depositAmount, depositCurrency, depositNetwork } = values;

      await payment.generatePayment({
        currency: depositCurrency.abbr,
        fullAmount: depositAmount.toString(),
        network: depositNetwork,
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
