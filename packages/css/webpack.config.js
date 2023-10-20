const path = require("path");
const resolvePath = (...args) => path.resolve(__dirname, ...args);
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: resolvePath("src/index.ts"),
  output: {
    path: resolvePath("dist"),
    filename: "index.esm.js",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
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
