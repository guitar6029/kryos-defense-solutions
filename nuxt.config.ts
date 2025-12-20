import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  css: ["~/assets/css/global.css"],
  devtools: { enabled: true },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: "Rajdhani", weights: [400, 600, 700] },
      { name: "Exo 2", weights: [400, 500, 700] },
      { name: "Orbitron", weights: [400, 500, 700] },
    ],
  },
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxt/ui",
    "@peterbud/nuxt-query",
  ],
  nuxtQuery: {
    /**
     * Specify which Vue Query composables to auto-import
     * Default: `false`, set to `true` to auto-import all Vue Query composables
     */
    autoImports: ["useQuery", "useMutation"],

    // Enable/disable Nuxt DevTools integration (default: true)
    devtools: true,

    /**
     * These are the same options as the QueryClient
     * from @tanstack/vue-query, which will be passed
     * to the QueryClient constructor
     * More details: https://tanstack.com/query/v5/docs/reference/QueryClient
     */

    queryClientOptions: {
      defaultOptions: {
        queries: {
          // for example disable refetching on window focus
          refetchOnWindowFocus: false,
          staleTime: 60_000,
          // refetchInterval: 5000
          // or change the default refetch interval
          //refetchInterval: 5000,
        },
      },
    },
  },
  runtimeConfig: {
    jsonServerBaseUrl: "http://localhost:3001",
  },
});
