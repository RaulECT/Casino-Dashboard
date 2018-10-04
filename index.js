var express = require( 'express' )
var path = require( 'path' )
var http = require('http')

var devPath = path.join( __dirname, 'development' )
var app = express()
var server = http.createServer(app)

// BINGO
var currentCard = null
var cardList = null
var currentGame = null

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
  if ( currentCard !== null && cardList !== null ) {
    io.emit( 'BINGO_CONECTED', { card: currentCard, cardList: cardList, game: currentGame } )
  }

  client.on( 'START_GAME_RQ', ( game ) => {
    currentGame = game
    io.emit( 'START_GAME', game )
  } )

  client.on( 'DRAW_CARD_RQ', ( turn ) => {
    currentCard = turn.card
    cardList = turn.cardList
    
    io.emit( 'DRAW_CARD', {turn: turn} )
  } )

  client.on( 'USER_WON_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null

    io.emit( 'USER_WON' )
  } )
} )
io.listen(server)

server.listen( 3000 )