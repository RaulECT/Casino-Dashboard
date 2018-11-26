const path = require('path')
const package = require('./package.json')
const webpack = require('webpack')

var devPath = path.join( __dirname, 'development' )
var prodPath = path.join( __dirname, 'production' )

module.exports = {
  entry: path.join( devPath, 'app.jsx' ),
  output: {
    path: prodPath,
    publicPath: '/static/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: [ 
        {loader: 'style-loader'}, 
        {loader: 'css-loader', options: {url: false}} ] 
      },
      { test: /\.(png|jpg|gif)$/, use: [
        {loader: 'url-loader', options: {limit: 81920}} ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor',
      filename: 'vendor.[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name:'manifest'
    })
  ]

}