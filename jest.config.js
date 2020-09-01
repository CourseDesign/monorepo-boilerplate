const glob = require('glob');
const lerna = require('./lerna.json');

const projects = lerna.packages
  .filter((project) => glob.sync(project).length > 0)
  .map((project) => `<rootDir>/${project}`)

module.exports = {
  verbose: true,
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '\\.spec\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  projects: projects,
  globals: {
    'ts-jest': {
      'diagnostics': true
    }
  }
};
