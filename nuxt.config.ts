// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@nuxtjs/color-mode",
  ],
  css: ["~/assets/css/tailwind.css"],
  components: [
    {
      path: "~/components/esp",
      pathPrefix: false,
    },
    {
      path: "~/components/energy",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      apiBase: "",
      apiKey: "",
    },
  },
  // color-mode options
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    families: {
      "Open Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
});
