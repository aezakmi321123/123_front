<template>
  <div class="container auth">
    <a-row
      :gutter="[{ xs: 0, lg: 100 }]"
      :justify="{ xs: 'center', sm: 'center', md: 'center' }"
    >
      <a-col :xs="24" :sm="18" :md="16" :lg="14" :xl="12">
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
              :rules="[{ required: true, message: t('required') }]"
            >
              <CInput v-model:value="formState.signup.fullName"></CInput>
            </a-form-item>
            <a-form-item
              label="Email"
              :name="['signup', 'email']"
              :rules="[
                { type: 'email', required: true, message: t('required') },
              ]"
            >
              <CInput
                v-model:value="formState.signup.email"
                :style="{ style: '20%' }"
              ></CInput>
            </a-form-item>
            <a-form-item
              :name="['signup', 'password']"
              :label="t('sign_up.password')"
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
                v-model:value="formState.signup.password"
                type="password"
              ></CInput>
            </a-form-item>
            <a-form-item
              :name="['signup', 'referralCode']"
              label="Referral Code"
            >
              <CInput
                v-model:value="formState.signup.referralCode"
                type="string"
              ></CInput>
            </a-form-item>
            <a-form-item :label="t('sign_up.captcha')">
              <a-row
                :gutter="[
                  { xs: 20, sm: 50 },
                  { xs: 20, sm: 50 },
                ]"
              >
                <a-col :xs="24" :sm="24" :md="12">
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
                <a-col :xs="24" :sm="24" :md="12">
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
                      :placeholder="t('sign_up.enter_captcha')"
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
      <a-col :xs="0" :lg="10" :xl="12">
        <div class="auth__image">
          <img :style="{ width: '80%' }" src="@images/wow.png" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ReloadOutlined } from '@ant-design/icons-vue';
import codes from 'country-calling-code';
import { vMaska } from 'maska';
import { computed, onMounted, reactive, ref } from 'vue';
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
        referralCode: '',
        phone: '',
      },
      captcha: '',
      countryCode: import.meta.env.VITE_BASE_DEFAULT_COUNTRY_CODE,
    });
    onMounted(() => {
      if (localStorage.getItem('refCode')) {
        formState.signup.referralCode = localStorage.getItem('refCode');
      }
    });
    const router = useRouter();
    let currentCaptcha = ref('');
    const mapValue = el => ({
      label: `+${el.countryCodes[0]}(${el.country})`,
      value: el.countryCodes[0],
      ...el,
    });
    const newCodes = computed(() => {
      return codes.map(mapValue);
    });
    const onFinish = async ({ signup }) => {
      console.log(signup);
      authStore.signUp(signup).then(() => router.push({ path: '/wallets' }));
    };
    const routeToLogin = () => {
      router.push({ path: '/login' });
    };
    const getCaptchaCode = code => {
      currentCaptcha.value = code;
    };
    const filterOption = (input, option) => {
      return (
        option.country.toLowerCase().includes(input.toLowerCase()) ||
        option.countryCodes[0].includes(input)
      );
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
      newCodes,
      filterOption,
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
.input-group {
  display: flex;
}
</style>
