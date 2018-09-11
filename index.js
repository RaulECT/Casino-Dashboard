var express = require( 'express' )
var path = require( 'path' )
var http = require('http')

var devPath = path.join( __dirname, 'development' )
var app = express()
var server = http.createServer(app)

app.use( '/static/', express.static( 'production' ) )

// Express Server
app.get( '/', function( req, res ) {
  res.sendFile( path.join( devPath, 'index.html' ) )
} )

/**
 * SOCKET IO
 */
const io = require('socket.io')()
io.on( "connect", ( client ) => {
  console.log( '[SERVER]- BINGO GAME APP CONECTED', client )
} )
io.listen(server)

server.listen( 3000, () => { console.log('APP RUNNING') } )