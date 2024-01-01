<template>
  <div class="container">
    <div class="footer">
      <a-row :gutter="[{ xs: 0, sm: 80 }, 40]" justify="center">
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <span @click="goTo('settings')">Settings</span>
            </a-col>
            <a-col>
              <span @click="goTo('history')">History</span>
            </a-col>
            <a-col>
              <span @click="goTo(null)">Main</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <a-badge status="success" title="Success"
                ><span>Stacking</span></a-badge
              >
            </a-col>
            <a-col>
              <span>Exchange</span>
            </a-col>
            <a-col>
              <span @click="goTo('wallets')">Wallet</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <span @click="goTo('about')">About Us</span>
            </a-col>
            <a-col>
              <span @click="goTo('terms')">Terms of use</span>
            </a-col>
            <a-col>
              <span @click="goTo('privacy')">Privacy</span>
            </a-col>
          </a-flex>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <a-flex vertical gap="large">
            <a-col>
              <a> {{ supportMail }}</a>
            </a-col>
            <a-col>
              <div class="centered">
                <img :style="{ width: '20px' }" src="telegram.png" />
                <a> Telegram </a>
              </div>
            </a-col>
          </a-flex>
        </a-col>
      </a-row>
    </div>
    <div class="reserved">Copyright 2017-2023 © Zalupa All Rights Reserved</div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const goTo = (path = null) => {
      if (!path) return router.push('/');
      router.push(`/${path}`);
    };
    const supportMail = import.meta.env.VITE_BASE_SUPPORT_MAIL;
    return {
      goTo,
      supportMail,
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
