import colors from 'vuetify/es5/util/colors';
import LRU from 'lru-cache';

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60
});
var isProd = process.env.NODE_ENV === `production`;

export default {
  treeShake: isProd,
  defaultAssets: false,
  icons: {
    iconfont: 'mdiSvg'
  },
  customVariables: ['~/assets/variables.scss'],
  theme: {
    dark: false,
    options: {
      themeCache: themeCache,
      minifyTheme: function(css) {
        return isProd ? css.replace(/[\r\n|\r|\n]/g, '') : css;
      }
    },
    themes: {
      light: {
        primary: colors.pink.base
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
};
