const webpack = require("webpack");

// 同步运行webpack打包任务
function runWebpackSync(...args) {
  let i = 0;
  const configList = args.flat(Infinity);

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

module.exports = {
  runWebpackSync,
};
