var path = require('path')
var AcidPlugin = require('webpack-plugin-acid')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    outputPath: path.join(__dirname, 'dist')
  },
  plugins: [
    new AcidPlugin(),
    new ExtractTextPlugin('styles.css'),
    new CopyPlugin([{from: 'src/static'}])
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.(svg|woff|woff2|eot|ttf)$/, loader: 'file' }
    ]
  }
}
