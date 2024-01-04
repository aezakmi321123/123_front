import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '../modules/auth';
const Home = () => import('../views/Main.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const Settings = () => import('../views/Settings.vue');
const EMailSend = () => import('../views/EmailSend.vue');
const ForgotPassword = () => import('../views/ForgotPassword.vue');
const Exchange = () => import('../views/Exchange.vue');
const Wallets = () => import('../views/Wallets.vue');
const Payment = () => import('../views/Payment.vue');
const Privacy = () => import('../views/Privacy.vue');
const Terms = () => import('../views/Terms.vue');
const About = () => import('../views/About.vue');
const History = () => import('../views/History.vue');
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
    path: '/exchange',
    name: 'Exchange',
    component: Exchange,
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
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/history',
    name: 'history',
    component: History,
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
