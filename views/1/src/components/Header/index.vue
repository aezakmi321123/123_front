<template>
  <div class="main-header">
    <div class="header__mobile">
      <div class="header__mobile-image">
        <a @click="goToMainPage"><img src="/mainLogo.svg" /></a>
      </div>
      <div class="header__mobile-menu">
        <MenuOutlined :style="{ fontSize: '30px' }" @click="drawer = true" />
      </div>
    </div>
    <div>
      <div :class="['header container show-desktop', { open: openMobile }]">
        <a class="header__logo"
          ><img src="/mainLogo.svg" @click="goToMainPage"
        /></a>
        <div mode="horizontal" class="header__list">
          <a key="1" class="header__list-item" @click="goToMainPage"
            >{{ t('header.homepage') }}
          </a>
          <a key="2" class="header__list-item" @click="goTo('terms')"
            >Terms of use</a
          >
          <a key="3" class="header__list-item" @click="goTo('privacy')"
            >Privacy</a
          >
          <a key="4" class="header__list-item" @click="goTo('about')">{{
            t('header.about_us')
          }}</a>
        </div>
        <div v-if="!authStore.isLoggedIn" class="header__buttons">
          <CSelect :value="lang" :options="languages" @change="changeLang" />
          <router-link to="/login"
            ><CButton type="primary">{{
              t('header.signin')
            }}</CButton></router-link
          >
          <router-link to="/register"
            ><CButton type="primary">{{
              t('header.signup')
            }}</CButton></router-link
          >
        </div>
        <div v-else class="header__right">
          <CSelect :value="lang" :options="languages" @change="changeLang" />
          <div class="header__buttons" @click="drawer = true">
            <UserOutlined :style="{ fontSize: '20px' }" />
            <a>{{ authStore.user.fullName }}</a>
            <CaretDownFilled />
            <!-- <LogoutOutlined :style="{ fontSize: '20px' }" @click="logout" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <CDrawer v-model:open="drawer">
    <div class="drawer__body">
      <div v-if="authStore.isLoggedIn" class="drawer__user">
        <UserOutlined :style="{ fontSize: '100px' }" />
        <span>{{ authStore.user.fullName }}</span>
      </div>
      <div v-if="authStore.isLoggedIn" class="drawer__verified">
        <a-tag
          :bordered="false"
          :color="authStore.user.emailConfirmed ? 'success' : 'error'"
          >{{
            t(
              `header.${
                authStore.user.emailConfirmed ? 'verified' : 'no_verified'
              }`,
            )
          }}
        </a-tag>
      </div>
      <div class="drawer__list">
        <div v-if="authStore.isLoggedIn" class="drawer__item">
          <WalletOutlined />
          <span @click="goTo('wallets')">{{ t('header.wallet') }}</span>
        </div>
        <div v-if="!authStore.isLoggedIn" class="header__buttons">
          <router-link to="/login"
            ><CButton type="primary">{{
              t('header.signin')
            }}</CButton></router-link
          >
          <router-link to="/register"
            ><CButton type="primary">{{
              t('header.signup')
            }}</CButton></router-link
          >
        </div>
        <div
          v-if="authStore.isLoggedIn"
          class="drawer__item"
          @click="goTo('settings')"
        >
          <SettingOutlined />
          <span>{{ t('header.settings') }}</span>
        </div>
        <div v-if="authStore.isLoggedIn" class="drawer__item">
          <HistoryOutlined />
          <span>{{ t('header.history') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <HomeOutlined />
          <span>{{ t('header.homepage') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <FileSearchOutlined />
          <span>{{ t('header.news') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <QuestionOutlined />
          <span @click="goTo('privacy')">{{ t('header.about_us') }}</span>
        </div>
        <div
          v-if="authStore.isLoggedIn"
          class="drawer__item logout"
          @click="logout"
        >
          <LogoutOutlined />
          <span>{{ t('header.logout') }}</span>
        </div>
        <CSelect
          class="show-mobile"
          :value="lang"
          :options="languages"
          @change="changeLang"
        />
      </div>
    </div>
  </CDrawer>
</template>
<script>
import {
  CaretDownFilled,
  FileSearchOutlined,
  HistoryOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../../modules/auth.js';
import CButton from '../../ui/CButton.vue';
import CDrawer from '../../ui/CDrawer.vue';
import CSelect from '../../ui/CSelect.vue';
export default {
  components: {
    CButton,
    MenuOutlined,
    LogoutOutlined,
    UserOutlined,
    CaretDownFilled,
    CSelect,
    CDrawer,
    WalletOutlined,
    SettingOutlined,
    HistoryOutlined,
    HomeOutlined,
    FileSearchOutlined,
    QuestionOutlined,
  },
  setup() {
    const { t, locale } = useI18n();
    const authStore = useAuthStore();
    const router = useRouter();
    const openMobile = ref(false);
    const lang = ref('en');
    const drawer = ref(false);
    const logout = async () => {
      try {
        await authStore.logOut();
        router.push({ path: '/' });
      } catch (e) {
        console.log(e);
      } finally {
        drawer.value = false;
      }
    };
    const languages = computed(() =>
      ['en', 'ru'].map(el => ({ label: el, value: el })),
    );
    const changeLang = el => {
      lang.value = el;
      locale.value = el;
    };
    const goToMainPage = () => {
      router.push({ path: '/' });
    };
    const goTo = path => {
      router.push(`/${path}`);
      drawer.value = false;
    };
    const onClickAway = () => {
      if (openMobile.value) openMobile.value = false;
    };

    return {
      openMobile,
      onClickAway,
      goToMainPage,
      authStore,
      logout,
      t,
      languages,
      lang,
      changeLang,
      drawer,
      goTo,
    };
  },
};
</script>
<style lang="scss">
.show-mobile {
  display: none !important;
}
.show-desktop {
  display: block;
}
.drawer {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    span {
      font-size: 20px;
      color: var(--text-link);
    }
  }
  &__verified {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  &__list {
    color: var(--text-link);
    display: flex;
    font-size: 20px;
    font-weight: 700;
    flex-direction: column;
    gap: 30px;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.logout {
      color: #ff4d4f;
    }
  }
}
.header__mobile {
  display: none;
  height: 100px;
  @include mq(992px, max-width) {
    display: block;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  }
}
.main-header {
  position: sticky;
  top: 0;
  background: var(--bg-base);
  z-index: 99;
}
.header {
  z-index: 1;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  height: 100px !important;
  align-items: center;
  &__right {
    display: flex;
  }
  &__logo {
    margin-right: 90px;
  }
  &__logo img {
    width: 180px;
    max-width: 250px;
    max-height: 100px;
    vertical-align: middle;
  }
  &__list {
    display: flex;
    gap: 25px;
  }
  &__list-item {
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    color: var(--text-link);
    &:hover {
      color: var(--text-link);
      opacity: 0.8;
    }
  }
  &__buttons {
    color: var(--text-link);
    margin-left: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  &__lang {
    padding-left: 50px;
    color: var(--text-primary);
  }
}
@include mq(992px, max-width) {
  .show-mobile {
    display: flex !important;
  }
  .show-desktop {
    display: none;
  }
}
</style>
