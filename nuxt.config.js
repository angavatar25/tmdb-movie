export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'imdb-movie',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  publicRuntimeConfig: {
    message: process.env.POSTER_PATH || "https://image.tmdb.org/t/p/original",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  env: {
    NODE_ENV: process.env.NODE_ENV
  },

  axios: {
    // proxy: true
    headers : {
      common: {
        'Authorization' : `Bearer ${process.env.ACCESS_TOKEN}`
      }
    },
    baseURL: 'https://api.themoviedb.org',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
