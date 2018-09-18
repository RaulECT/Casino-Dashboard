import { START_GAME, END_GAME } from './actions'
import openSocket from 'socket.io-client'

// TODO: CHANGE TO PRODUCTION URL
const socketURL = 'http://localhost:3000'
const socket = openSocket( socketURL )

export const startGame = () => {
  return {
    type: START_GAME
  }
}

export const initGame = () => {
  return (dispatch) => {
    socket.emit( 'START_GAME_RQ' )
    dispatch( startGame() )
  }
}

export const endGame = () => {
  return {
    type: END_GAME
  }
}

export const drawCard = () => {
  socket.emit( 'DRAW_CARD_RQ' )
}

export const anounceWinner = () => {
  return ( dispatch ) => {
    socket.emit( 'USER_WON_RQ' )
    dispatch( endGame() )
  }
}