var express = require( 'express' )
var path = require( 'path' )
var http = require('http')

var devPath = path.join( __dirname, 'development' )
var app = express()
var server = http.createServer(app)

// BINGO
var currentCard = null
var cardList = null

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
  io.emit( 'BINGO_CONECTED' )

  client.on( 'START_GAME_RQ', () => {
    io.emit( 'START_GAME' )
  } )

  client.on( 'DRAW_CARD_RQ', ( turn ) => {
    io.emit( 'DRAW_CARD', {turn: turn} )
  } )

  client.on( 'USER_WON_RQ', () => {
    io.emit( 'USER_WON' )
  } )
} )
io.listen(server)

server.listen( 3000 )