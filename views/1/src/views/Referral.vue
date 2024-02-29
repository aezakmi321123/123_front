<template>
  <div class="container">
    <div class="referral">
      <div class="referral__info">
        <h1 class="referral__title">{{ t('referral.program') }}</h1>
      </div>
      <a-row>
        <a-col :span="14">
          <div class="referral__card">
            <div class="referral__card-title">
              {{ t('referral.invite') }}
            </div>
            <div class="referral__card-desc">
              {{ t('referral.earn') }}
            </div>
            <div>
              <CCopyableInput
                :prefix="t('referral.id')"
                :value="user.referralCode"
                readonly
                @copy="() => onCopy(user.referralCode)"
              />
            </div>
            <div>
              <CCopyableInput
                :prefix="t('referral.link')"
                :value="refferalLink"
                @copy="() => onCopy(refferalLink)"
              />
            </div>
            <a-row class="referral__card-receive">
              <a-col :span="12">
                <div class="referral__card-status">
                  <div>{{ t('referral.receive') }}</div>
                  <div>50%</div>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="referral__card-status">
                  <div>{{ t('referral.friends_receive') }}</div>
                  <div>{{ t('referral.exchanges') }}</div>
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
          <h1 class="referral__title">{{ t('referral.invited') }}</h1>
        </div>
      </div>
      <a-table
        :data-source="user.referrals"
        :columns="columns"
        :pagination="false"
        row-key="id"
        :scroll="{ x: true }"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue';
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
    const refferalLink = `${window.location.host}/?ref=${user.referralCode}`;
    const onCopy = async value => {
      try {
        await navigator.clipboard.writeText(value);

        cMessage('success', t('payment.copied'));
      } catch (e) {
        cMessage('error', t('payment.error'));
        console.error('Unable to copy to clipboard', e);
      }
    };
    const columns = computed(() => {
      return [
        {
          title: 'id',
          dataIndex: 'id',
        },
        {
          title: 'email',
          dataIndex: 'email',
        },
        {
          title: t('referral.fullName'),
          dataIndex: 'fullName',
        },
        {
          title: t('referral.amount'),
          dataIndex: 'amount',
        },
      ];
    });
    return {
      t,
      user,
      refferalLink,
      onCopy,
      columns,
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
.ant-table-cell::before {
  background-color: var(--bg-base) !important;
}
.ant-table-thead > tr > th,
.ant-table-tbody > tr:last-child > td {
  border-bottom: 1px solid var(--bg-base) !important;
}
.ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {
  background: var(--bg-select) !important;
}
.ant-table-thead > tr > th {
  background: var(--button-primary) !important;
  color: var(--text-link) !important;
}
.ant-table-tbody > tr > td {
  cursor: pointer;
  color: var(--text-primary);
  border-top: 1px solid var(--bg-base) !important;
}
.ant-table {
  background: var(--bg-input) !important;
}
.ant-table-row.ant-table-row-level-0.active {
  background: var(--bg-select) !important;
}
.ant-table-wrapper
  .ant-table-tbody
  > :is(tr.ant-table-placeholder:hover, tr.ant-table-row.active)
  > td {
  background: var(--bg-select) !important;
}
.ant-table-cell {
  background: var(--bg-input) !important;
}
:where(.css-dev-only-do-not-override-1qb1s0s).ant-table-wrapper
  .ant-table-tbody
  > :is(tr.ant-table-placeholder:hover, tr.ant-table-row.active)
  > td {
  background: var(--bg-select);
}
.ant-empty-normal {
  color: var(--text-link);
}
</style>
