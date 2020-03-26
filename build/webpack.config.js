import path from 'path';
import webpack from 'webpack';

export default {
  target: `node`,
  mode: `production`,
  context: path.resolve(''),
  entry: {
    server: [`./server/ali-fc.js`]
  },
  output: {
    path: path.resolve(`deploy`),
    filename: `[name].js`,
    libraryTarget: 'commonjs',
    chunkFilename: 'chunks/[name].[chunkhash:5].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  externals: [`@nuxt`, `nuxt`, `jsdom`],
  // externals: {
  //   nuxt: 'nuxt',
  //   canvas: `canvas`,
  //   jsdom: `jsdom`
  // },
  stats: {
    colors: true,
    timings: true,
    exclude: /node_modules/,
    builtAt: false,
    modules: false,
    reasons: true,
    cachedAssets: true,
    children: false,
    optimizationBailout: true
  },
  node: {
    __dirname: false,
    global: false,
    fs: false,
    path: false,
  }
};
