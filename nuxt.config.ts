import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  buildDir: ".nuxt",
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/global.css"],
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/assets/images/kryos-symbol.png",
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: "Exo 2", weights: [400, 500, 700] },
      { name: "Orbitron", weights: [400, 500, 700] },
      { name: "Chakra Petch", weights: [600, 700] },
      { name: "Pixelify Sans", weights: [400, 700] },
    ],
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/ui",
  ],
});
