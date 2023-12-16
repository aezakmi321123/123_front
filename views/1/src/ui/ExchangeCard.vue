<template>
  <div>
      <div class="exchange__card">
        <div class="exchange__card-send">
          <div class="title">{{ t('main.send') }}</div>
          <a-spin :spinning="isWalletLoading">
            <div class="exchange__card-select">
              <CAutocomplete :value="valueSend" :options="options" @change="onChangeSend"/>
            </div>
            <CInputNumber v-model:value="valueNumberSend" @change="onChangeSendValue" />
          </a-spin>
        </div>
        <div class="exchange__card-swap">
          <div class="img">
            <img height="20" width="20" src="replace.svg" />
          </div>
        </div>
        <div class="exchange__card-receive">
          <div class="title">{{ t('main.receive') }}</div>
          <a-spin :spinning="isWalletLoading">
            <div class="exchange__card-select">
              <CAutocomplete :value="valueReceive" :options="options" @change="onChangeReceive" />
            </div>
            <CInputNumber v-model:value="valueNumberReceive" @change="onChangeReceiveValue" />
          </a-spin>
        </div>
        <div class="exchange__card-rate">
          <div>{{t('exchange.mainCard.exchangeRate')}}: 1 {{valueSend.value}} = {{calculateCoinQuantity()}} {{valueReceive.value}}</div>
          <div>{{t('exchange.mainCard.ourCommission')}}: {{commission}}%</div>
        </div>
        <div class="exchange__card-exchnage">
          <CButton size="large" type="secondary" :disabled="isExchanging" block @click="exchange">{{
              t('main.exchange')
            }}</CButton>
        </div>
      </div>
  </div>
</template>
<script>
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { cMessage } from "../heplers/message.js";
import { useAuthStore } from "../modules/auth.js";
import { useWalletStore } from '../modules/wallet.js';
import CAutocomplete from '../ui/CAutocomplete.vue';
import CButton from '../ui/CButton.vue';
import CInputNumber from '../ui/CInputNumber.vue';
export default {
  components: {
    CAutocomplete,
    CInputNumber,
    CButton,
  },
  props: {
    selectedCard: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const wallet = useWalletStore()
    const auth = useAuthStore()

    const { t } = useI18n();

    const mapValue = ({ abbr, name } = { abbr: '', name: '' }) => ({ label: name, value: abbr });

    const valueSend = ref({});
    const valueNumberSend = ref(0);

    const valueReceive = ref({})
    const valueNumberReceive = ref( 0);

    const isExchanging = ref(false);

    const options = computed(() => wallet.coins?.map?.(value => mapValue(value)));
    const isWalletLoading = computed(() => wallet.isLoading)

    const currentRate = computed(() => {
      const wsData = wallet.wsData.coins
      const rateSend = wsData[valueSend?.value?.value]
      const rateReceive = wsData[valueReceive?.value?.value]

      return parseFloat(rateSend?.c || 1) / parseFloat(rateReceive?.c || 1)
    })

    const commission = import.meta.env.VITE_BASE_COMMISSION

    const calculateCoinQuantity = (quantity = 1, commission) => {
      const fullSum = parseFloat(currentRate.value) * parseFloat(quantity)

      if(commission){
        return (fullSum - (fullSum * parseFloat(commission) / 100)).toFixed(6)
      }

      return fullSum.toFixed(6)
    }

    const exchange = async () => {
      isExchanging.value = true

      if(valueSend.value.value === valueReceive.value.value){
        isExchanging.value = false
        return cMessage('error', t('exchange.sameCoins'))

      }

      try {
        await wallet.exchange({
          coinFrom: valueSend.value.value,
          coinTo: valueReceive.value.value ,
          quantity: valueNumberSend.value.toString(),
          commission
        })

        await auth.getUser()
      } finally {
        isExchanging.value = false
      }
    }

    onMounted(() => {

      valueReceive.value = mapValue(wallet?.coins?.[1])
    })

    watch(() => props.selectedCard, () => {
      valueSend.value = mapValue(props.selectedCard)
    }, { immediate: true })

    watch(() => valueSend, () => {
      valueNumberSend.value = auth.user.coins
          .find(({ abbr }) => abbr === valueSend.value.value)?.coinQuantity || 0

      valueNumberReceive.value = calculateCoinQuantity(valueNumberSend.value, commission)
    }, { immediate: true, deep: true })

    watch(() => valueReceive, () => {
      valueNumberReceive.value = calculateCoinQuantity(valueNumberSend.value, commission)
    }, { immediate: true, deep: true })

    const onChangeSend = e => {
      valueSend.value = options.value.find(({ value }) => value === e) || e
    };

    const onChangeReceive = e => {
      valueReceive.value = options.value.find(({ value }) => value === e) || e
    };

    const onChangeSendValue = (e) => {
      valueNumberReceive.value = calculateCoinQuantity(e || 0, commission)
    }

    const onChangeReceiveValue = e => {
      valueNumberSend.value = calculateCoinQuantity(e || 0, commission)
    }

    return {
      options,
      valueSend,
      t,
      valueReceive,
      isWalletLoading,
      commission,
      valueNumberSend,
      valueNumberReceive,
      onChangeSend,
      onChangeReceive,
      calculateCoinQuantity,
      onChangeSendValue,
      onChangeReceiveValue,
      isExchanging,
      exchange
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
  &-select {
    margin-bottom: 10px;
  }
  .title {
    font-size: 16px;
    color: var(--text-link);
  }
}
</style>
