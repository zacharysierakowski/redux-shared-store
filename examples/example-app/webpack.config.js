var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8080";

module.exports = {
  entry: ["react-hot-loader/patch", path.resolve(__dirname, "./src/index.js")],
  devtool: "eval-source-map",
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.js|.jsx?$/,
        exclude: /(node_modules|dist\/)/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: ".",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html")
    })
  ]
};
