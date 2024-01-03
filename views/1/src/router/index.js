import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../modules/auth';
// const Home = () => import('../views/Main.vue');
// const Login = () => import('../views/Login.vue');
// const Register = () => import('../views/Register.vue');
// const Settings = () => import('../views/Settings.vue');
// const EMailSend = () => import('../views/EmailSend.vue');
// const ForgotPassword = () => import('../views/ForgotPassword.vue');
// const Exchange = () => import('../views/Exchange.vue');
// const Wallets = () => import('../views/Wallets.vue');
// const Payment = () => import('../views/Payment.vue');
// // const Privacy = async () => await import('../views/Privacy.vue');
// const Terms = () => import('../views/Terms.vue');
// const About = () => import('../views/About.vue');
// const History = () => import('../views/History.vue');
const routes = [
  {
    path: '/',
    name: 'Home',
    component: async () => await import('../views/Main.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: async () => await import('../views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: async () => await import('../views/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: async () => await import('../views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reset-send',
    name: 'ResetSend',
    component: async () => await import('../views/EmailSend.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: async () => await import('../views/ForgotPassword.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wallets',
    name: 'Wallets',
    component: async () => await import('../views/Wallets.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/exchange',
    name: 'Exchange',
    component: async () => await import('../views/Exchange.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: async () => await import('../views/Payment.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: async () => await import('../views/Privacy.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: async () => await import('../views/Terms.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: async () => await import('../views/About.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/history',
    name: 'history',
    component: async () => await import('../views/History.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.user?.id) authStore.getUser();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) next({ name: 'Login' });
  else next();
});
export default router;
