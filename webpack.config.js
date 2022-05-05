const webpack = require('webpack');
const path = require('path');

module.exports = (_env, argv) => {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  const config = {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [],
  };
  return config;
};
