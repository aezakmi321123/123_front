<template>
  <CButton size="medium" class="w-fc" type="primary" @click="router.go(-1)">{{
      t('payment.back')
    }}</CButton>
</template>

<script>
  import { useI18n } from "vue-i18n";
  import { useRouter } from "vue-router";

  import CButton from "../../ui/CButton.vue";

  export default {
    components: { CButton },
    setup(){
      const { t } = useI18n()
      const router = useRouter()

      return { t, router }
    }

  }
</script>

<style lang="scss">
</style>
