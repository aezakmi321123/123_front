<template>
  <div class="exchange__card">
    <div class="exchange__card-send">
      <div class="title">{{ t('main.send') }}</div>
      <div class="select">
        <CAutocomplete v-model:value="valueSend" :options="options">
        </CAutocomplete>
      </div>
      <CInputNumber />
    </div>
    <div class="exchange__card-swap">
      <div class="img">
        <img height="20" width="20" src="replace.svg" />
      </div>
    </div>
    <div class="exchange__card-receive">
      <div class="title">{{ t('main.receive') }}</div>
      <div class="select">
        <CAutocomplete v-model:value="valueReceive" :options="options" />
      </div>
      <CInputNumber />
    </div>
    <div class="exchange__card-rate">
      <div>Exchange rate: 1 BUSD = 1.00328489 USD</div>
      <div>Reserve: 10968899.999337 USD</div>
    </div>
    <div class="exchange__card-exchnage">
      <CButton size="large" type="secondary" block>{{
        t('main.exchange')
      }}</CButton>
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
  setup() {
    const wallet = useWalletStore();
    const { t } = useI18n();
    const mapValue = ({ abbr, name }) => ({ label: name, value: abbr });
    const valueSend = ref(mapValue(wallet.coins[0]));
    const valueReceive = ref(mapValue(wallet.coins[1]));
    const options = computed(() => wallet.coins.map(value => mapValue(value)));
    return {
      options,
      valueSend,
      t,
      valueReceive,
    };
  },
};
</script>
<style lang="scss">
.exchange__card {
  padding: 20px;
  display: flex;
  border-radius: 14px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  flex-direction: column;
  gap: 20px;
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
}
</style>
