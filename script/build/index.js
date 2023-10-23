const path = require("path");
const rootPath = (...args) => path.resolve(__dirname, "../../", ...args);
const buildEsmConfig = require("./build-esm");
const buildCjsConfig = require("./build-cjs");
const { runWebpackSync } = require("../utils");

// 要打包的子包
const buildPackages = [
  {
    packageDir: "packages/cache",
    packageName: "class-css-cache",
    entry: "src/index.ts",
  },
  {
    packageDir: "packages/hash",
    packageName: "class-css-hash",
    entry: "src/index.ts",
  },
  {
    packageDir: "packages/stringify",
    packageName: "class-css-stringify",
    entry: "src/index.ts",
  },
  {
    packageDir: "packages/css",
    packageName: "class-css",
    entry: "src/index.ts",
  },
];

const webpackESMConfigs = buildPackages.map((package) => {
  return buildEsmConfig({
    clean: true,
    path: rootPath(package.packageDir, "dist"),
    entry: rootPath(package.packageDir, package.entry),
  });
})

const webpackCJSConfigs = buildPackages.map((package) => {
  return buildCjsConfig({
    name: package.packageName,
    path: rootPath(package.packageDir, "dist"),
    entry: rootPath(package.packageDir, package.entry),
  });
})

runWebpackSync(webpackESMConfigs, webpackCJSConfigs);
