const fs = require('fs');
const { src, dest, series, lastRun } = require('gulp');
const gulpif = require('gulp-if');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

function getTsconfigName() {
  if (!process.env.NODE_ENV) return 'tsconfig.json';

  const specificConfig = `tsconfig.${process.env.NODE_ENV.toLowerCase()}.json`;
  if (fs.existsSync(specificConfig)) {
    return specificConfig;
  }

  return 'tsconfig.json';
}

function getTsIncludePath() {
  return tsProject.config.include ?? 'lib';
}

const tsProject = ts.createProject(getTsconfigName());

function compile() {
  return src(getTsIncludePath(), { sourcemaps: true, since: lastRun(compile) })
    .pipe(tsProject())
    .pipe(dest('dist'));
}

function compression() {
  return src('dist/**/*.js', { sourcemaps: true, since: lastRun(compression) })
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(dest('dist'));
}

const build = series(compile, compression);

exports.default = series(build);