var path = require('path');
var fs = require('fs');
var webpack = require("webpack");
//var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

var basePath = __dirname;

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  context: path.join(basePath, "src"),
  resolve: {
      // .js is required for react imports.
      // .tsx is for our app entry point.
      // .ts is optional, in case you will be importing any regular ts files.
      extensions: ['', '.js', '.ts']
  },

  target: 'node',

  entry: [
    //'./js/bin/app.js'
      './testRunApp.ts'
  ],

  output: {
    path: path.join(basePath, "dist"),
    filename: 'bundle.js'
  },
  externals: nodeModules,

  //https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    host: 'localhost',
    port: 8080
  },

  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',

  module: {
		loaders: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
		]
	},

  plugins:[
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: 'index.html', //Name of file in ./dist/
      template: 'index.html' //Name of template in ./src
    })*/
  ]
}
