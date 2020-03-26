module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  ignore: ['node_modules']
};
