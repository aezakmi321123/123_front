<template>
  <a-tabs v-model:activeKey="activeKey" size="large" type="card">
    <a-tab-pane key="1" tab="Deposit">
      <div class="transfer-card">
        <a-form layout="vertical">
          <a-form-item label="Currency:">
            <CAutocomplete
              v-model:value="valueSend"
              class="select1"
              :options="options"
            />
          </a-form-item>
          <a-form-item label="Amount to deposit:">
            <CInput />
          </a-form-item>
          <a-form-item>
            <CButton type="secondary" block>Get Address</CButton>
          </a-form-item>
        </a-form>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="Withdraw">
      <p>Content of Tab Pane 2</p>
      <p>Content of Tab Pane 2</p>
      <p>Content of Tab Pane 2</p>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { computed, ref } from 'vue';

import { useWalletStore } from '../modules/wallet.js';
import CAutocomplete from '../ui/CAutocomplete.vue';
import CButton from '../ui/CButton.vue';
import CInput from '../ui/CInput.vue';
export default {
  components: {
    CAutocomplete,
    CInput,
    CButton,
  },
  setup() {
    const activeKey = ref('1');
    const wallet = useWalletStore();
    const mapValue = ({ abbr, name }) => ({ label: name, value: abbr });
    const valueSend = ref(mapValue(wallet.coins[0]));
    const options = computed(() => wallet.coins.map(value => mapValue(value)));
    return {
      activeKey,
      options,
      valueSend,
    };
  },
};
</script>
<style lang="scss">
.ant-tabs-tab {
  background-color: var(--bg-select) !important;
  color: var(--text-primary);
  width: 100% !important;
  display: flex;
  justify-content: center;
}
.ant-tabs-tab-btn {
  width: 50% !important;
  text-align: center;
  font-size: 18px;

  font-weight: 500;
}
.ant-tabs-tab-active {
  border-bottom: 2px solid var(--bg-purple) !important;
  .ant-tabs-tab-btn {
    color: var(--bg-purple) !important;
  }
}
.ant-tabs-nav-list {
  width: 100% !important;
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
