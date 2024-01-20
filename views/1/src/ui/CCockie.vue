<template>
  <div v-if="!accepted">
    <div class="cookie-banner">
      <div class="container">
        <a-row justify="center" :gutter="[20, 20]" align="center">
          <a-col :lg="20">
            <div class="cookie-banner__text">
              <div>
                <span>{{ t('cockie.text1') }} </span>
                <span
                  ><a @click="goToTerms"> {{ exchangeName }} </a>.</span
                >
                <span>{{ t('cockie.text2') }}</span>
              </div>
            </div>
          </a-col>
          <a-col :lg="4">
            <CButton size="large" type="secondary" @click="acceptCookies">{{
              t('cockie.accept')
            }}</CButton>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import CButton from './CButton.vue';
export default {
  components: {
    CButton,
  },
  setup() {
    const accepted = ref(sessionStorage.getItem('cookiesAccepted') === 'true');
    const { t } = useI18n();
    const router = useRouter();
    const goToTerms = () => router.push({ path: '/terms' });
    const exchangeName = import.meta.env.VITE_BASE_EXCHANGE_NAME;
    const acceptCookies = () => {
      accepted.value = true;
      sessionStorage.setItem('cookiesAccepted', 'true');
    };

    return { accepted, acceptCookies, t, exchangeName, goToTerms };
  },
};
</script>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  padding: 40px 10px;
  @include mq(500px, max-width) {
    padding: 20px;
  }
  &__text {
    font-size: 18px;
    height: 100%;
    line-height: 2;
    display: flex;
    align-items: center;
    @include mq(500px, max-width) {
      font-size: 12px;
    }
  }
}
</style>
