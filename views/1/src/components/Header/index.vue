<template>
  <div class="main-header">
    <div class="header__mobile">
      <div class="header__mobile-image">
        <a @click="goToMainPage"
          ><img :style="{ width: '160px' }" src="@images/logo.svg"
        /></a>
      </div>
      <div class="header__mobile-menu">
        <MenuOutlined :style="{ fontSize: '30px' }" @click="drawer = true" />
      </div>
    </div>
    <div>
      <div :class="['header container show-desktop', { open: openMobile }]">
        <a class="header__logo"
          ><img
            src="@images/logo.svg"
            :style="{ width: '160px' }"
            @click="goToMainPage"
        /></a>
        <div mode="horizontal" class="header__list">
          <a key="1" class="header__list-item" @click="goToMainPage"
            >{{ t('header.homepage') }}
          </a>
          <a key="1" class="header__list-item" @click="goTo('exchange')"
            >{{ t('header.exchange') }}
          </a>
          <a key="2" class="header__list-item" @click="goTo('terms')">{{
            t('header.terms')
          }}</a>
          <a key="3" class="header__list-item" @click="goTo('privacy')">{{
            t('header.privacy')
          }}</a>
          <a key="4" class="header__list-item" @click="goTo('about')">{{
            t('header.about_us')
          }}</a>
        </div>
        <div v-if="!authStore.isLoggedIn" class="header__buttons">
          <CSelect
            class="select__change-lang"
            :value="lang"
            :options="languages"
            option-label-prop="title"
            @change="changeLang"
          />
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
          <CSelect
            class="select__change-lang"
            :value="lang"
            :options="languages"
            option-label-prop="title"
            @change="changeLang"
          />
          <div class="header__buttons" @click="drawer = true">
            <UserOutlined :style="{ fontSize: '20px' }" />
            <a>{{ shortName(authStore.user.fullName) }}</a>
            <CaretDownFilled />
            <!-- <LogoutOutlined :style="{ fontSize: '20px' }" @click="logout" /> -->
          </div>
        </div>
      </div>
    </div>
    <MarqueeC />
  </div>
  <CDrawer v-model:open="drawer">
    <template #extra>
      <CSelect
        class="show-mobile select__change-lang"
        :value="lang"
        :options="languages"
        option-label-prop="title"
        @change="changeLang"
      ></CSelect
    ></template>
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
        <div class="drawer__item show-mobile">
          <HomeOutlined />
          <span @click="goTo('')">{{ t('header.homepage') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <InteractionOutlined />
          <span @click="goTo('exchange')">{{ t('header.exchange') }}</span>
        </div>
        <div v-if="authStore.isLoggedIn" class="drawer__item">
          <WalletOutlined />
          <span @click="goTo('wallets')">{{ t('header.wallet') }}</span>
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
          <span @click="goTo('history')">{{ t('header.history') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <FileSearchOutlined />
          <span @click="goTo('terms')">{{ t('header.terms') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <SafetyOutlined />
          <span @click="goTo('privacy')">{{ t('header.privacy') }}</span>
        </div>
        <div class="drawer__item show-mobile">
          <TeamOutlined />
          <span @click="goTo('about')">{{ t('header.about_us') }}</span>
        </div>
        <div
          v-if="authStore.isLoggedIn"
          class="drawer__item logout"
          @click="logout"
        >
          <LogoutOutlined />
          <span>{{ t('header.logout') }}</span>
        </div>
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
  InteractionOutlined,
  LogoutOutlined,
  MenuOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from '@ant-design/icons-vue';
import { computed, h, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '../../modules/auth.js';
import CButton from '../../ui/CButton.vue';
import CDrawer from '../../ui/CDrawer.vue';
import CSelect from '../../ui/CSelect.vue';
import MarqueeC from '../../ui/Marquee.vue';
const defaultLang = import.meta.env.VITE_BASE_DEFAULT_LANG;
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
    InteractionOutlined,
    MarqueeC,
    SafetyOutlined,
    TeamOutlined,
  },
  setup() {
    const { t, locale } = useI18n();
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const openMobile = ref(false);
    const lang = ref(localStorage.getItem('lang') || defaultLang || 'en');
    const drawer = ref(false);
    const shortName = name => {
      if (name.length > 10) {
        return `${name.slice(0, 10)}...`;
      }
      return name;
    };
    const getImageUrl = name => {
      return new URL(
        `/public/assets/${name.toLowerCase()}.svg`,
        import.meta.url,
      ).href;
    };
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
    watch(
      () => route.fullPath,
      () => (drawer.value = false),
      { deep: true },
    );
    const languages = computed(() =>
      ['en', 'ru'].map(el => ({
        label: el,
        value: el,
        title: h(
          'div',
          { style: { display: 'flex', 'align-items': 'center', gap: '10px' } },
          [
            h('img', {
              src: getImageUrl(el),
              style: {
                width: '26px',
                height: '26px',
              },
            }),
            h('span', {}, el.toUpperCase()),
          ],
        ),
      })),
    );
    const changeLang = el => {
      lang.value = el;
      locale.value = el;
      localStorage.setItem('lang', el);
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
      getImageUrl,
      shortName,
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
    @include mq(575px, max-width) {
      gap: 20px;
    }
  }
  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @include mq(575px, max-width) {
      gap: 14px;
    }
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
    @include mq(575px, max-width) {
      gap: 14px;
      font-weight: 500;
      gap: 20px;
    }
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 20px;
    @include mq(575px, max-width) {
      gap: 14px;
      font-size: 16px;
    }
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
  @include mq(575px, max-width) {
    height: 60px;
    padding: 0 3% !important;
  }
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
    margin-right: 40px;
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
    @include mq(1642px, max-width) {
      font-size: 12px !important;
    }
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
.select__change-lang {
  .ant-select-selection-item {
    padding-top: 0 !important;
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
