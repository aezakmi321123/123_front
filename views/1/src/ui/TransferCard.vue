<template>
  <a-tabs v-model:activeKey="activeKey" size="large" type="card">
    <a-tab-pane key="1" :tab="t('wallets.dep')">
      <div class="transfer-card">
        <a-form layout="vertical">
          <a-form-item :label="t('wallets.currency')">
            <CAutocomplete
              class="select1"
              :options="options"
              :value="valueSend"
              @change="changeCoin"
            />
          </a-form-item>
          <a-form-item :label="t('wallets.deposit')">
            <CInputNumber type="number" />
          </a-form-item>
          <a-form-item>
            <CButton type="secondary" block>{{
              t('wallets.get_address')
            }}</CButton>
          </a-form-item>
        </a-form>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" :tab="t('wallets.withdraw')">
      <div class="transfer-card">
        <a-form layout="vertical">
          <a-form-item :label="t('wallets.currency')">
            <CAutocomplete
              class="select1"
              :options="options"
              :value="valueSend"
              @change="changeCoin"
            />
          </a-form-item>
          <a-form-item :label="t('wallets.w_amount')">
            <CInputNumber v-model:value="withdraw" type="number" />
          </a-form-item>
          <a-form-item :label="t('wallets.a_withdraw')">
            <CInputNumber />
          </a-form-item>
          <div class="info-group">
            <div class="info">
              <div class="info-title">{{ t('wallets.total_balance') }}</div>
              <div class="info-title">
                {{ `${valueSend.coinQuantity} ${valueSend.abbr}` }}
              </div>
            </div>
            <div class="info">
              <div class="wallet-table__switch">
                <CSwitch v-model:checked="showFee" />
                <div>
                  {{
                    t('wallets.fee', {
                      fee: `${withdraw / 100} ${valueSend.abbr}`,
                    })
                  }}
                </div>
              </div>
            </div>
            <div class="info">
              <div class="info-title">{{ t('wallets.sending') }}</div>
              <div class="info-title">
                {{ `${withdraw || ''} ${valueSend.abbr}` }}
              </div>
            </div>
            <div class="info">
              <div class="info-title">{{ t('wallets.receive') }}</div>
              <div class="info-title">
                {{
                  `${(showFee ? withdraw : withdraw - withdraw / 100) || ''} ${
                    valueSend.abbr
                  }`
                }}
              </div>
            </div>
          </div>
          <a-form-item>
            <CButton type="secondary" block>{{
              t('wallets.withdraw')
            }}</CButton>
          </a-form-item>
        </a-form>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../modules/auth.js';
import CAutocomplete from '../ui/CAutocomplete.vue';
import CButton from '../ui/CButton.vue';
import CInputNumber from '../ui/CInputNumber.vue';
import CSwitch from '../ui/CSwitch.vue';
export default {
  components: {
    CAutocomplete,
    CButton,
    CInputNumber,
    CSwitch,
  },
  props: {
    coin: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const withdraw = ref(null);
    const activeKey = ref('1');
    const showFee = ref(false);
    const { t } = useI18n();
    const authStore = useAuthStore();
    const mapValue = el => ({ label: el.name, value: el.abbr, ...el });
    const valueSend = ref();
    const options = computed(() =>
      authStore.user.coins.map(value => mapValue(value)),
    );
    const changeCoin = e => {
      valueSend.value = options.value.find(({ abbr }) => abbr === e);
    };
    watch(
      () => props.coin,
      e => {
        valueSend.value = mapValue(e);
      },
      { deep: true },
    );
    return {
      activeKey,
      options,
      valueSend,
      showFee,
      changeCoin,
      withdraw,
      t,
    };
  },
};
</script>
<style lang="scss">
.info {
  display: flex;
  justify-content: space-between;
  color: var(--text-link);
  font-size: 16px;
  &:last-child {
    padding-bottom: 10px;
  }
}
.info-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ant-tabs-tab {
  background-color: var(--bg-select) !important;
  color: var(--text-primary);
  width: 100% !important;
  display: flex;
  border-bottom: 2px solid var(--bg-base) !important;
  justify-content: center;
}
.ant-tabs-tab-btn {
  width: 49% !important;
  text-align: center;
  font-size: 18px;

  font-weight: 500;
}
.ant-tabs-tab-active {
  border-bottom: 2px solid var(--button-secondary) !important;
  .ant-tabs-tab-btn {
    color: var(--button-secondary) !important;
  }
}
.ant-tabs-nav-list {
  width: 99% !important;
  display: flex;
  justify-content: space-between;
  overflow: hidden !important;
}
.select1 {
  .ant-input-affix-wrapper {
    background-color: var(--bg-input) !important;
  }
}
.transfer-card {
  padding: 20px;
  border-radius: 14px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
}
</style>
