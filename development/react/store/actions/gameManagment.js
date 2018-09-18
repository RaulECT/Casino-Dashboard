import { START_GAME, END_GAME, INCREMENT_TURN } from './actions'
import { socket } from '../../../socket'


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
  return ( dispatch ) => {
    socket.emit( 'DRAW_CARD_RQ' )
    dispatch( incrementTurn() )
  }
  
}

export const incrementTurn = () => {
  return {
    type: INCREMENT_TURN
  }
}

export const anounceWinner = () => {
  return ( dispatch ) => {
    socket.emit( 'USER_WON_RQ' )
    dispatch( endGame() )
  }
}