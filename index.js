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
var gameHistory = null
var cardboards = null
var cardboardsRegistered = []

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
    io.emit( 'BINGO_CONECTED', { card: currentCard, cardList: cardList, game: currentGame, gameHistory: gameHistory } )
    
    client.emit( 'DASHBOARD_CONECTED', {
      currentCard: currentCard,
      cardList: cardList,
      currentGame: currentGame,
      gameHistory: gameHistory,
      cardboards: cardboards
    } )
  }

  client.emit( 'CARDBOARDS_PAGE_CONNECTED', { cardboardsRegistered } )

  client.on( 'REGISTER_CARDBOARD_RQ', ( cardboard ) => {
    cardboardsRegistered.push( cardboard )
    io.emit( 'REGISTER_CARDBOARD', cardboard )
  } )

  client.on( 'START_GAME_RQ', ( game ) => {
    currentGame = game.game
    cardboards = game.cardboards
    io.emit( 'START_GAME', game )
  } )

  client.on( 'DRAW_CARD_RQ', ( turn ) => {
    currentCard = turn.card
    cardList = turn.cardList
    gameHistory = turn.gameHistory
    
    io.emit( 'DRAW_CARD', {turn: turn} )
  } )

  client.on( 'USER_WON_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null
    gameHistory = null

    io.emit( 'USER_WON' )
  } )

  client.on( 'FORCE_END_GAME_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null
    gameHistory = null
    cardboards = null

    io.emit( 'FORCE_END_GAME' )
  } )

} )
io.listen(server)

server.listen( 3000 )