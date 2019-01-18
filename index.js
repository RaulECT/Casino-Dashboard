var express = require( 'express' )
var path = require( 'path' )
var http = require('http')
var config = require( './config/config' )

var devPath = path.join( __dirname, 'development' )
var app = express()
var server = http.createServer(app)

var GamesHandler = require( './models/gamesHandler' )
var CasinoGame = require( './models/casinoGame' )

// BINGO
var currentCard = null
var cardList = null
var currentGame = null
var gameHistory = null
var cardboards = null
var cardboardsRegistered = []
var cardboardsPagesConnected = []
var isCountdownStarted = false
var countdownTime = config.COUNTDOWN_START_TIME
var conutdownInterval

var cardboardsGame = {}
var countdownGames = {}

var gamesHandler = new GamesHandler()

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

  var casinoId = client.handshake.query.casinoId ? client.handshake.query.casinoId : ''
  var casinoGame = gamesHandler.searchByCasinoId( casinoId )
  var currentCasinoGame = casinoGame.length > 0 ? casinoGame[0].game : null
  
  client.join( casinoId )

  if ( currentCard !== null && cardList !== null ) {
    
    if ( currentCasinoGame !== null ) {
      // console.log(currentCasinoGame)
      // console.log('game started')
      var gameAppInfo = currentCasinoGame.getGameAppInfo()
      var dashboardInfo = currentCasinoGame.getDashboardInfo()

      // console.log( 'GAME: ', gameAppInfo )
      // console.log( 'DASH: ', dashboardInfo )
      // console.log( gamesHandler.games )

      // io.emit( 'BINGO_CONECTED', { card: currentCard, cardList: cardList, game: currentGame, gameHistory: gameHistory } )
    
      // GLOBAL
      // io.emit( 'BINGO_CONECTED', gameAppInfo )
    
      // ROOM
      io.to( casinoId ).emit( 'BINGO_CONECTED', gameAppInfo )
    
      // io.emit( 'DASHBOARD_CONECTED', {
      //   currentCard: currentCard,
      //   cardList: cardList,
      //   currentGame: currentGame,
      //   gameHistory: gameHistory,
      //   cardboards: cardboards,
      //   isCountdownStarted: isCountdownStarted
      // } )
    
      // GLOBAL
      // io.emit( 'DASHBOARD_CONECTED', dashboardInfo )

      // ROOM
      io.to( casinoId ).emit( 'DASHBOARD_CONECTED', dashboardInfo ) 
    }
  }

  if ( typeof countdownGames[casinoId] !== 'undefined' ) {
    if ( countdownGames[casinoId].isStarted ) {

      // GLOABL
      // io.emit( 'COUNTDOWN_CONNECTED', { time: countdownTime } )
      // io.emit( 'COUNTDOWN_STARTED' )
  
      // LOCAL
      io.to( casinoId ).emit( 'COUNTDOWN_CONNECTED', { time: countdownGames[casinoId].time } )
      io.to( casinoId ).emit( 'COUNTDOWN_STARTED' )
    } 
  }

  client.on( 'CONNECT_CARDBOARDS_PAGE', ( data ) => {
    cardboardsPagesConnected.push( client.id )
    const cardboards = pageCardboards( cardboardsRegistered, cardboardsPagesConnected.length )
    client.emit( 'CARDBOARDS_PAGE_CONNECTED', { cardboardsRegistered: cardboards } )
  } )

  client.on( 'SHOW_START_GAME_NOTIFICATION_RQ', () => {
    // GLOBAL
    io.emit( 'SHOW_START_GAME_NOTIFICATION' )

    // LOCAL
    io.to( casinoId ).emit( 'SHOW_START_GAME_NOTIFICATION' )
  } )

  client.on( 'START_COUNTDOWN', () => {
    isCountdownStarted = true
    conutdownInterval = setInterval( () => updateTime( casinoId = casinoId ), 1000 )

    var countdownCasinos = Object.keys( countdownGames )

    if ( countdownCasinos.indexOf( casinoId ) === -1 ) {
      countdownGames[casinoId] = { isStarted: true, time: config.COUNTDOWN_START_TIME, interval: conutdownInterval }
    }

    // GLOABL
    // io.emit( 'COUNTDOWN_STARTED' )

    // LOCAL
    io.to( casinoId ).emit( 'COUNTDOWN_STARTED' )
  } )

  client.on( 'STOP_COUNTDOWN', () => {
    clearInterval( countdownGames[casinoId].interval )

    delete countdownGames[casinoId]
  } )

  client.on( 'REGISTER_CARDBOARD_RQ', ( cardboard ) => {
    // cardboardsRegistered.push( cardboard )

    const casinos = Object.keys( cardboardsGame )

    if ( casinos.indexOf( casinoId ) !== -1 ) {
      cardboardsGame[casinoId].push( cardboard )
    } else {
      cardboardsGame[casinoId] = [ cardboard ]
    }
    // console.log(cardboardsGame)
    io.to( casinoId ).emit( 'REGISTER_CARDBOARD', cardboardsGame[casinoId] )


    // var casinoGame = gamesHandler.searchByCasinoId( casinoId )

    // if ( casinoGame.length !== 0 ) {

    //   casinoGame[0].game.addCardboard( cardboard )
    //   console.log( casinoGame[0].game.cardboardsRegistered )
    //   io.to( casinoId ).emit( 'REGISTER_CARDBOARD', casinoGame[0].game.cardboardsRegistered )

    //   cardboardsPagesConnected.map( ( page, index ) => {
    //     const cardboards = pageCardboards( cardboardsRegistered, (index + 1) )
      
    //     // client.broadcast.to( page ).emit( 'REGISTER_CARDBOARD', cardboards )
      
    //     // io.to( casinoId ).emit( 'REGISTER_CARDBOARD', cardboards )
    //   } ) 
    // }

    // io.emit( 'REGISTER_CARDBOARD', cardboardsRegistered )
  } )

  client.on( 'START_GAME_RQ', ( game, callback ) => {

    var casinoGame = gamesHandler.searchByCasinoId( casinoId )
    
    if ( casinoGame.length === 0 ) {
      var newGame = new CasinoGame( { gameInfo: game.game, cardboards: game.cardboards } )
    
      gamesHandler.addGame( casinoId, newGame )
    }

    callback()
    currentGame = game.game
    cardboards = game.cardboards
    // io.emit( 'START_GAME', game )

    io.to( casinoId ).emit( 'START_GAME', game )
  } )

  client.on( 'DRAW_CARD_RQ', ( turn ) => {
    currentCard = turn.card
    cardList = turn.cardList
    gameHistory = turn.gameHistory
    
    var casinoGame = gamesHandler.searchByCasinoId( casinoId )
    if ( casinoGame.length !== 0 ) {
      casinoGame[0].game.drawCard( turn.card, turn.cardList, turn.gameHistory )
      // console.log(casinoGame)
    }
    
    // io.emit( 'DRAW_CARD', {turn: turn} )

    io.to( casinoId ).emit( 'DRAW_CARD', {turn: turn} )
  } )

  client.on( 'USER_WON_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null
    gameHistory = null
    isCountdownStarted = false

    gamesHandler.deleteGame( casinoId )
    delete cardboardsGame[casinoId]
    // io.emit( 'USER_WON' )

    io.to( casinoId ).emit( 'USER_WON' )
  } )

  client.on( 'FORCE_END_GAME_RQ', () => {
    currentCard = null
    cardList = null
    currentGame = null
    gameHistory = null
    cardboards = null
    isCountdownStarted = false

    gamesHandler.deleteGame( casinoId )
    delete cardboardsGame[casinoId]

    // io.emit( 'FORCE_END_GAME' )

    io.to( casinoId ).emit( 'FORCE_END_GAME' )
  } )

  client.on( 'disconnect', data => {
    cardboardsPagesConnected = cardboardsPagesConnected.filter( page => page !== client.id )
  } )

} )

function updateTime( casinoId ) {
  var countdownTime = countdownGames[casinoId].time

  countdownGames[casinoId].time = countdownGames[casinoId].time - 1
  io.to(casinoId).emit( 'UPDATE_COUNTDOWN', { time: countdownTime } )
}

io.listen(server)

server.listen( config.APP_PORT )

