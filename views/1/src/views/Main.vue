<template>
  <div class="container">
    <div class="main__page">
      <div class="main__page-exchnage">
        <a-row :gutter="[{ xl: 40, lg: 10 }, { md: 50 }]" justify="center">
          <a-col :xs="24" :sm="18" :md="16" :lg="13">
            <a-row :gutter="[0, 20]">
              <a-col>
                <h1>{{ t('main.label') }}</h1>
              </a-col>
              <a-col>
                <p class="paragraph">
                  {{ t('main.label_p') }}
                </p>
              </a-col>
              <a-col :xs="0" :lg="24">
                <img height="430" width="460" src="bank.png" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :xs="24" :sm="18" :md="16" :lg="11">
            <ExchangeCard
              :selected-card="exchange.pendingExchange?.coinFrom || coins?.[0]"
            />
          </a-col>
        </a-row>
      </div>
      <div class="main__page-features">
        <div class="title">
          <h2>{{ t('main.features') }}</h2>
        </div>
        <a-row
          :gutter="[
            { lg: 50, md: 20 },
            { lg: 20, md: 40 },
          ]"
        >
          <a-col :xs="24" :sm="12" :lg="6">
            <div class="feature">
              <div class="feature__image">
                <img src="exchange.svg" />
              </div>
              <div class="feature__heading">
                {{ t('main.optimal_exchange') }}
              </div>
              <div class="feature__paragraph">{{ t('main.best_offers') }}</div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <div class="feature">
              <div class="feature__image">
                <img src="trust.svg" />
              </div>
              <div class="feature__heading">{{ t('main.time_tested') }}</div>
              <div class="feature__paragraph">
                {{ t('main.confidence') }}
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <div class="feature">
              <div class="feature__image">
                <img src="portmone.svg" />
              </div>
              <div class="feature__heading">{{ t('main.save_money') }}</div>
              <div class="feature__paragraph">
                {{ t('main.improve') }}
              </div>
            </div>
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <div class="feature">
              <div class="feature__image">
                <img src="timer.svg" />
              </div>
              <div class="feature__heading">{{ t('main.delay') }}</div>
              <div class="feature__paragraph">
                {{ t('main.prompt') }}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="main__page-potential">
        <a-row :justify="{ xs: 'center' }">
          <a-col :xs="24" :lg="12">
            <div class="potential">
              <div class="potential__title">{{ t('main.potential') }}</div>
              <div class="potential__text">
                {{ t('main.potential_p') }}
              </div>
            </div>
          </a-col>

          <a-col :xs="0" :lg="8">
            <img height="530" width="510" src="crypto-planet.png" />
          </a-col>
        </a-row>
      </div>
      <div class="main__page-partners">
        <div class="partners">
          <h2>{{ t('main.partners') }}</h2>
          <a-row justify="center">
            <a-col :xs="24" :sm="12" :md="8">
              <img src="Bestchange.svg" />
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <img src="AMLBot.svg" />
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <img src="PerfectMoney.svg" />
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="main__page-coins">
        <div class="coins">
          <a-row justify="center" align="middle" :gutter="[30, 30]">
            <a-col :span="24" :order="1" :lg="{ span: 14, order: 0 }">
              <CoinTable />
            </a-col>
            <a-col :span="24" :order="0" :lg="{ span: 10, order: 1 }">
              <div class="text">
                <div class="text-label">
                  {{ t('main.top_markets') }}
                </div>
                <div class="text-p">
                  {{ t('main.capitalize') }}
                </div>
              </div>
              <di class="buttons">
                <CButton type="primary" @click="goTo('wallets')">
                  {{ t('main.wallet') }}</CButton
                >
                <CButton type="secondary" @click="goTo('exchange')">
                  {{ t('main.exchange') }}</CButton
                >
              </di>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useExchangeStore } from '../modules/exchange.js';
import { useWalletStore } from '../modules/wallet.js';
import CButton from '../ui/CButton.vue';
import CoinTable from '../ui/CoinTable2.vue';
import ExchangeCard from '../ui/ExchangeCard.vue';
export default {
  components: {
    ExchangeCard,
    CoinTable,
    CButton,
  },
  setup() {
    const { t } = useI18n();
    const wallet = useWalletStore();
    const router = useRouter();
    const exchange = useExchangeStore();
    const goTo = (path = null) => {
      if (!path) return router.push('/');
      router.push(`/${path}`);
    };
    const coins = computed(() => wallet.coins);

    return {
      t,
      goTo,
      coins,
      exchange,
    };
  },
};
</script>
<style lang="scss">
.main__page {
  display: flex;
  flex-direction: column;
  gap: 80px;
  &-features {
    display: flex;
    flex-direction: column;
    gap: 50px;
    text-align: center;
    .feature {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      &__heading {
        line-height: 160%;
        font-size: 20px;
      }
      &__paragraph {
        line-height: 160%;
        font-size: 16px;
        color: var(--text-link);
      }
    }
  }
  &-potential {
    .potential {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__title {
        font-weight: 500;
        font-size: 24px;
      }
      &__text {
        line-height: 160%;
        color: var(--text-link);
        white-space: pre-line;
        font-size: 16px;
      }
    }
    .image {
      margin-top: -45px;
    }
  }
  &-partners {
    text-align: center;
    padding-bottom: 50px;
    .partners {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__content {
        display: flex;
        justify-content: center;
        gap: 30px;
      }
    }
  }
  &-coins {
    text-align: left;
    padding-bottom: 50px;
    .buttons {
      margin-top: 20px;
      display: flex;
      gap: 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    .text-label {
      font-size: 40px;
      font-weight: 500;
      color: var(--text-link);
    }
    .text-p {
      font-size: 18px;
    }
    .partners {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__content {
        display: flex;
        justify-content: center;
        gap: 30px;
      }
    }
  }
}
.paragraph {
  font-size: 20px;
  line-height: 160%;
  color: var(--text-link);
}
</style>
