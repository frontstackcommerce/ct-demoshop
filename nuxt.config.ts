import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
    experimental: {
      sqliteConnector: 'native',
    },
  },

  css: ['~/assets/css/tailwind.css'],

  devtools: { enabled: false },

  eslint: {
    config: {
      standalone: true,
    },
  },

  fonts: {
    families: [{ name: 'Varela Round', provider: 'google' }],
    defaults: {
      weights: [400],
    },
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        dir: 'ltr',
        file: 'en.json',
      },
      {
        code: 'de',
        name: 'German',
        language: 'de-DE',
        dir: 'ltr',
        file: 'de.json',
      },
    ],
    defaultLocale: 'en',
  },

  // Image optimization (auto-uses Vercel provider in production)
  image: {
    domains: ['storage.googleapis.com'],
    quality: 80,
    format: ['webp', 'avif'],
  },

  frontic: {
    contextDomain: 'ct.demo-shop.com',
    throwOn404: false,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-og-image',
    'vue-sonner/nuxt',
    '@frontic/nuxt',
  ],

  // OG Image generation for social cards
  ogImage: {
    fonts: ['Varela Round:400'],
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    },
  },

  routeRules: {
    '/**': { isr: 60 },
    '/api/cart/**': { prerender: false, isr: false },
    '/api/checkout/**': { prerender: false, isr: false },
    '/api/customer/**': { prerender: false, isr: false },
  },

  runtimeConfig: {
    commercetools: {
      projectKey: '',
      clientId: '',
      clientSecret: '',
      authHost: '',
      apiHost: '',
    },
    public: {},
  },

  site: {
    url: 'https://www.demo-shop.com',
    name: 'Nuxt Storefront',
  },

  vueSonner: {
    css: false,
  },

  vite: {
    // @ts-expect-error - Vite/Rollup version mismatch in plugin types
    plugins: [tailwindcss()],
  },
})
