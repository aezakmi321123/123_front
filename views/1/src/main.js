// import '../src/assets/scss/index.scss';

// import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import { createApp, markRaw } from 'vue';
import { createI18n } from 'vue-i18n';
import VueClickAway from 'vue3-click-away';

import en from './locale/en';
import ru from './locale/ru';
const i18nInstance = createI18n({
  locale:
    localStorage.getItem('lang') || import.meta.env.VITE_BASE_DEFAULT_LANG, // set locale
  fallbackLocale:
    localStorage.getItem('lang') || import.meta.env.VITE_BASE_DEFAULT_LANG, // set fallback locale
  legacy: false,
  useScope: 'global',
  messages: {
    en,
    ru,
  },
});
import App from './App.vue';
import router from './router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
const app = createApp(App);
app.use(i18nInstance);
app.use(router);
app.use(pinia);
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(router);
app.use(Antd);
app.use(VueClickAway);
app.mount('#app');

export const i18n = i18nInstance.global;
