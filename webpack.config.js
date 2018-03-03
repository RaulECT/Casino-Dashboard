const path = require('path')

var devPath = path.join( __dirname, 'development' )
var prodPath = path.join( __dirname, 'production' )

module.exports = {
  entry: path.join( devPath, 'app.jsx' ),
  output: {
    path: prodPath,
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: [ 
        {loader: 'style-loader'}, 
        {loader: 'css-loader', options: {url: false}} ] 
      }
    ]
  }
}