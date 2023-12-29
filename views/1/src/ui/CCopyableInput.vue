<template>
  <CInput v-bind="$attrs" class="copyable-input">
    <slot name="prefix" />
    <template #suffix>
      <a-popover v-if="address">
        <template #content>
          <a-qrcode size="170" color="#000" :value="address" />
        </template>
        <QrcodeOutlined />
      </a-popover>
      <a-tooltip :title="t('ui.copyableInput.tooltip')">
        <copy-outlined @click="onCopy" />
      </a-tooltip>
    </template>
  </CInput>
</template>

<script>
import { CopyOutlined, QrcodeOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';

import CInput from './CInput.vue';

export default {
  components: { CInput, CopyOutlined, QrcodeOutlined },
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  emits: ['copy'],
  setup() {
    const { t } = useI18n();

    return { t };
  },
  methods: {
    onCopy() {
      this.$emit('copy', this.$attrs);
    },
  },
};
</script>

<style lang="scss">
.copyable-input {
  height: auto !important;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-wrap: wrap;

    &:before {
      display: none;
    }
  }

  @media screen and (min-width: 767px) {
    flex-wrap: nowrap;
    height: 40px !important;
  }

  & .ant-input-prefix {
    font-size: 14px;

    @media screen and (min-width: 767px) {
      margin-right: 10px;
      border-right: 1px solid var(--text-primary);
      padding-right: 10px;
    }

    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }

  & .ant-input-suffix {
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
    }
  }

  & .ant-input {
    font-size: 18px !important;
    font-weight: 600 !important;
    background: transparent !important;
    color: var(--text-primary);
  }
}
</style>
