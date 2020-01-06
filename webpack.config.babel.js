const webpack = require("webpack");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: resolve(__dirname, "src"),
  entry: {
    app: "./index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "dist")
  },
  devServer: {
    hot: true,
    publicPath: "/",
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, "src/index.html")
    })
  ]
};
