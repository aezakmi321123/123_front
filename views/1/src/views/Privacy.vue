<template>
  <div class="container privacy" v-html="text"></div>
</template>
<script>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
export default {
  setup() {
    const { t } = useI18n();
    const text = computed(() => `${t('privacy')}${t('privacy2')}`);
    return { t, text };
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
