import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ["~/assets/css/global.css"],
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: "Rajdhani", weights: [400, 600, 700] },
      { name: "Exo 2", weights: [400, 500, 700] },
    ],
  },
  modules: ["@nuxt/fonts"],
})