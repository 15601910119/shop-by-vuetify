var colors = require('vuetify/es5/util/colors').default;
var path = require('path');
module.exports = {
  // dir: path.resolve(`nuxt`),
  buildDir: 'nuxt-dist',
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: `%s - 李国印`,
    title: `李国印`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [`~/assets/font.css`],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/axios', mode: `client` }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxtjs/vuetify',
      {
        // defaultAssets: false
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg'
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
    // babel: {
    //   presets({ isServer }) {
    //     if (isServer) {
    //       const options = {
    //         modules: 'commonjs',
    //         targets: {
    //           node: 'current'
    //         }
    //       };
    //       return [`@nuxt/babel-preset-app`, options];
    //     }
    //   }
    // }
  },
  vue: {
    config: {
      $nuxt: {},
      productionTip: true,
      devtools: true,
      errorHandler: undefined,
      silent: true,
      errorCaptured(error) {
        return true;
      }
    }
  }
};
