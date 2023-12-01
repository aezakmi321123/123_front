<template>
  <div class="container">
    <div class="settings">
      <h2>{{ t('settings.title') }}</h2>
      <a-form layout="vertical" :model="formState" @finish="onFinish">
        <a-row :justify="'space-between'" :gutter="[20, 20]">
          <a-col :lg="12">
            <a-form-item :label="t('settings.name')">
              <CInput v-model:value="formState.fullName" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="10">
            <a-form-item
              label="Email"
              :name="['email']"
              :rules="[{ type: 'email', required: true }]"
            >
              <CInput v-model:value="formState.email" readonly />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="10">
            <a-form-item :label="t('settings.city')">
              <CInput v-model:value="formState.city" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="10">
            <a-form-item :label="t('settings.country')">
              <CInput v-model:value="formState.country" />
            </a-form-item>
          </a-col>
          <a-col :lg="12" :md="10">
            <a-form-item :label="t('settings.phone')">
              <CInput v-model:value="formState.phone" />
            </a-form-item>
          </a-col>
        </a-row>
        <CButton class="settings__submit" html-type="submit" type="secondary">{{
          t('btns.update')
        }}</CButton>
      </a-form>
      <CButton
        v-if="!authStore.user.emailConfirmed"
        class="settings__submit"
        type="primary"
        @click="emailModal = true"
        >{{ t('settings.confirm_btn') }}</CButton
      >
      <a-tag v-else :bordered="false" color="success" class="settings__submit"
        >{{ t('settings.confirmed') }}
      </a-tag>
      <CModal v-model:open="emailModal" centered>
        <div class="modal">
          <div class="modal__body">
            <CInputNumber v-model:value="code" placeholder="Enter Code" />
            <CButton
              type="secondary"
              :loading="sendLoading"
              @click="confirmEmail"
              >Send Code</CButton
            >
          </div>
          <div class="modal__footer">
            <CButton type="primary" @click="emailModal = false">{{
              t('btns.cancel')
            }}</CButton>
            <CButton type="secondary" @click="confirmEmailCode">{{
              t('btns.submit')
            }}</CButton>
          </div>
        </div>
      </CModal>
    </div>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash-es';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '../modules/auth.js';
import CButton from '../ui/CButton.vue';
import CInput from '../ui/CInput.vue';
import CInputNumber from '../ui/CInputNumber.vue';
import CModal from '../ui/CModal.vue';
export default {
  components: {
    CInput,
    CButton,
    CModal,
    CInputNumber,
  },
  setup() {
    const emailModal = ref(false);
    const authStore = useAuthStore();
    const code = ref();
    const { t } = useI18n();
    const sendLoading = ref(false);
    const formState = ref(cloneDeep(authStore.user));
    // console.log(formState.value);
    const onFinish = async () => {
      try {
        // console.log(formState.value);
        await authStore.updateUser(formState.value);
      } catch (e) {
        console.log(e);
      }
    };
    const confirmEmail = async () => {
      try {
        sendLoading.value = true;
        await authStore.confirmEmail({ email: formState.value.email });
      } catch (e) {
        console.log(e);
      } finally {
        sendLoading.value = false;
      }
    };
    const confirmEmailCode = () => {
      authStore.confirmEmailCode({
        id: formState.value.id,
        code: code.value,
      });
    };
    return {
      authStore,
      formState,
      onFinish,
      emailModal,
      confirmEmail,
      sendLoading,
      code,
      confirmEmailCode,
      t,
    };
  },
};
</script>
<style lang="scss" scoped>
.settings {
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  padding: 20px;
  border-radius: 14px;
  &__submit {
    margin-top: 30px;
  }
}
.modal__body {
  padding-top: 40px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.modal__footer {
  margin-top: 40px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
