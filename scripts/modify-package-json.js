// import { readFileSync, writeFileSync } from 'fs';
// import { join, dirname } from 'path';

/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require("fs");
const { join, dirname } = require("path");
/* eslint-enable */

const packageJson = JSON.parse(readFileSync(join(dirname(dirname(process.argv[1])), "./package.json"), "utf-8"));
const modified = Object.assign({}, packageJson, {
  dependencies: {},
  devDependencies: {},
  peerDependencies: packageJson.dependencies,
  scripts: {},
  main: "./bundle/use-form-group.umd.js",
  module: "./esm5/use-form-group.js",
  es2015: "./esm2015/use-form-group.js",
  typings: "./src/index.d.ts",
});
delete modified.eslintConfig;
delete modified.browserslist;

writeFileSync("./builds/package.json", JSON.stringify(modified, null, 2));
