const path = require("path");
const rootPath = (...args) => path.resolve(__dirname, "../../", ...args);
const buildEsmConfig = require("./build-esm");
const webpack = require("webpack");

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

const webpackConfigs = buildPackages.map((package) => {
  return buildEsmConfig({
    path: rootPath(package.packageDir, "dist"),
    entry: rootPath(package.packageDir, package.entry),
  });
});

// 同步运行webpack打包任务
runWebpackSync(webpackConfigs);

function runWebpackSync(configList) {
  let i = 0;

  function run() {
    const config = configList[i++];
    if (config) {
      webpack(config).run(() => {
        if (i < configList.length) {
          run();
        }
      });
    }
  }

  run();
}
