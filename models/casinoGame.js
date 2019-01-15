var config = require( '../config/config' )

module.exports = function CasinoGame( { gameInfo, cardboards } ) {
  
  // MARK: PROPERTIES
  this.gameInfo = gameInfo
  this.cardboards = cardboards
  this.currentCard = null
  this.cardList = null,
  this.gameHistory = null
  this.cardboardsRegistered = []
  this.cardboardsPagesConnected = []
  this.isCountdownStarted = false
  this.countdownTime = config.COUNTDOWN_START_TIME,
  this.conutdownInterval = null

  // MARK: FUNCTIONS
  this.drawCard = function( card, cardList, gameHistory ) {
    this.currentCard = card
    this.cardList = cardList
    this.gameHistory = gameHistory

  }

  this.getDashboardInfo = function() {
    return {
      currentCard: this.currentCard,
      cardList: this.cardList,
      currentGame: this.gameInfo,
      gameHistory: this.gameHistory,
      cardboards: this.cardboards,
      isCountdownStarted: this.isCountdownStarted
    }
  }

  this.getGameAppInfo = function() {
    return {
      card: this.currentCard,
      cardList: this.cardList,
      game: this.gameInfo,
      gameHistory: this.gameHistory
    }
  }

  this.getCountdownTime = function() {
    return {
      time: this.countdownTime
    }
  }

  this.startCountdown = function( callback ) {
    this.isCountdownStarted = true
    this.conutdownInterval = setInterval( () => callback(), 1000 )
  }

  this.stopCountdown = function() {
    this.isCountdownStarted = false
    clearInterval( this.conutdownInterval )
  }
}