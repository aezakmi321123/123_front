<template>
  <div class="container terms" v-html="t('terms')"></div>
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
.terms {
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
