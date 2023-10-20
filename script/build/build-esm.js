const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function buildEsmConfig({ entry, path }) {
  return {
    mode: "production",
    entry,
    output: {
      path,
      filename: "index.esm.js",
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.ts/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  };
}
