import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },

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
    quality: 80,
    format: ['webp', 'avif'],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt-og-image',
    '@frontic/nuxt',
  ],

  // OG Image generation for social cards
  ogImage: {
    fonts: ['Varela Round:400'],
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    },
  },

  runtimeConfig: {
    public: {},
  },

  site: {
    url: 'https://www.demo-shop.com',
    name: 'Nuxt Storefront',
  },

  vite: {
    plugins: [tailwindcss()],
  },
})