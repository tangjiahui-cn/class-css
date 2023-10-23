module.exports = function buildEsmConfig({ entry, path, name, clean }) {
  return {
    mode: "production",
    entry,
    output: {
      path,
      filename: "index.cjs.js",
      globalObject: 'this',
      clean,
      library: {
        name,
        export: 'default',
        type: "umd",
      },
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
  };
}
