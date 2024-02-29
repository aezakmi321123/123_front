<template>
  <div class="container">
    <div class="referral">
      <div class="referral__info">
        <h1 class="referral__title">Referral program</h1>
      </div>
      <a-row>
        <a-col :span="14">
          <div class="referral__card">
            <div class="referral__card-title">
              Invite Friends. Earn Crypto Together
            </div>
            <div class="referral__card-desc">
              Earn up to 40% commission every time your friends make a trade on
              Exfoxbit. Climb the rankings and receive cool gifts
            </div>
            <div>
              <CCopyableInput
                prefix="Referral ID"
                :value="user.referralCode"
                readonly
                @copy="() => onCopy(user.referralCode)"
              />
            </div>
            <div>
              <CCopyableInput
                prefix="Referral Link"
                :value="refferalLink"
                @copy="() => onCopy(refferalLink)"
              />
            </div>
            <a-row class="referral__card-receive">
              <a-col :span="12">
                <div class="referral__card-status">
                  <div>You Receive:</div>
                  <div>50%</div>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="referral__card-status">
                  <div>Friends Receive:</div>
                  <div>10%</div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :span="10">
          <img :style="{ width: '100%' }" src="@images/referral.svg" />
        </a-col>
      </a-row>
      <div class="referral__sec">
        <div class="referral__info">
          <h1 class="referral__title">Invited Users</h1>
          <div class="referral__text">
            {{ t('referral.choose_p') }}
          </div>
        </div>
      </div>
      <a-row :gutter="[{ md: 40, xs: 10 }, 40]">
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/support.svg" />
            <div class="card__label">{{ t('referral.card1_l') }}</div>
            <div class="card__p">
              {{ t('referral.card1_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/secure.svg" />
            <div class="card__label">{{ t('referral.card2_l') }}</div>
            <div class="card__p">
              {{ t('referral.card2_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/use.svg" />
            <div class="card__label">{{ t('referral.card3_l') }}</div>
            <div class="card__p">
              {{ t('referral.card3_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/fees.svg" />
            <div class="card__label">{{ t('referral.card4_l') }}</div>
            <div class="card__p">
              {{ t('referral.card4_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/trusted.svg" />
            <div class="card__label">{{ t('referral.card5_l') }}</div>
            <div class="card__p">
              {{ t('referral.card5_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/privacy.svg" />
            <div class="card__label">{{ t('referral.card6_l') }}</div>
            <div class="card__p">
              {{ t('referral.card6_p') }}
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';

import { cMessage } from '../heplers/message.js';
import { useAuthStore } from '../modules/auth.js';
import CCopyableInput from '../ui/CCopyableInput.vue';
export default {
  components: {
    CCopyableInput,
  },
  setup() {
    const { t } = useI18n();
    const { user } = useAuthStore();
    const refferalLink = `${window.location.host}/ref:${user.referralCode}`;
    const onCopy = async value => {
      try {
        await navigator.clipboard.writeText(value);

        cMessage('success', t('payment.copied'));
      } catch (e) {
        cMessage('error', t('payment.error'));
        console.error('Unable to copy to clipboard', e);
      }
    };
    return {
      t,
      user,
      refferalLink,
      onCopy,
    };
  },
};
</script>
<style lang="scss">
.referral {
  margin-top: 30px;
  &__card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    font-size: 16px;
    border-radius: 10px;
    background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
    &-title {
      font-size: 30px;
      font-weight: 700;
    }
    &-receive {
      font-size: 30px;
    }
    &-status {
      display: flex;
      font-size: 16px;
      flex-direction: column;
      gap: 10px;
    }
  }
  &__info {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
    @include mq(575px, max-width) {
      gap: 14px;
    }
  }
  &__text {
    font-size: 20px;
    @include mq(575px, max-width) {
      font-size: 16px;
    }
  }
  &__history {
    margin-top: 100px;
    font-size: 20px;
    @include mq(575px, max-width) {
      font-size: 16px;
    }
    display: flex;
    align-items: center;
  }
  &__history__text {
    font-size: 22px;
    @include mq(575px, max-width) {
      font-size: 18px;
    }
  }
}
.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background: radial-gradient(100% 100% at 0% 0%, #21213d 0%, #101024 100%);
  @include mq(575px, max-width) {
    padding: 14px;
    gap: 14px;
  }
  &__label {
    font-size: 20px;
    @include mq(575px, max-width) {
      font-size: 14px;
    }
    color: var(--text-link);
    font-weight: bold;
  }
  &__p {
    font-size: 16px;
    line-height: 30px;
    @include mq(575px, max-width) {
      font-size: 12px;
    }
  }
}
.time {
  display: flex;
  flex-direction: column;
  &_l {
    font-size: 22px;
    color: var(--text-link);
    font-weight: bold;
    @include mq(575px, max-width) {
      font-size: 16px;
    }
  }
  &_p {
    color: var(--text-primary);
    font-size: 16px;
  }
}
</style>
