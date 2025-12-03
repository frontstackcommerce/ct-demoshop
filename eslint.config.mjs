// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'

const config = withNuxt(
  eslintConfigPrettier,
  ...vueI18n.configs.recommended,
  {
    rules: {
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/no-unused-keys': [
        'warn',
        {
          extensions: ['.js', '.ts', '.vue'],
          enableFix: false,
        },
      ],
      '@intlify/vue-i18n/no-raw-text': [
        'error',
        {
          ignoreText: [
            '+',
            '@',
            'x',
            '-',
            '(',
            ')',
            '[',
            ']',
            '[]',
            '[?]',
            '/',
            ',',
            '.',
            '•',
            ':',
            '←',
            '"',
          ],
        },
      ],
    },
    settings: {
      'vue-i18n': {
        localeDir: './i18n/locales/*.{json,json5,yaml,yml}', // extension is glob formatting!

        // Specify the version of `vue-i18n` you are using.
        // If not specified, the message will be parsed twice.
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  {
    ignores: ['app/components/ui/**/*.{vue,ts}', '.frontstack', '.frontstack-local'],
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'func-call-spacing': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowTernary: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': 'allow-with-description',
          'ts-check': false,
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      // Warn about unnecessary imports
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              name: 'vue',
              importNames: [
                'ref',
                'computed',
                'watch',
                'onMounted',
                'onUnmounted',
                'nextTick',
                'provide',
                'inject',
                'defineProps',
                'defineEmits',
                'defineExpose',
                'withDefaults',
                'defineComponent',
                'h',
                'getCurrentInstance',
                'useSlots',
                'useAttrs',
                'defineAsyncComponent',
                'defineModel',
              ],
              message: 'This import is auto-imported by Nuxt. You can remove it.',
            },
            {
              name: 'vue-router',
              importNames: [
                'useRouter',
                'useRoute',
                'onBeforeRouteLeave',
                'onBeforeRouteUpdate',
                'useLink',
              ],
              message: 'This import is auto-imported by Nuxt. You can remove it.',
            },
          ],
          patterns: [
            {
              group: ['~/components/*', '@/components/*'],
              message: 'Components are auto-imported by Nuxt. You can remove this import.',
            },
            {
              group: ['~/utils/*', '@/utils/*'],
              message: 'Utils are auto-imported by Nuxt. You can remove this import.',
            },
            {
              group: ['~/composables/*', '@/composables/*'],
              message: 'Composables are auto-imported by Nuxt. You can remove this import.',
            },
            {
              group: ['~/stores/*', '@/stores/*'],
              message: 'Stores are auto-imported by Nuxt. You can remove this import.',
            },
            {
              group: ['~/types/*', '@/types/*'],
              message: 'Types are auto-imported by Nuxt. You can remove this import.',
            },
          ],
        },
      ],
      // Add Vue best practices
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/match-component-file-name': [
        'error',
        {
          extensions: ['vue'],
          shouldMatchCase: true,
        },
      ],
      'vue/no-reserved-component-names': 'error',
      'vue/require-default-prop': 'warn',
      'vue/require-prop-types': 'warn',
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  }
)
export default config
