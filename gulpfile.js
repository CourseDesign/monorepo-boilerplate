const fs = require('fs');
const path = require("path");

const { src, dest, series, lastRun } = require('gulp');
const gulpif = require('gulp-if');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const merge = require('deepmerge')

function getTsconfigName() {
  if (!process.env.NODE_ENV) return 'tsconfig.json';

  const specificConfig = `tsconfig.${process.env.NODE_ENV.toLowerCase()}.json`;
  if (fs.existsSync(specificConfig)) {
    return specificConfig;
  }

  return 'tsconfig.json';
}

function getFinalTsConfig(config, currentPath) {
  const parentConfigPath = config['extends'];

  if (parentConfigPath) {
    const finalParentConfigPath = path.join(currentPath, parentConfigPath);
    const parentProject = ts.createProject(finalParentConfigPath);

    const parentConfig = getFinalTsConfig(parentProject.rawConfig, parentProject.projectDirectory);
    const { extends: _extends, ...rest } = config;
    return merge(parentConfig, rest);
  }
  return config;
}

function getTsConfig() {
  return getFinalTsConfig(tsProject.rawConfig, tsProject.projectDirectory)
}

const tsProject = ts.createProject(getTsconfigName());

function compile() {
  return src(getTsConfig().include, { sourcemaps: true, since: lastRun(compile) })
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