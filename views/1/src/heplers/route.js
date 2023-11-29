import { useRouter } from 'vue-router';
const router = useRouter();
export const routeTo = to => {
  router.push({ name: to }) || router.push({ path: to });
};
