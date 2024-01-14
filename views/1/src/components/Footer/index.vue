<template>
  <div class="container">
    <div class="footer">
      <a-row
        :gutter="[{ xs: 0, sm: 80 }, 40]"
        :justify="{ md: 'center', xs: 'space-between' }"
      >
        <a-col :xs="12" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <span @click="goTo('settings')">{{ t('footer.settings') }}</span>
            </a-col>
            <a-col>
              <span @click="goTo('history')">{{ t('footer.history') }}</span>
            </a-col>
            <a-col>
              <span @click="goTo(null)">{{ t('footer.main') }}</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="12" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <a-badge status="success" title="Success"
                ><span>{{ t('footer.stacking') }}</span></a-badge
              >
            </a-col>
            <a-col>
              <span @click="goTo('exchange')">{{ t('footer.exchange') }}</span>
            </a-col>
            <a-col>
              <span @click="goTo('wallets')">{{ t('footer.wallet') }}</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <span @click="goTo('about')">{{ t('footer.about_us') }}</span>
            </a-col>
            <a-col>
              <span @click="goTo('terms')">{{ t('footer.terms') }}</span>
            </a-col>
            <a-col>
              <span @click="goTo('privacy')">{{ t('footer.privacy') }}</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <a :href="`mailto:${supportMail}`"> {{ supportMail }}</a>
            </a-col>
            <a-col>
              <div class="centered">
                <img :style="{ width: '20px' }" src="@images/telegram.png" />
                <a :href="supportTelegram" target="_blank">
                  {{ t('footer.telegram') }}
                </a>
              </div>
            </a-col>
          </a-flex>
        </a-col>
      </a-row>
    </div>
    <div class="reserved">Copyright 2017-2024 © Zalupa All Rights Reserved</div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const goTo = (path = null) => {
      if (!path) return router.push('/');
      router.push(`/${path}`);
    };
    const supportMail = import.meta.env.VITE_BASE_SUPPORT_MAIL;
    const supportTelegram = import.meta.env.VITE_BASE_TELEGRAM_SUPPORT;
    return {
      goTo,
      supportMail,
      t,
      supportTelegram,
    };
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 50px;
  border-top: 1px solid var(--bg-input);
}
.reserved {
  padding-bottom: 20px;
  text-align: center;
}
.centered {
  display: flex;
  gap: 10px;
  align-items: center;
}
.footer {
  margin: 70px 0;
  span {
    color: var(--text-link);
    display: flex;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // height: 200px;
  // background: var(--bg-base);
}
</style>
