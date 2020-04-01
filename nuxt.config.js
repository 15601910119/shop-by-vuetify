var colors = require('vuetify/es5/util/colors').default;

var BASE_URL;

if (process.env.NODE_ENV === `development`) {
  BASE_URL = `http://192.168.0.103:3001/`;
} else {
  BASE_URL = `http://shop.xvivx.online/`;
}

module.exports = {
  // dir: path.resolve(`nuxt`),
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
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [`~/assets/font.css`],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/axios' }, { src: '~/plugins/filters' }],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxtjs/vuetify',
      {
        defaultAssets: false
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
      options: {
        minifyTheme: function(css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css;
        }
      },
      themes: {
        light: {
          primary: colors.pink,
        },
        dark: {
          primary: colors.indigo,
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
    extractCSS: true,
    // todo 放开下面注释会报错，Cannot read property 'props' of undefined
    // node_modules/vue/dist/vue.runtime.common.prod.js:6:9329
    // splitChunks: {
    //   layouts: true,
    //   pages: true,
    //   commons: true
    // },
    optimizeCSS: true,
    /*
     ** You can extend webpack config here
     */
    
    extend(config, ctx) {},
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
