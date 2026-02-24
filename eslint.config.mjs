import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/one-component-per-file': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
})
