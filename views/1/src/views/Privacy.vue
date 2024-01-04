<template>
  <div class="container privacy">
    <div v-html="t('privacy')"></div>
    <div v-html="t('privacy2')"></div>
  </div>
</template>
<script>
import { useI18n } from 'vue-i18n';
export default {
  setup() {
    const { t } = useI18n();
    return { t };
  },
};
</script>
<style lang="scss">
.privacy {
  white-space: pre-line;
  line-height: 30px;
  p {
    font-size: 18px;
  }
  h2 {
    color: var(--text-link);
  }
  a {
    color: var(--bg-purple);
  }
}
</style>
