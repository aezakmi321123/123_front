<template>
  <div>
    <div class="header__mobile">
      <div class="header__mobile-image">
        <a @click="goToMainPage"><img src="/mainLogo.svg" /></a>
      </div>
      <div class="header__mobile-menu">
        <MenuOutlined
          :style="{ fontSize: '30px' }"
          @click="openMobile = true"
        />
      </div>
    </div>
    <div :class="['header container', { open: openMobile }]">
      <CloseOutlined
        :style="{ fontSize: '30px' }"
        class="header__close"
        @click="openMobile = false"
      />

      <a class="header__logo"
        ><img src="/mainLogo.svg" @click="goToMainPage"
      /></a>
      <div mode="horizontal" class="header__list">
        <a key="1" class="header__list-item" @click="goToMainPage"
          >{{ t('header.homepage') }}
        </a>
        <a key="2" class="header__list-item">{{ t('header.news') }}</a>
        <a key="3" class="header__list-item">{{
          t('header.top_directions')
        }}</a>
        <a key="4" class="header__list-item">{{ t('header.about_us') }}</a>
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
  <div v-if="authStore.isLoggedIn">
    <CDrawer v-model:open="drawer">
      <div class="drawer__body">
        <div class="drawer__user">
          <UserOutlined :style="{ fontSize: '40px' }" />
          <span>{{ authStore.user.fullName }}</span>
        </div>
        <div class="drawer__verified">
          <CTag color="error"
            >Verified
            <template #icon>
              <CloseOutlined />
            </template>
          </CTag>
          <CTag color="error"
            >Premium
            <template #icon>
              <CloseOutlined />
            </template>
          </CTag>
        </div>
        <div class="drawer__list">
          <div class="drawer__item">
            <WalletOutlined />
            <span @click="goTo('Wallets')">Wallet</span>
          </div>
          <div class="drawer__item" @click="goTo('settings')">
            <SettingOutlined />
            <span>Settings</span>
          </div>
          <div class="drawer__item">
            <HistoryOutlined />
            <span>History</span>
          </div>
          <div class="drawer__item logout" @click="logout">
            <LogoutOutlined />
            <span>LogOut</span>
          </div>
        </div>
      </div>
    </CDrawer>
  </div>
</template>
<script>
import {
  CaretDownFilled,
  CloseOutlined,
  HistoryOutlined,
  LogoutOutlined,
  MenuOutlined,
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
import CTag from '../../ui/CTag.vue';
export default {
  components: {
    CButton,
    MenuOutlined,
    CloseOutlined,
    LogoutOutlined,
    UserOutlined,
    CaretDownFilled,
    CSelect,
    CDrawer,
    WalletOutlined,
    SettingOutlined,
    HistoryOutlined,
    CTag,
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
.header {
  z-index: 1;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  height: 100px !important;
  align-items: center;
  &__close {
    display: none;
    height: 20px;
    width: 20px;
  }
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
  .header {
    position: fixed;
    display: none;
    width: 60%;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 2;
    justify-content: flex-start;
    height: 100vh !important;
    background-color: var(--bg-base);
    &.open {
      display: block;
    }
    &__close {
      display: block;
      position: absolute;
      top: 20px;
      cursor: pointer;
      right: 20px;
    }
    &__logo {
      margin-right: 90px;
    }
    &__logo img {
      display: none;
    }
    &__list {
      margin-top: 60px;
      align-items: center;
      flex-direction: column;
    }
    &__list-item {
      font-size: 20px;
    }
    &__buttons {
      margin-top: 50px;
      justify-content: center;
    }
    &__lang {
      display: none;
    }
  }
}
</style>
