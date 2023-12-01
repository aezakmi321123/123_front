<template>
  <CInput
      v-bind="$attrs"
      class="copyable-input"
  >
    <slot name="prefix" />
    <template #suffix>
      <a-tooltip :title="t('ui.copyableInput.tooltip')">
        <copy-outlined @click="onCopy" />
      </a-tooltip>
    </template>
  </CInput>
</template>

<script>
import { CopyOutlined } from "@ant-design/icons-vue"
import { useI18n } from "vue-i18n";

import CInput from "./CInput.vue";

export default {
  components: { CInput, CopyOutlined },
  emits: ['copy'],
  setup(){
    const { t } = useI18n()

    return { t }
  },
  methods: {
    onCopy(){
      this.$emit('copy', this.$attrs)
    }
  }
}
</script>

<style lang="scss">
  .copyable-input {
    height: 40px !important;

    & .ant-input-prefix {
      font-size: 14px;
      margin-right: 10px;
      border-right: 1px solid var(--text-primary);
      padding-right: 10px;
    }

    & .ant-input {
      font-size: 18px !important;
      font-weight: 600 !important;
      background: transparent !important;
      color: var(--text-primary);
    }
  }
</style>
