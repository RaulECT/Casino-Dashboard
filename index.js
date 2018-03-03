var express = require( 'express' )
var path = require( 'path' )

var devPath = path.join( __dirname, 'development' )
var app = express()

app.use( '/static/', express.static( 'production' ) )

// Express Server
app.get( '/', function( req, res ) {
  res.sendFile( path.join( devPath, 'index.html' ) )
} )

app.listen( 3000 )