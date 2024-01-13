<template>
  <a-form layout="vertical" :model="withdrawForm" @finish="onFinish">
    <a-form-item
      v-if="withdrawForm.withdrawNetworks.length"
      name="withdrawNetwork"
    >
      <CRadioGroup
        v-if="withdrawForm.withdrawCurrency.type === 'crypto'"
        v-model:value="withdrawForm.withdrawNetwork"
      >
        <CRadioButton
          v-for="network in withdrawForm.withdrawNetworks"
          :key="network"
          class="text-nowrap"
          :value="network"
        >
          {{ network }}
        </CRadioButton>
      </CRadioGroup>
      <CBankAutoComplete
        v-else
        v-model:value="withdrawForm.withdrawNetwork"
        :options="withdrawForm.withdrawNetworks"
      />
    </a-form-item>
    <a-form-item name="withdrawCurrency" :label="t('wallets.currency')">
      <CAutocomplete
        class="select1"
        :options="options"
        option-label-prop="title"
        :value="withdrawForm.withdrawCurrency.value"
        @change="changeCoin"
      />
    </a-form-item>
    <a-form-item name="withdrawAmount" :label="t('wallets.w_amount')">
      <CInputNumber v-model:value="withdrawForm.withdrawAmount" type="number" />
    </a-form-item>
    <a-form-item name="withdrawAddress" :label="t('wallets.a_withdraw')">
      <CInput v-model:value="withdrawForm.withdrawAddress" />
    </a-form-item>
    <div class="info-group">
      <div class="info">
        <div class="info-title">{{ t('wallets.total_balance') }}</div>
        <div class="info-title">
          {{
            `${withdrawForm.withdrawCurrency?.coinQuantity} ${withdrawForm.withdrawCurrency?.abbr}`
          }}
        </div>
      </div>
      <div class="info">
        <div class="wallet-table__switch">
          <CSwitch v-model:checked="withdrawForm.showFee" />
          <div>
            <p>
              {{
                t('wallets.fee', {
                  fee: `${calculatedAmountWithFee} ${withdrawForm.withdrawCurrency?.abbr}`,
                })
              }}
            </p>
            <p>
              {{
                t('wallets.feeAmount', {
                  fee: `${calculatedFee} ${withdrawForm.withdrawCurrency?.abbr}`,
                })
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="info-title">{{ t('wallets.sending') }}</div>
        <div class="info-title">
          {{
            `${
              (withdrawForm.showFee
                ? calculatedAmountWithFee
                : withdrawForm.withdrawAmount) || ''
            } ${withdrawForm.withdrawCurrency?.abbr}`
          }}
        </div>
      </div>
      <div class="info">
        <div class="info-title">{{ t('wallets.receive') }}</div>
        <div class="info-title">
          {{
            `${
              (withdrawForm.showFee
                ? withdrawForm.withdrawAmount
                : withdrawForm.withdrawAmount - parseFloat(calculatedFee)) || ''
            } ${withdrawForm.withdrawCurrency?.abbr}`
          }}
        </div>
      </div>
    </div>
    <a-form-item>
      <CButton
        type="secondary"
        :disabled="
          !withdrawForm.withdrawAmount ||
          !withdrawForm.withdrawAddress ||
          !withdrawForm.withdrawCurrency ||
          withdraw.isLoading
        "
        block
        html-type="submit"
      >
        {{ t('wallets.withdraw') }}
      </CButton>
    </a-form-item>
  </a-form>
</template>

<script>
import { computed, h, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../../modules/auth.js';
import { useWithdrawStore } from '../../modules/withdraw.js';
import CAutocomplete from '../../ui/CAutocomplete.vue';
import CBankAutoComplete from '../../ui/CBankAutoComplete.vue';
import CButton from '../../ui/CButton.vue';
import CInput from '../../ui/CInput.vue';
import CInputNumber from '../../ui/CInputNumber.vue';
import CRadioButton from '../../ui/CRadioButton.vue';
import CRadioGroup from '../../ui/CRadioGroup.vue';
import CSwitch from '../../ui/CSwitch.vue';
export default {
  components: {
    CAutocomplete,
    CInputNumber,
    CInput,
    CSwitch,
    CButton,
    CRadioButton,
    CRadioGroup,
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
    const withdraw = useWithdrawStore();
    const commission = import.meta.env.VITE_BASE_COMMISSION;
    const getImageUrl = (name, isCrypto = true) => {
      const url = isCrypto
        ? `../../assets/icons/crypto/${name.toLowerCase()}.svg`
        : `../../assets/icons/${name.toLowerCase()}.svg`;
      return new URL(url, import.meta.url).href;
    };
    const mapValue = el => ({
      label: el.name,
      value: el.abbr,
      ...el,
      title: h(
        'div',
        { style: { display: 'flex', 'align-items': 'center', gap: '10px' } },
        [
          h('img', {
            src: getImageUrl(el.abbr, el.type === 'crypto'),
            style: {
              width: '26px',
              height: '26px',
            },
          }),
          h('span', {}, el.abbr?.toUpperCase()),
        ],
      ),
    });
    const mapNetworks = networks => networks?.map(({ name }) => name) || [];
    const withdrawForm = ref({
      withdrawCurrency: undefined,
      withdrawAmount: 0,
      withdrawAddress: '',
      withdrawNetwork: '',
      withdrawNetworks: [],
      showFee: false,
    });
    const options = computed(() => authStore.user.coins.map(mapValue));
    const changeCoin = e => {
      withdrawForm.value.withdrawCurrency =
        options.value.find(({ abbr }) => abbr === e) || e;
      const transformedNetworks = mapNetworks(
        withdrawForm.value.withdrawCurrency.networks,
      );

      withdrawForm.value.withdrawNetwork = transformedNetworks?.[0];
      withdrawForm.value.withdrawNetworks = transformedNetworks;
    };
    watch(
      () => props.coin,
      e => {
        const transformedNetworks = mapNetworks(e.networks);

        withdrawForm.value.withdrawCurrency = mapValue(e);
        withdrawForm.value.withdrawNetwork = transformedNetworks?.[0];
        withdrawForm.value.withdrawNetworks = transformedNetworks;
      },
      { deep: true, immediate: true },
    );

    const calculatedFee = computed(() => {
      return ((withdrawForm.value.withdrawAmount * commission) / 100).toFixed(
        6,
      );
    });
    const calculatedAmountWithFee = computed(() => {
      return (
        parseFloat(calculatedFee.value) + withdrawForm.value.withdrawAmount
      );
    });

    const onFinish = async values => {
      const {
        withdrawAmount,
        withdrawCurrency,
        withdrawAddress,
        withdrawNetwork,
      } = values;

      await withdraw.generateWithdraw({
        currency: withdrawCurrency.abbr,
        amount: withdrawAmount.toString(),
        address: withdrawAddress,
        network: withdrawNetwork,
      });
    };

    return {
      options,
      withdrawForm,
      changeCoin,
      t,
      onFinish,
      calculatedFee,
      calculatedAmountWithFee,
      commission,
      withdraw,
    };
  },
};
</script>

<style lang="scss"></style>
