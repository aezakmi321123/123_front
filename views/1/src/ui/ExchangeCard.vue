<template>
  <div>
    <a-form
      class="exchange__card"
      :model="exchangeForm"
      layout="vertical"
      @finish="exchange"
      novalidate="true"
    >
      <a-flex vertical class="exchange__card-title">
        <a-flex align="center">
          <a-typography-title class="mb-0">
            {{ t('exchange.mainCard.makeExchange') }}
          </a-typography-title>
          <a-tooltip v-if="!isUserAuthed">
            <template #title>{{ t('exchange.mainCard.tooltip') }}</template>
            <InfoCircleOutlined class="exchange__card-info" fill="white" />
          </a-tooltip>
        </a-flex>
        <a-form-item
          v-if="!isUserAuthed"
          class="exchange__card-unauth"
          name="withAccount"
        >
          <CRadioGroup v-model:value="exchangeForm.withAccount">
            <CRadioButton
              v-for="radio in unauthOptions"
              :key="radio"
              class="text-nowrap"
              :value="radio"
            >
              {{ t(`exchange.mainCard.${radio}`) }}
            </CRadioButton>
          </CRadioGroup>
        </a-form-item>
      </a-flex>
      <div class="exchange__card-send" name="valueSend">
        <div class="title">{{ t('main.send') }}</div>
        <a-spin :spinning="isWalletLoading">
          <a-form-item class="exchange__card-select" name="valueSend">
            <CAutocomplete
              :value="exchangeForm.valueSend.value"
              option-label-prop="title"
              :options="options"
              @change="onChangeSend"
            />
          </a-form-item>
          <a-form-item
            v-if="
              exchangeForm.sendNetworks.length &&
              !isWallet &&
              exchangeForm.withAccount !== 'with'
            "
            class="exchange__card-networks"
            name="valueSendNetwork"
          >
            <CBankAutoComplete
              v-if="exchangeForm.valueSend.type === 'fiat'"
              v-model:value="exchangeForm.valueSendNetwork"
              :options="exchangeForm.sendNetworks"
            />
            <CRadioGroup
              v-if="exchangeForm.valueSend.type === 'crypto'"
              v-model:value="exchangeForm.valueSendNetwork"
            >
              <CRadioButton
                v-for="network in exchangeForm.sendNetworks"
                :key="network"
                class="text-nowrap"
                :value="network"
              >
                {{ network }}
              </CRadioButton>
            </CRadioGroup>
          </a-form-item>
          <a-form-item name="valueNumberSend">
            <CInputNumber
              v-model:value="exchangeForm.valueNumberSend"
              type="number"
              @change="onChangeSendValue"
            />
          </a-form-item>
        </a-spin>
      </div>
      <div class="exchange__card-swap">
        <div class="img" @click="swapCoins">
          <img height="20" width="20" src="@images/replace.svg" />
        </div>
      </div>
      <div class="exchange__card-receive">
        <div class="title">{{ t('main.receive') }}</div>
        <a-spin :spinning="isWalletLoading">
          <a-form-item class="exchange__card-select" name="valueReceive">
            <CAutocomplete
              :value="exchangeForm.valueReceive.value"
              :options="options"
              option-label-prop="title"
              @change="onChangeReceive"
            />
          </a-form-item>
          <a-form-item
            v-if="
              exchangeForm.receiveNetworks.length &&
              !isWallet &&
              exchangeForm.withAccount !== 'with'
            "
            class="exchange__card-networks"
            name="valueReceiveNetwork"
          >
            <CBankAutoComplete
              v-if="exchangeForm.valueReceive.type === 'fiat'"
              v-model:value="exchangeForm.valueReceiveNetwork"
              :options="exchangeForm.receiveNetworks"
            />
            <CRadioGroup
              v-if="exchangeForm.valueReceive.type === 'crypto'"
              v-model:value="exchangeForm.valueReceiveNetwork"
            >
              <CRadioButton
                v-for="network in exchangeForm.receiveNetworks"
                :key="network"
                class="text-nowrap"
                :value="network"
              >
                {{ network }}
              </CRadioButton>
            </CRadioGroup>
          </a-form-item>
          <a-form-item name="valueNumberReceive">
            <CInputNumber
              v-model:value="exchangeForm.valueNumberReceive"
              @focus="onReceiveFocus"
              @blur="onReceiveBlur"
              @change="onChangeReceiveValue"
            />
          </a-form-item>
        </a-spin>
      </div>
      <div>
        <a-form-item
          v-if="exchangeForm.withAccount === unauthOptions[1]"
          name="receivedAddress"
        >
          <CInput
            v-model:value="exchangeForm.receivedAddress"
            :placeholder="t('exchange.mainCard.addressPlaceholder')"
          />
        </a-form-item>
      </div>
      <div class="exchange__card-rate">
        <div>
          {{ t('exchange.mainCard.exchangeRate') }}: 1
          {{ exchangeForm.valueSend.value }} = {{ calculateSendCoinQuantity() }}
          {{ exchangeForm.valueReceive.value }}
        </div>
        <div>{{ t('exchange.mainCard.ourCommission') }}: {{ commission }}%</div>
      </div>
      <a-form-item class="exchange__card-exchnage">
        <CButton
          size="large"
          type="secondary"
          :disabled="
            isExchanging ||
            parseFloat(exchangeForm.valueNumberSend) <= 0 ||
            parseFloat(exchangeForm.valueNumberReceive) <= 0
          "
          block
          html-type="submit"
        >
          {{ t('main.exchange') }}
        </CButton>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useCurrentRate } from '../composables/useCurrentRate.js';
import { cMessage } from '../heplers/message.js';
import { useAuthStore } from '../modules/auth.js';
import { useExchangeStore } from '../modules/exchange.js';
import { usePaymentStore } from '../modules/payment.js';
import { useWalletStore } from '../modules/wallet.js';
import CAutocomplete from '../ui/CAutocomplete.vue';
import CBankAutoComplete from '../ui/CBankAutoComplete.vue';
import CButton from '../ui/CButton.vue';
import CInputNumber from '../ui/CInputNumber.vue';
import CInput from './CInput.vue';
import CRadioButton from './CRadioButton.vue';
import CRadioGroup from './CRadioGroup.vue';
export default {
  components: {
    CInput,
    CRadioButton,
    CRadioGroup,
    CAutocomplete,
    CInputNumber,
    CBankAutoComplete,
    CButton,
    InfoCircleOutlined,
  },
  props: {
    isWallet: {
      type: Boolean,
      default: false,
    },
    selectedCard: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const walletStore = useWalletStore();
    const authStore = useAuthStore();
    const exchangeStore = useExchangeStore();
    const paymentStore = usePaymentStore();
    const router = useRouter();
    const pendingExchange = { ...exchangeStore.pendingExchange };

    const { t } = useI18n();

    const mapValue = (
      { abbr, name, networks, type } = {
        abbr: '',
        name: '',
        networks: [],
        type: '',
      },
    ) => ({
      label: name,
      value: abbr,
      networks,
      type,
      title: h(
        'div',
        { style: { display: 'flex', 'align-items': 'center', gap: '10px' } },
        [
          h('img', {
            src: `${
              type === 'fiat' ? '' : 'crypto'
            }/${abbr?.toLowerCase()}.svg`,
            style: {
              width: '26px',
              height: '26px',
            },
          }),
          h('span', {}, abbr?.toUpperCase()),
        ],
      ),
    });
    const mapNetworks = networks => networks?.map(({ name }) => name) || [];
    const unauthOptions = ['with', 'without'];

    const exchangeForm = ref({
      valueSend: {},
      valueNumberSend: 0,
      sendNetworks: [],
      valueSendNetwork: '',
      valueReceive: {},
      valueNumberReceive: 0,
      receiveNetworks: [],
      valueReceiveNetwork: '',
      withAccount: unauthOptions[0],
      receivedAddress: '',
    });
    const isExchanging = ref(false);
    const receiveOnFocus = ref(false);
    const networksIndexes = ref({ receive: 0, send: 0 });

    const options = computed(() =>
      walletStore.coins?.map?.(value => mapValue(value)),
    );
    const isWalletLoading = computed(() => walletStore.isLoading);
    const isUserAuthed = computed(() => authStore.isLoggedIn);
    const currentRate = computed(() =>
      useCurrentRate(
        exchangeForm.value.valueSend?.value,
        exchangeForm.value.valueReceive?.value,
      ),
    );

    const commission = import.meta.env.VITE_BASE_COMMISSION;

    const calculateSendCoinQuantity = (quantity = 1, commission) => {
      const fullSum = parseFloat(currentRate.value) * parseFloat(quantity);

      if (commission) {
        return (fullSum - (fullSum * parseFloat(commission)) / 100).toFixed(10);
      }

      return fullSum.toFixed(10);
    };

    const calculateReceiveCoinQuantity = (quantity = 1, commission) => {
      const fullSum = parseFloat(quantity) / parseFloat(currentRate.value);

      if (commission) {
        return (fullSum - (fullSum * parseFloat(commission)) / 100).toFixed(10);
      }

      return fullSum.toFixed(10);
    };

    const exchange = async values => {
      if (!authStore.isLoggedIn && values.withAccount === unauthOptions[0]) {
        exchangeStore.setPendingExchange({
          ...values,
          coinFrom: {
            ...values.valueSend,
            abbr: values.valueSend.value,
            name: values.valueSend.label,
          },
          coinTo: {
            ...values.valueReceive,
            abbr: values.valueReceive.value,
            name: values.valueReceive.label,
          },
        });
        router.push('register');
        return;
      }

      isExchanging.value = true;

      if (
        exchangeForm.value.valueSend.value ===
        exchangeForm.value.valueReceive.value
      ) {
        isExchanging.value = false;
        return cMessage('error', t('exchange.sameCoins'));
      }

      try {
        if (!authStore.isLoggedIn && values.withAccount === unauthOptions[1]) {
          await paymentStore.generateUnauthPayment({
            currencyFrom: values.valueSend.value,
            networkFrom: values.valueSendNetwork,
            currencyTo: values.valueReceive.value,
            networkTo: values.valueReceiveNetwork,
            fullAmount: values.valueNumberSend.toString(),
            receivedAddress: values.receivedAddress,
            commission,
          });
        } else {
          await exchangeStore.exchange({
            coinFrom: values.valueSend.value,
            coinTo: values.valueReceive.value,
            quantity: values.valueNumberSend.toString(),
            commission,
          });
        }

        await authStore.getUser();
      } finally {
        isExchanging.value = false;
      }
    };

    const swapCoins = () => {
      const prevReceiveValue = { ...exchangeForm.value.valueReceive };

      const getNetworkIndex = (networks = [], valueToFind) => {
        return Math.max(
          mapNetworks(networks).findIndex(value => value === valueToFind),
          0,
        );
      };

      networksIndexes.value = {
        send: getNetworkIndex(
          exchangeForm.value.valueReceive.networks,
          exchangeForm.value.valueReceiveNetwork,
        ),
        receive: getNetworkIndex(
          exchangeForm.value.valueSend.networks,
          exchangeForm.value.valueSendNetwork,
        ),
      };

      exchangeForm.value.valueReceive = { ...exchangeForm.value.valueSend };
      exchangeForm.value.valueSend = { ...prevReceiveValue };
    };

    const onChangeSend = e => {
      exchangeForm.value.valueSend =
        options.value.find(({ value }) => value === e) || e;
    };

    const onChangeReceive = e => {
      exchangeForm.value.valueReceive =
        options.value.find(({ value }) => value === e) || e;
    };

    const onChangeSendValue = e => {
      exchangeForm.value.valueNumberReceive = calculateSendCoinQuantity(
        e || 0,
        commission,
      );
    };

    const onChangeReceiveValue = e => {
      exchangeForm.value.valueNumberSend = calculateReceiveCoinQuantity(
        e || 0,
        commission,
      );
    };

    const onReceiveFocus = () => {
      receiveOnFocus.value = true;
    };

    const onReceiveBlur = () => {
      receiveOnFocus.value = false;
    };

    onMounted(() => {
      exchangeForm.value.valueReceive = mapValue(
        pendingExchange.coinTo || walletStore?.coins?.[1],
      );
    });

    watch(
      () => props.selectedCard,
      () => {
        if (!props.selectedCard) return;

        exchangeForm.value.valueSend = mapValue(props.selectedCard);
      },
      { immediate: true },
    );

    watch(
      () => exchangeForm.value.valueSend,
      () => {
        exchangeForm.value.valueNumberSend =
          pendingExchange.valueNumberSend ||
          authStore?.user?.coins?.find?.(
            ({ abbr }) => abbr === exchangeForm.value.valueSend.value,
          )?.coinQuantity ||
          exchangeForm.value.valueNumberSend ||
          0;

        exchangeForm.value.valueNumberReceive = calculateSendCoinQuantity(
          exchangeForm.value.valueNumberSend,
          commission,
        );

        const transformedNetworks = mapNetworks(
          exchangeForm.value.valueSend.networks || [],
        );
        exchangeForm.value.sendNetworks = transformedNetworks;
        exchangeForm.value.valueSendNetwork =
          transformedNetworks?.[networksIndexes.value.send];

        networksIndexes.value.send = 0;
      },
      { immediate: true, deep: true },
    );

    watch(
      () => exchangeForm.value.valueReceive,
      () => {
        exchangeForm.value.valueNumberReceive = calculateSendCoinQuantity(
          exchangeForm.value.valueNumberSend,
          commission,
        );

        const transformedNetworks = mapNetworks(
          exchangeForm.value.valueReceive.networks || [],
        );
        exchangeForm.value.receiveNetworks = transformedNetworks;
        exchangeForm.value.valueReceiveNetwork =
          transformedNetworks?.[networksIndexes.value.receive];

        networksIndexes.value.receive = 0;
      },
      { immediate: true, deep: true },
    );

    watch(
      () => currentRate.value,
      () => {
        if (!receiveOnFocus.value) {
          exchangeForm.value.valueNumberReceive = calculateSendCoinQuantity(
            exchangeForm.value.valueNumberSend || 0,
            parseFloat(commission),
          );
        }
      },
      { immediate: true },
    );

    return {
      options,
      t,
      isWalletLoading,
      commission,
      onChangeSend,
      onChangeReceive,
      calculateSendCoinQuantity,
      onChangeSendValue,
      onChangeReceiveValue,
      isExchanging,
      exchange,
      exchangeForm,
      swapCoins,
      isUserAuthed,
      unauthOptions,
      currentRate,
      receiveOnFocus,
      onReceiveFocus,
      onReceiveBlur,
    };
  },
};
</script>
<style lang="scss" scoped>
.exchange__card {
  padding: 20px;
  display: flex;
  border-radius: 14px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  flex-direction: column;
  gap: 20px;
  width: 100%;
  &-title {
    gap: 15px;
  }
  &-info {
    color: #fff;
    font-size: 24px;
    margin-left: 8px;
  }
  &-swap {
    display: flex;
    justify-content: center;
    img {
      transition: all 0.5s ease;
    }
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      height: 40px;
      width: 40px;
      cursor: pointer;
      background-color: var(--bg-input);
      &:hover {
        img {
          transform: rotate(90deg);
        }
      }
    }
  }
  &-rate {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
    color: var(--text-quaternary);
  }
  &-send,
  &-receive {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .title {
    font-size: 16px;
    color: var(--text-link);
  }
  &-select {
    margin-bottom: 10px;
  }
  &-networks {
    margin: 0 0 10px;
  }
}
</style>
