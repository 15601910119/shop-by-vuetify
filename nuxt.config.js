var colors = require('vuetify/es5/util/colors').default;
// 接口域名
var BASE_URL;
// 环境变量
var isProd = process.env.NODE_ENV === `production`;

if (isProd) {
  BASE_URL = `http://shop.xvivx.online/`;
} else {
  BASE_URL = `http://192.168.0.103:3000/`;
}


module.exports = {
  buildDir: 'nuxt-dist',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: `zh-Hans-CN`
    },
    titleTemplate: `%s - 李国印`,
    title: `李国印`,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'http://assets.xvivx.online/favicon.ico'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#0089ff' },
  /*
   ** Global CSS
   */
  css: [`~/assets/font.css`, `~/assets/transition.css`],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/axios' }, { src: '~/plugins/filters' }],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [`@nuxtjs/vuetify`],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: `./vuetify.options.js`
  },
  axios: {
    baseURL: BASE_URL,
    browserBaseURL: BASE_URL
  },
  server: {
    port: 5555
  },

  /*
   ** Build configuration
   */
  build: {
    // 优化css
    extractCSS: true,
    optimizeCSS: true,
    optimization: {
      splitChunks: {
        minSize: 30 * 1024,
      }
    }
  },
  vue: {
    config: {
      $nuxt: {},
      productionTip: true,
      devtools: !isProd,
      errorHandler: undefined,
      silent: true,
      errorCaptured(error) {
        return true;
      }
    }
  }
};
