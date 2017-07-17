var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    library: "redux-shared-store",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  externals: {
    react: "react"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|lib\/)/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
