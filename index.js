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

  client.on( 'START_GAME_RQ', () => {
    io.emit( 'START_GAME' )
  } )

  client.on( 'DRAW_CARD_RQ', () => {
    io.emit( 'DRAW_CARD' )
  } )

  client.on( 'USER_WON_RQ', () => {
    io.emit( 'USER_WON' )
  } )
} )
io.listen(server)

server.listen( 3000 )