<template>
  <div class="container auth">
    <a-row
      :gutter="[{ xs: 0, lg: 100 }]"
      :justify="{ xs: 'center', sm: 'center', md: 'center' }"
    >
      <a-col :xs="24" :sm="18" :md="16" :lg="14" :xl="12">
        <div class="auth__card">
          <h2 class="auth__card-label">{{ t('signin.login') }}</h2>
          <div class="auth__card-registered">
            <span
              >{{ t('signin.new_user') }}
              <a @click="routeToRegister">{{ t('signin.create') }}</a></span
            >
            |
            <a @click="goToResetSend">{{ t('signin.forgot') }}</a>
          </div>
          <a-form layout="vertical" :model="formState" @finish="onFinish">
            <a-form-item
              label="Email"
              :name="['login', 'email']"
              :rules="[
                { type: 'email', required: true, message: t('required') },
              ]"
            >
              <CInput
                v-model:value="formState.login.email"
                label="423432"
              ></CInput>
            </a-form-item>
            <a-form-item
              :name="['login', 'password']"
              :label="t('signin.password')"
              :rules="[
                { required: true, message: t('required') },
                {
                  type: 'string',
                  min: 7,
                  message: t('min 7 symbols'),
                },
              ]"
            >
              <CInput
                v-model:value="formState.login.password"
                type="password"
              ></CInput>
            </a-form-item>
            <a-form-item label="Captcha">
              <a-row :gutter="[{ sm: 20 }, { sm: 20 }]">
                <a-col :xs="24" :sm="14" :md="12">
                  <VueClientRecaptcha
                    hide-lines
                    custom-text-color="#c2beda"
                    :value="inputValue"
                    chars="0123456789"
                    @get-code="getCaptchaCode"
                  >
                    <template #icon>
                      <ReloadOutlined
                        :style="{
                          'font-size': '20px',
                          color: 'var(--text-link)',
                        }"
                      />
                    </template>
                  </VueClientRecaptcha>
                </a-col>
                <a-col :xs="24" :sm="10" :md="12">
                  <a-form-item
                    name="captcha"
                    :rules="[
                      {
                        required: true,
                        type: 'string',
                        validator: validateCaptcha,
                        trigger: 'change',
                        message: t('captcha'),
                      },
                    ]"
                  >
                    <CInput
                      v-model:value="formState.captcha"
                      placeholder="Enter Captcha"
                    ></CInput>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form-item>
            <CButton html-type="submit" size="large" type="secondary" block>{{
              t('signin.sign_in')
            }}</CButton>
          </a-form>
        </div>
      </a-col>
      <a-col :xs="0" :lg="10" :xl="12">
        <div class="auth__image">
          <img :style="{ width: '100%' }" src="../../public/wow.png" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ReloadOutlined } from '@ant-design/icons-vue';
import { reactive, ref } from 'vue';
import VueClientRecaptcha from 'vue-client-recaptcha';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../modules/auth.js';
import CButton from '../ui/Cbutton.vue';
import CInput from '../ui/CInput.vue';
export default {
  components: {
    CInput,
    CButton,
    ReloadOutlined,
    VueClientRecaptcha,
  },
  setup() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const formState = reactive({
      login: {
        email: '',
        password: '',
      },
      captcha: '',
    });
    const router = useRouter();
    let currentCaptcha = ref('');
    const onFinish = async ({ login }) => {
      try {
        authStore.signIn(login).then(() => router.push('/wallets'));
      } catch (e) {
        console.log(e);
      }
    };
    const getCaptchaCode = code => {
      currentCaptcha.value = code;
    };
    const validateCaptcha = async () => {
      const captcha = formState.captcha;
      if (captcha === currentCaptcha.value) {
        return Promise.resolve();
      } else return Promise.reject('Captha is invalid');
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
      getCaptchaCode,
      validateCaptcha,
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
