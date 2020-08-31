const fs = require('fs');
const path = require('path');

function required(value) {
  if (value == null) {
    process.exit(1);
  }
  return value;
}

const rootPath = required(process.argv[2]);
const packagePath = required(process.argv[3]);

fs.readdirSync(rootPath).forEach(file => {
  if (/tsconfig(\.\w+)?\.json/.test(file)) {
    const packageConfig = require(`${packagePath}/${file}`);
    if (packageConfig == null) return;

    const rootConfig = require(`${rootPath}/${file}`);
    if (rootConfig == null) return;

    const merged = { ...packageConfig, ...rootConfig };

    fs.writeFileSync(`${packagePath}/${file}`, JSON.stringify(merged, null, 2) + '\n');
  }
});
