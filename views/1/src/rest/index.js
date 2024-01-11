import axios from 'axios';

import { useAuthStore } from '../modules/auth.js';
const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //   withCredentials: true,
  credentials: 'include',
  //   credentials: true,
});
client.defaults.withCredentials = true;
client.defaults.headers['Content-Type'] = 'application/json';
client.defaults.headers['Access-Control-Allow-Origin'] = '*';
client.interceptors.response.use(
  response => response,
  async error => {
    const auth = useAuthStore();
    if (error.response.status === 401 && auth.isLoggedIn) {
      try {
        auth.isLoggedIn = false
        await auth.refreshTokens();
        return client(error.config);
      }
      catch (e){
        console.log(e)
      }
    }
    return Promise.reject(error);
  },
);

function call(method, url, data = null, params = null, headers = {}) {
  return client({
    method,
    url,
    params,
    data,
    headers,
  });
}
export default {
  auth: {
    login(params) {
      return call('POST', '/users/signin', params);
    },
    register(params) {
      return call('POST', '/users/signup', params);
    },
    logout() {
      return call('GET', '/users/logout');
    },
    updateUser(params) {
      return call('PATCH', '/users/update', params);
    },
    getUser(id) {
      return call('GET', `/users/user/${id}`);
    },
    confirmEmail(params) {
      return call('POST', '/users/confirmEmail', params);
    },
    confirmEmailCode(params) {
      return call('POST', '/users/confirmEmailCode', params);
    },
    forgotPassword(params) {
      return call('POST', '/users/forgotPassword', params);
    },
    resetPassword(params) {
      return call('POST', '/users/passwordReset', params);
    },
    refreshTokens() {
      return call('GET', '/users/refreshTokens');
    },
  },
  wallet: {
    getCoins(params) {
      return call('GET', '/coins', params);
    },
    getExchangeInfo(id) {
      return call('GET', `/coins/userExchangeInfo/${id}`);
    },
    exchange(params) {
      return call('POST', '/coins/exchange', params);
    },
    updateCoins(params) {
      return call('POST', '/coins/saveCoins', params);
    },
    getRuble(fromCoin = 'RUB', toCoin = 'USD') {
      return axios.get(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromCoin}&tsyms=${toCoin}`,
        {
          headers: {
            authorization: `Apikey${import.meta.env.VITE_BASE_FIAT_KEY}`,
          },
        },
      );
    },
  },
  payment: {
    getPayments(id) {
      return call('GET', `/payments/userPaymentsInfo/${id}`);
    },
    getPayment(id) {
      return call('GET', `/payments/${id}`);
    },
    getUnauthPayment(id) {
      return call('GET', `/payments/unauth/${id}`);
    },
    generatePayment(params) {
      return call('POST', '/payments/generatePayment', params);
    },
    generateUnauthPayment(params) {
      return call('POST', '/payments/unauth/generatePayment', params);
    },
  },
  withdraw: {
    generateWithdraw(params) {
      return call('POST', '/withdrawals/generateWithdrawal', params);
    },
    getWithdrawals(id) {
      return call('GET', `/withdrawals/userWithdrawalsInfo/${id}`);
    },
  },
  domain: {
    getDomain(domain) {
      return call('GET', `/domains/${domain}`);
    },
  }
};
