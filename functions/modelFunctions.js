var config = require( '../config/config' )

export const getCasinoGameModel = ( { gameInfo, cardboards } ) => {
  return {
    currentCard: null,
    cardList: null,
    gameHistory: null,
    cardboardsRegistered: [],
    cardboardsPagesConnected: [],
    isCountdownStarted: false,
    countdownTime: config.COUNTDOWN_START_TIME,
    conutdownInterval: null
  }
}