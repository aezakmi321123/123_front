<template>
  <div class="container auth">
    <a-row :gutter="[{ xs: 0, lg: 100 }]" :justify="{ xs: 'center' }">
      <a-col :xs="24" :sm="18" :md="16" :lg="14" :xl="12">
        <div class="auth__card">
          <h2 class="auth__card-label">Enter new password</h2>
          <div class="auth__card-registered">
            <span
              >Remember Password?
              <a @click="routeToLogin">{{ t('sign_up.login') }}</a></span
            >
          </div>
          <a-form layout="vertical" :model="formState" @finish="onFinish">
            <a-form-item
              :name="['newPassword']"
              :label="t('signin.password')"
              :rules="[{ required: true, message: t('required') }]"
            >
              <CInput
                v-model:value="formState.newPassword"
                type="password"
                placeholder="new password"
              ></CInput>
            </a-form-item>
            <CButton html-type="submit" size="large" type="secondary" block
              >Change password</CButton
            >
          </a-form>
        </div>
      </a-col>
      <a-col :xs="0" :lg="10" :xl="12">
        <div class="auth__image">
          <img :style="{ width: '80%' }" src="@images/wow.png" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

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
    const router = useRouter();

    const formState = reactive({
      newPassword: '',
    });
    const route = useRoute();

    const routeToLogin = () => {
      router.push({ path: '/login' });
    };
    const onFinish = async ({ newPassword }) => {
      try {
        // console.log({
        //   token: route.query.token,
        //   newPassword,
        // });
        const res = await rest.auth.resetPassword({
          token: route.query.token,
          newPassword,
        });
        await cMessage('success', res?.data?.message || t('success'));
        routeToLogin();
      } catch (e) {
        console.log(e);
      }
    };

    return {
      formState,
      onFinish,
      t,
      routeToLogin,
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
  display: flex;
  align-items: center;
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
  @include mq(575px, max-width) {
    font-size: 14px;
  }
}
</style>
