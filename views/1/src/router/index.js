import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../modules/auth';
const Home = () => import('../views/Main.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const Settings = () => import('../views/Settings.vue');
const EMailSend = () => import('../views/EmailSend.vue');
const ForgotPassword = () => import('../views/ForgotPassword.vue');
const Wallets = () => import('../views/Wallets.vue');
const Payment = () => import('../views/Payment.vue');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reset-send',
    name: 'ResetSend',
    component: EMailSend,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/wallets',
    name: 'Wallets',
    component: Wallets,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: Payment,
    meta: {
      requiresAuth: false,
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
