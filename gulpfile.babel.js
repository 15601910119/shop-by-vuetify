import path from 'path';
import webpack from 'webpack';
import gulp, { series, parallel } from 'gulp';
import gulpZip from 'gulp-zip';
import del from 'delete';
import chalk from 'chalk';
import updateFc from './build/update-fc';

import webpackConfig from './build/webpack.config';

function webpackTask(cb) {
  webpack(webpackConfig, (error, stats) => {
    if (error) {
      console.log(chalk.red(`这是webpack相关错误, 并非编译错误, 比如配置错误`));
      console.error(error.stack || error);

      if (error.details) {
        console.error(error.details);
      }

      cb(new Error(`webpack运行出错`));
      return;
    }

    var info = stats.toJson();

    if (stats.hasErrors()) {
      info.errors.forEach((error) => console.error(chalk.red(error)));

      cb(new Error(`webpack编译出错`));
      return;
    }

    if (stats.hasWarnings()) {
      info.warnings.forEach((warning) => {
        var info = warning
          .match(/^.*$/gm)
          .slice(0, 2)
          .join(' __REASON__: ');

        console.warn(chalk.yellow(info));
      });
    }

    cb();
  });
}

export function copy() {
  return gulp.src([`nuxt-dist/**/*`]).pipe(gulp.dest('deploy/nuxt-dist'));
}

gulp.task(`copy`, copy);

export function zip() {
  console.log(`开始打包代码包`);
  return gulp
    .src([
      `+(nuxt-dist)/**/*`,
      `deploy/+(node_modules)/**/*`,
      `deploy/server.js`,
      `nuxt.config.js`,
      `vuetify.options.js`
    ])
    .pipe(gulpZip(`dist.zip`))
    .pipe(gulp.dest(`deploy`));
}

gulp.task(`clean`, function(cb) {
  console.log(`开始清理旧的代码包`);
  del([`deploy/dist.zip`], cb);
});

gulp.task(`build`, series(parallel(webpackTask)));

gulp.task(`upload:server`, function() {
  console.log(`开始上传至阿里云函数计算`);
  return updateFc(path.resolve(`deploy/dist.zip`)).then((resp) =>
    console.log(`${resp.data.functionName}函数上传成功`)
  );
});

gulp.task(`deploy`, series(`clean`, zip, `upload:server`));
