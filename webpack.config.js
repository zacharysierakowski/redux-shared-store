var webpack = require("webpack");
var path = require("path");
var fs = require("fs");

const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "package.json"), "utf8")
);

/* This can probably be improved upon using `reduce` */
const externals = (function() {
  const peerDependencies = packageJSON.peerDependencies;
  const dependencies = packageJSON.dependencies;

  const externals = {};
  const set = function(_) {
    Object.keys(_).map(function(dependency) {
      externals[dependency] = dependency;
    });
  };

  if (dependencies) set(dependencies);
  if (peerDependencies) set(peerDependencies);

  return externals;
})();

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
  externals: externals,
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
