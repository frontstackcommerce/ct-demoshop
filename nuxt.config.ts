// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    {
      path: '~/components/',
      pathPrefix: true,
    },
  ],

  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['./app/assets/css/tailwind.css'],

  modules: [
    'nuxt-lucide-icons',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxtjs/device',
    'vue-sonner/nuxt',
  ],

  lucide: {
    namePrefix: 'Icon',
  },

  i18n: {
    locales: [
      {
        code: 'us',
        file: 'en-us.json',
      },
      {
        code: 'uk',
        file: 'en-us.json',
      },
      {
        code: 'eu',
        file: 'en-us.json',
      },
      {
        code: 'de',
        file: 'de-de.json',
      },
    ],
    strategy: 'prefix_except_default',
    defaultLocale: 'eu',
    detectBrowserLanguage: false,
  },

  runtimeConfig: {
    public: {},
  },

  routeRules: {
    // all routes (by default) will be revalidated every 60 seconds, in the background
    '/**': { isr: 60 },
  },
})
