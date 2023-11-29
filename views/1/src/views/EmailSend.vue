<template>
  <div class="container auth">
    <a-row :gutter="[100, 0]">
      <a-col :span="12">
        <div class="auth__card">
          <h2 class="auth__card-label">Reset password</h2>
          <div class="auth__card-registered">
            <span
              >Remember Password? <a>{{ t('sign_up.login') }}</a></span
            >
          </div>
          <a-form layout="vertical" :model="formState" @finish="onFinish">
            <a-form-item
              label="Email"
              :name="['email']"
              :rules="[{ type: 'email', required: true }]"
            >
              <CInput
                v-model:value="formState.email"
                placeholder="Ender email"
              ></CInput>
            </a-form-item>
            <CButton html-type="submit" size="large" type="secondary" block
              >Reset Password</CButton
            >
          </a-form>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="auth__image">
          <img :style="{ width: '100%' }" src="wow.png" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { cMessage } from '../heplers/message.js';
import rest from '../rest/index.js';
import CButton from '../ui/CButton.vue';
import CInput from '../ui/CInput.vue';
export default {
  components: {
    CInput,
    CButton,
  },
  setup() {
    const { t } = useI18n();

    const formState = reactive({
      email: '',
    });
    const router = useRouter();
    const onFinish = async params => {
      try {
        await rest.auth.forgotPassword(params);
        await cMessage('success', 'хуй');
      } catch (e) {
        console.log(e);
      }
    };

    const routeToRegister = () => {
      router.push({ path: '/register' });
    };
    const goToResetSend = () => {
      router.push({ path: '/reset-send' });
    };
    return {
      formState,
      onFinish,
      routeToRegister,
      t,
      goToResetSend,
    };
  },
};
</script>
<style lang="scss">
@import url('/node_modules/vue-client-recaptcha/dist/style.css');
.vue_client_recaptcha .captcha_canvas,
.vue_client_recaptcha_icon,
.vue_client_recaptcha_icon:hover {
  background-color: var(--bg-input);
  padding: 0 10px;
}
.vue_client_recaptcha {
  border: 1px solid var(--border-input);
  border-radius: 4px;
  width: fit-content;
  justify-content: flex-start;
}
.auth__image {
  margin-top: -70px;
}
.auth__card {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 22px;
  border-radius: 14px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
}
.auth__card-registered {
  font-size: 18px;
}
</style>
