var express = require( 'express' )
var path = require( 'path' )
var http = require('http')
var config = require( './config/config' )

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
var cardboardsPagesConnected = []
var isCountdownStarted = false
var countdownTime = 30
var conutdownInterval

function pageCardboards( cardboardsRegistered, index ) {
  const cardboardsPerPage = config.CARDBOARDS_PER_PAGE

 if ( cardboardsRegistered.length >= config.CARDBOARDS_PER_PAGE ) {
  const limitSup = index * cardboardsPerPage
  const limitInf = limitSup - cardboardsPerPage
  const cardboardsPaged = cardboardsRegistered.slice( limitInf, limitSup )

  return cardboardsPaged
 } else {
   return cardboardsRegistered
 } 
}

// TODO: DELETE
// const types = [ 'SINGLE', 'DOUBLE', 'TRIPLE' ]
// for (let index = 0; index < 30; index++) {
//   const randomType = types[ Math.floor(Math.random() * (types.length - 0)) + 0 ]
//   const first = Math.floor((Math.random() * 9) + 1)
//   const second = Math.floor((Math.random() * 9) + 1)
//   const third = Math.floor((Math.random() * 9) + 1)
//   const fourth = Math.floor((Math.random() * 9) + 1)

//   const randomNumcode = parseInt(`${first}${second}${third}${fourth}`)
  
//   cardboardsRegistered.push( { numcode: randomNumcode, type: randomType } )
// }

app.use( '/static/', express.static( 'production' ) )

// Express Server
app.get( '/', function( req, res ) {
  res.sendFile( path.join( devPath, 'index.html' ) )
} )

/**
 * SOCKET IO
 */
const io = require('socket.io')()
io.on( "connect",( client ) => {
  if ( currentCard !== null && cardList !== null ) {
    io.emit( 'BINGO_CONECTED', { card: currentCard, cardList: cardList, game: currentGame, gameHistory: gameHistory } )
    
    io.emit( 'DASHBOARD_CONECTED', {
      currentCard: currentCard,
      cardList: cardList,
      currentGame: currentGame,
      gameHistory: gameHistory,
      cardboards: cardboards,
      isCountdownStarted: isCountdownStarted
    } )
  }

  if ( isCountdownStarted ) {
    io.emit( 'COUNTDOWN_CONNECTED', { time: countdownTime } )
    io.emit( 'COUNTDOWN_STARTED' )
  }

  client.on( 'CONNECT_CARDBOARDS_PAGE', ( data ) => {
    cardboardsPagesConnected.push( client.id )
    const cardboards = pageCardboards( cardboardsRegistered, cardboardsPagesConnected.length )
    client.emit( 'CARDBOARDS_PAGE_CONNECTED', { cardboardsRegistered: cardboards } )
  } )

  client.on( 'SHOW_START_GAME_NOTIFICATION_RQ', () => {
    io.emit( 'SHOW_START_GAME_NOTIFICATION' )
  } )

  client.on( 'START_COUNTDOWN', () => {
    isCountdownStarted = true
    conutdownInterval = setInterval( () => updateTime(), 1000 )

    io.emit( 'COUNTDOWN_STARTED' )
  } )

  client.on( 'STOP_COUNTDOWN', () => {
    clearInterval( conutdownInterval )
  } )

  client.on( 'REGISTER_CARDBOARD_RQ', ( cardboard ) => {
    cardboardsRegistered.push( cardboard )

    cardboardsPagesConnected.map( ( page, index ) => {
      const cardboards = pageCardboards( cardboardsRegistered, (index + 1) )
    
      client.broadcast.to( page ).emit( 'REGISTER_CARDBOARD', cardboards )
    } )

    // io.emit( 'REGISTER_CARDBOARD', cardboardsRegistered )
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
    isCountdownStarted = false

    io.emit( 'USER_WON' )
  } )

  client.on( 'FORCE_END_GAME_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null
    gameHistory = null
    cardboards = null
    isCountdownStarted = false

    io.emit( 'FORCE_END_GAME' )
  } )

  client.on( 'disconnect', data => {
    cardboardsPagesConnected = cardboardsPagesConnected.filter( page => page !== client.id )
  } )

} )

function updateTime() {
  countdownTime--
  io.emit( 'UPDATE_COUNTDOWN', { time: countdownTime } )
}

io.listen(server)

server.listen( config.APP_PORT )