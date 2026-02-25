// @ts-check
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import eslintConfigPrettier from 'eslint-config-prettier'
import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt(
  eslintConfigPrettier,
  ...vueI18n.configs.recommended,
  {
    rules: {
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-dynamic-keys': 'error',
      '@intlify/vue-i18n/valid-message-syntax': 'error',
      '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'off', // Enable when using multiple locales
      '@intlify/vue-i18n/key-format-style': [
        'error',
        'kebab-case',
        {
          allowArray: false,
          splitByDots: true,
        },
      ],
      '@intlify/vue-i18n/no-unused-keys': [
        'error',
        {
          extensions: ['.js', '.ts', '.vue'],
          enableFix: true,
        },
      ],
      '@intlify/vue-i18n/no-raw-text': [
        'error',
        {
          ignoreText: [
            // Punctuation & operators
            '+',
            '-',
            '*',
            '/',
            '=',
            '@',
            '#',
            '&',
            '|',
            // Brackets & parens
            '(',
            ')',
            '[',
            ']',
            '[]',
            '[?]',
            '{',
            '}',
            // Punctuation
            ',',
            '.',
            ':',
            ';',
            '!',
            '?',
            '"',
            "'",
            '...',
            // Symbols & decorative
            '•',
            '—',
            '–',
            '©',
            '®',
            '™',
            // Arrows & UI symbols
            '←',
            '→',
            '↑',
            '↓',
            '›',
            '‹',
            '×',
            '✕',
            '✓',
            '●',
            '○',
            // Units (common in UI)
            '%',
            'px',
            'em',
            'rem',
            'x',
            // Currency
            '€',
            '$',
            '£',
            // Whitespace variants
            ' ',
            '~',
          ],
        },
      ],
    },
    settings: {
      'vue-i18n': {
        localeDir: './i18n/locales/*.{json,json5,yaml,yml}',
        messageSyntaxVersion: '^9.0.0',
      },
    },
  },
  {
    // Global ignores - mockups, UI components (shadcn), debug tools, e2e tests, content files
    ignores: ['app/components/ui/**/*.{vue,ts}', 'content/**/*'],
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'vue/no-unused-properties': [
        'error',
        {
          groups: ['props'],
        },
      ],
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
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
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
      // Warn about unnecessary imports (Nuxt auto-imports)
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
              importNames: ['useRouter', 'useRoute', 'onBeforeRouteLeave', 'onBeforeRouteUpdate', 'useLink'],
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
              group: ['~/types/*', '@/types/*'],
              message: 'Types are auto-imported by Nuxt. You can remove this import.',
            },
          ],
        },
      ],
      // Vue best practices
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
          order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-alert': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      'vue/no-v-html': 'off',
      '@intlify/vue-i18n/no-v-html': 'off',
    },
  },
)
