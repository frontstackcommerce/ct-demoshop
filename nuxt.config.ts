import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  site: {
    url: 'https://www.demo-shop.com',
    name: 'Nuxt Storefront',
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    '@nuxt/image',
  ],

  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },



  runtimeConfig: {
    public: {
    },
  },

  // Image optimization (auto-uses Vercel provider in production)
  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // OG Image generation for social cards
  ogImage: {
    fonts: ['Nunito:400', 'Nunito:600', 'Nunito:700'],
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
    },
  },
})
