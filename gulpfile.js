const { src, dest, series } = require('gulp');
const gulpif = require('gulp-if');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

const tsProject = ts.createProject(
  process.env.NODE_ENV ? `tsconfig.${process.env.NODE_ENV.toLowerCase()}.json` : 'tsconfig.json'
);

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

const build = series(compile, compression)

exports.default = series(build);