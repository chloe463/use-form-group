#!/usr/bin/env sh

set -eux
set -o pipefail

# Remove previous build files and working directory
rm -rf ./builds ./.packaging

yarn run build:esm5
yarn run build:fesm5

yarn run build:esm2015
yarn run build:fesm2015
yarn run build:umd

mkdir ./builds/src
cp -r .packaging/esm2015/*.d.ts .packaging/esm2015/** builds/src
rm ./builds/src/*.js

node ./scripts/modify-package-json.js
cp README.md ./builds/
