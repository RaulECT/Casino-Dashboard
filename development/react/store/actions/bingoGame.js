import { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME, ADD_CARDBOARD, SET_GAME_HISTORY, SET_GAME } from './actions'
import { startGame } from './gameManagment'
import { logout } from './auth'
import axios from '../../../axios-bingo'
import moment from 'moment'
import { notification } from 'antd'
import { socket } from '../../../socket';

export const changeCard = ( card, cardList ) => {
  return {
    type: CHANGE_CARD,
    card: card,
    cardList: cardList
  }
}

export const setCurrentGame = ( game ) => {
  
  return {
    type: GET_CURRENT_GAME_SUCCESS,
    game: game,
    loading: false
  }
}

export const getCurrentGameStart = () => {
  return {
    type: GET_CURRENT_GAME
  }
}

export const getCurrentGameFail = ( error ) => {
  openNotification( 'error', 'Error en obtener siguiente juego', `Ha ocurrido un error, favor de intentar de nuevo. Error: ${error.error ? error.error : error}` )

  return {
    type: GET_CURRENT_GAME_FAIL,
    error: error
  }
}

export const loadCurrentGame = ( push ) => {
  return dispatch => {
    dispatch( getCurrentGameStart() )

    axios.post( '/games/get', {} )
      .then( response => {
        
        if ( response.status === 200 ) {  
          //const game = getNextGame( response.data.result.items )
          let game = response.data.result.items[0]
          if (game.endedOn){ game = null }

          dispatch( setCurrentGame( game ) )
        } else if( response.data.error === 'InvalidToken' ) {
          dispatch( logout( push ) )
        } else {   
          dispatch( getCurrentGameFail( response.data ) )
        }
        
      } )
      .catch( err => {
        console.log( err )
        dispatch( getCurrentGameFail( err ) )
      } )
  }
}

export const resetGame = () => {
  return {
    type: RESTART_GAME
  }
}

const getNextGame = ( games ) => {
  const currentDate = moment()
  let game = null

  for (let index = 0; index < games.length; index++) {
    if ( games[index].gameDate !== undefined && currentDate.isBefore( games[index].gameDate ) && games[index].active === true ) {
      game = games[index]
      game['index'] = index + 1
      break
    }
  }

  return game
}

export const addCardboardToGame = ( cardboard ) => {
  return {
    type: ADD_CARDBOARD,
    cardboard: cardboard
  }
}

export const addCardboard = ( cardboard, cardboardList ) => {
  return dispatch => {
    axios.post( '/cardboards/get', {
      numcode: parseInt( cardboard )
    } )
    .then( response => {
      console.log( response )
      if ( response.status === 200 ) {
        if ( response.data.result.totalFound !== 0 ) {
          if ( cardboardList.indexOf( parseInt( cardboard ) ) === -1 ) {
          
            socket.emit( 'REGISTER_CARDBOARD_RQ', { numcode: response.data.result.items[0].numcode, type: response.data.result.items[0].type } )
            dispatch( addCardboardToGame( cardboard ) ) 
          } else {
           openNotification( 'warning', 'No se ha podido agregar el cartón', 'Ya se ha a gregado este cartón a la partida.' ) 
          }
        } else {
          openNotification( 'warning', 'No se ha podido agregar el cartón', 'Verifique que el carton que acaba de ingresar este registrado' )
        }
        
      } else {
        openNotification( 'warning', 'No se ha podido agregar el cartón', 'Verifique que el carton que acaba de ingresar este registrado' )
      }
    } )
    .catch( err => {
      console.log( err )
      openNotification( 'error', 'Ha ocurrido un error agregando el carton', 'No se ha podido agregar el carton, por favor vuelva a intentar.' )
    } )
  }
}

export const setGameHistory = ( gamehistory ) => {
  return {
    type: SET_GAME_HISTORY,
    gameHistory: gamehistory
  }
}

export const setGameData = ( cardboards, game ) => {
  return {
    type: SET_GAME,
    cardboardList: cardboards,
    game: game
  }
}

export const setGame = ( cardboards, game ) => {
  return dispatch => {
    dispatch( setGameData( cardboards, game ) )
    dispatch( startGame() )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}