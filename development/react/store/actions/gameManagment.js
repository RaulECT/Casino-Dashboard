import { START_GAME, END_GAME, INCREMENT_TURN, CREATE_GAME_START, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL } from './actions'
import { socket } from '../../../socket'
import { changeCard } from './bingoGame'
import {notification} from 'antd'

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

export const drawCard = ( card, cardList ) => {
  return ( dispatch ) => {
    socket.emit( 'DRAW_CARD_RQ', { card: card, cardList:cardList } )
    dispatch( incrementTurn() )
    dispatch( changeCard(card, cardList) )
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

export const startCreateGame = () => {
  notification['success']({
    message: 'Crear Juego',
    description: 'Se ha creado el juego exitosamente'
  })

  return {
    type: CREATE_GAME_START
  }
}

export const startGameSuccess = () => {
  return {
    type: CREATE_GAME_SUCCESS
  }
}

export const startGameFail = ( error ) => {
  return {
    type: CREATE_GAME_FAIL,
    error: error
  }
}

export const createGame = ( gameInfo ) => {
  return ( dispatch ) => {
    dispatch( startCreateGame() )
    setTimeout( () => { dispatch( startGameSuccess() ) }, 4000 )
  }
}