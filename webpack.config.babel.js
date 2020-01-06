const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  context: path.join(__dirname, "src"),
  entry: {
    app: "./index.js",
    worker: "./worker.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "src/index.html")
    })
  ]
};
