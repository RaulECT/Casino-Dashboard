import { START_GAME, END_GAME, INCREMENT_TURN, CREATE_GAME_START, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL } from './actions'
import { socket } from '../../../socket'
import { changeCard, resetGame } from './bingoGame'
import {notification} from 'antd'
import axios from '../../../axios-bingo'

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
    dispatch( resetGame() )
  }
}

export const startCreateGame = () => {
  /*notification['success']({
    message: 'Crear Juego',
    description: 'Se ha creado el juego exitosamente'
  })*/

  return {
    type: CREATE_GAME_START
  }
}

export const startGameSuccess = ( onResetFields ) => {
  openNotification( 'success', 'Crear Juego', 'Description' )
  onResetFields()

  return {
    type: CREATE_GAME_SUCCESS
  }
}

export const startGameFail = ( error ) => {
  openNotification( 'error', 'Error en crear juego', `Ha ocurrido un error, favor de intentar de nuevo. Error: ${error.error ? error.error : error}` )

  return {
    type: CREATE_GAME_FAIL,
    error: error
  }
}

export const createGame = ( gameInfo, onResetFields ) => {
  const { doublePrice, electronicPrice, gameDate, gameName, lineConsPrize, linePattern, linePrize, lotteryConsoPrize, lotteryPattern, lotteryPrize, singlePrice, triplePrice } = gameInfo

  return ( dispatch ) => {
    const gameData = { doublePrice, electronicPrice, gameDate, gameName, lineConsPrize, linePattern, linePrize, lotteryConsoPrize, lotteryPattern, lotteryPrize, singlePrice, triplePrice }
    dispatch( startCreateGame() )
    
    axios.post( '/create', gameData )
      .then( response => {

        if ( response.status === 200 ) {
          dispatch( startGameSuccess( onResetFields ) )
        } else {
          console.log( response )
          dispatch( startGameFail( response.data ) )
        }

      } )
      .catch( err => {
        console.log(err)
        dispatch( startGameFail( err ) )
      } )
    
    //setTimeout( () => { dispatch( startGameSuccess() ) }, 4000 )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}