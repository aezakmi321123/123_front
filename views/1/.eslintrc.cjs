module.exports = {
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  plugins: ['simple-import-sort'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/multi-word-component-names': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'object-curly-spacing': ['error', 'always'],
    'vue/no-v-html': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', 'src']],
      },
    },
  },
};
