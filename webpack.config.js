var webpack = require('webpack')

module.exports = {
  entry: './src',
  output: {
    filename: 'dist/index.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0' }
    ]
  }
}
