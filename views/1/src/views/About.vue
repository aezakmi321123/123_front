<template>
  <div class="container">
    <div class="about">
      <div class="about__info">
        <h1 class="about__title">{{ t('about.title') }}</h1>
        <div class="about__text">
          {{ t('about.paragraph') }}
        </div>
      </div>
      <a-row class="about__history" justify="center" :gutter="[50, 50]">
        <a-col :sm="24" :md="12">
          <div class="about__history__text">
            <h2>{{ t('about.history') }}</h2>
            <div>{{ t('about.desc_history') }}</div>
          </div>
        </a-col>
        <a-col :sm="24" :md="12">
          <a-timeline>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time1_l') }}</div>
                <div class="time_p">{{ t('about.time1_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time2_l') }}</div>
                <div class="time_p">{{ t('about.time2_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time3_l') }}</div>
                <div class="time_p">{{ t('about.time3_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time4_l') }}</div>
                <div class="time_p">{{ t('about.time4_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time5_l') }}</div>
                <div class="time_p">{{ t('about.time5_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time6_l') }}</div>
                <div class="time_p">{{ t('about.time6_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="green">
              <div class="time">
                <div class="time_l">{{ t('about.time7_l') }}</div>
                <div class="time_p">{{ t('about.time7_p') }}</div>
              </div>
            </a-timeline-item>
            <a-timeline-item color="red">
              <div class="time">
                <div class="time_l">{{ t('about.time8_l') }}</div>
                <div class="time_p">{{ t('about.time8_p') }}</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-col>
      </a-row>
      <div class="about__sec">
        <div class="about__info">
          <h1 class="about__title">{{ t('about.choose_l') }}</h1>
          <div class="about__text">
            {{ t('about.choose_p') }}
          </div>
        </div>
      </div>
      <a-row :gutter="[40, 40]">
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/support.svg" />
            <div class="card__label">{{ t('about.card1_l') }}</div>
            <div class="card__p">
              {{ t('about.card1_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/secure.svg" />
            <div class="card__label">{{ t('about.card2_l') }}</div>
            <div class="card__p">
              {{ t('about.card2_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/use.svg" />
            <div class="card__label">{{ t('about.card3_l') }}</div>
            <div class="card__p">
              {{ t('about.card3_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/fees.svg" />
            <div class="card__label">{{ t('about.card4_l') }}</div>
            <div class="card__p">
              {{ t('about.card4_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/trusted.svg" />
            <div class="card__label">{{ t('about.card5_l') }}</div>
            <div class="card__p">
              {{ t('about.card5_p') }}
            </div>
          </div>
        </a-col>
        <a-col :md="8" :sm="12" :xs="24">
          <div class="card">
            <img :width="100" src="@images/privacy.svg" />
            <div class="card__label">{{ t('about.card6_l') }}</div>
            <div class="card__p">
              {{ t('about.card6_p') }}
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';
export default {
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
};
</script>
<style lang="scss">
.about {
  margin-top: 30px;
  &__info {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    text-align: left;
  }
  &__text {
    font-size: 20px;
  }
  &__history {
    margin-top: 100px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  &__history__text {
    font-size: 22px;
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
  &__label {
    font-size: 20px;
    color: var(--text-link);
    font-weight: bold;
  }
  &__p {
    font-size: 16px;
    line-height: 30px;
  }
}
.time {
  display: flex;
  flex-direction: column;
  &_l {
    font-size: 22px;
    color: var(--text-link);
    font-weight: bold;
  }
  &_p {
    color: var(--text-primary);
    font-size: 16px;
  }
}
</style>
