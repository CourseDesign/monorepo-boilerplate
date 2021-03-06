const fs = require('fs');
const { src, dest, series } = require('gulp');
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


const tsProject = ts.createProject(getTsconfigName());

function compile() {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(dest('dist'));
}

function compression() {
  return src('dist/**/*.js')
    .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
    .pipe(dest('dist'));
}

const build = series(compile, compression);

exports.default = series(build);