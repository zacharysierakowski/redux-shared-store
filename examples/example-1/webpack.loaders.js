var path = require("path");

module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|dist\/)/,
    loader: "babel-loader"
  },
  {
    test: /\.js?$/,
    exclude: /(node_modules|dist\/)/,
    loader: "babel-loader"
  }
];
