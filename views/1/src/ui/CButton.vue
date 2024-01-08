<template>
  <a-button v-bind="$attrs">
    <slot />
  </a-button>
</template>
<style lang="scss" scoped>
.ant-btn {
  padding: 20px;
  border: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  &:focus {
    outline: unset;
  }
  &[disabled] {
    background: var(--text-quaternary);
    pointer-events: none;
    cursor: auto;
    box-shadow: none;
  }
}
.ant-btn-secondary {
  color: var(--text-primary);
  background: var(--button-secondary);
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0px 7px 40px rgba(64, 64, 242, 0.48);
}
.ant-btn-lg {
  height: 50px;
}
.ant-btn-primary {
  font-size: 18px;
  font-weight: 700;
  background: var(--button-primary);
  font-family: 'Inter' !important;
  box-shadow: unset !important;
  &:hover {
    opacity: 0.8;
    background: var(--button-primary);
  }
}
</style>
