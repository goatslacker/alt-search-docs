var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules', 'react-text-highlight', 'src')
      ],
      loaders: ['react-hot', 'babel-loader?stage=0']
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
}
