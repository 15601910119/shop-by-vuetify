var colors = require('vuetify/es5/util/colors').default;
// 接口域名
var BASE_URL;
// 环境变量
var isProd = process.env.NODE_ENV === `production`;

if (isProd) {
  BASE_URL = `http://shop.xvivx.online/`;
} else {
  BASE_URL = `http://192.168.0.103:3001/`;
}

var optimization = {
  minimize: true,
  runtimeChunk: `single`,
  splitChunks: {
    chunks: 'all',
    minChunks: 1,
    minSize: 100 * 1000, // 形成一个新代码块最小的体积
    maxSize: 0,
    maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
    maxInitialRequests: 5, // 最大初始化请求数
    automaticNameDelimiter: '~' // 打包分割符
  }
};

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
    treeShake: isProd,
    defaultAssets: false,
    icons: {
      iconfont: 'mdiSvg'
    },
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      options: {
        minifyTheme: function(css) {
          return process.env.NODE_ENV === `production`
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css;
        }
      },
      themes: {
        light: {
          primary: colors.pink
        },
        dark: {
          primary: colors.grey.darken3,
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
    // 优化css
    extractCSS: true,
    optimizeCSS: true,
    extend(config, ctx) {
      if (ctx.isClient && !ctx.isDev) {
        config.optimization = optimization;
      }
    }
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
