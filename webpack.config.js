var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var CleanWebpackPlugin = require("clean-webpack-plugin");

const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    library: packageJSON.name,
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  externals: Object.keys(
    Object.assign({}, packageJSON.peerDependencies, packageJSON.dependencies)
  ).reduce(function(previous, key) {
    return Object.assign({}, previous, {
      [key]: key
    });
  }, {}),
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
    new CleanWebpackPlugin("lib"),
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
