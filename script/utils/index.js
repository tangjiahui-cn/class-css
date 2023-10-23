const webpack = require("webpack");

// 同步运行webpack打包任务
function runWebpackSync(...args) {
  let i = 0;
  const configList = args.reduce((res, cur) => res.concat(cur), []);

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
