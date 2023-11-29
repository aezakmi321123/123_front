<template>
  <div class="container auth">
    <a-row :gutter="[100, 0]">
      <a-col :span="12">
        <div class="auth__card">
          <h2 class="auth__card-label">{{ t('sign_up.register') }}</h2>
          <div class="auth__card-registered">
            <span
              >{{ t('sign_up.have_acc')
              }}<a @click="routeToLogin">{{ t('sign_up.login') }}</a></span
            >
          </div>
          <a-form layout="vertical" :model="formState" @finish="onFinish">
            <a-form-item
              :label="t('sign_up.full_name')"
              :name="['signup', 'fullName']"
              :rules="[{ required: true }]"
            >
              <CInput v-model:value="formState.signup.fullName"></CInput>
            </a-form-item>
            <a-form-item
              label="Email"
              :name="['signup', 'email']"
              :rules="[{ type: 'email', required: true }]"
            >
              <CInput v-model:value="formState.signup.email"></CInput>
            </a-form-item>
            <a-form-item
              label="Phone"
              :name="['signup', 'phone']"
              :rules="[{ type: 'string', required: true }]"
            >
              <CInput v-model:value="formState.signup.phone"></CInput>
            </a-form-item>
            <a-form-item
              :name="['signup', 'password']"
              :label="t('sign_up.password')"
              :rules="[{ required: true }]"
            >
              <CInput
                v-model:value="formState.signup.password"
                type="password"
              ></CInput>
            </a-form-item>
            <a-form-item label="Captcha">
              <a-row>
                <a-col :span="12">
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
                <a-col :span="12">
                  <a-form-item
                    name="captcha"
                    :rules="[
                      {
                        required: true,
                        type: 'string',
                        validator: validateCaptcha,
                        trigger: 'change',
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
              t('sign_up.sign_up')
            }}</CButton>
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
import { ReloadOutlined } from '@ant-design/icons-vue';
import { vMaska } from 'maska';
import { reactive, ref } from 'vue';
import VueClientRecaptcha from 'vue-client-recaptcha';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../modules/auth.js';
import CButton from '../ui/CButton.vue';
import CInput from '../ui/CInput.vue';
export default {
  components: {
    CInput,
    CButton,
    ReloadOutlined,
    VueClientRecaptcha,
  },
  directives: { maska: vMaska },
  setup() {
    const authStore = useAuthStore();
    const { t } = useI18n();
    const formState = reactive({
      signup: {
        fullName: '',
        email: '',
        password: '',
        phone: '',
      },
      captcha: '',
    });
    const router = useRouter();
    let currentCaptcha = ref('');
    const onFinish = async ({ signup }) => {
      try {
        await authStore.signUp(signup);
        router.push({ path: '/login' });
      } catch (e) {
        console.log(e);
      }
    };
    const routeToLogin = () => {
      router.push({ path: '/login' });
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
    return {
      formState,
      onFinish,
      getCaptchaCode,
      validateCaptcha,
      routeToLogin,
      t,
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
