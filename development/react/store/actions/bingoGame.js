import { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME, ADD_CARDBOARD, SET_GAME_HISTORY } from './actions'
import axios from '../../../axios-bingo'
import moment from 'moment'
import { notification } from 'antd'

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

export const loadCurrentGame = () => {
  return dispatch => {
    dispatch( getCurrentGameStart() )

    axios.post( '/games/get', {} )
      .then( response => {
        
        if ( response.status === 200 ) {  
          //const game = getNextGame( response.data.result.items )
          const game = response.data.result.items[0]

          dispatch( setCurrentGame( game ) )
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

export const addCardboard = ( cardboard ) => {
  return {
    type: ADD_CARDBOARD,
    cardboard: cardboard
  }
}

export const setGameHistory = ( gamehistory ) => {
  return {
    type: SET_GAME_HISTORY,
    gameHistory: gamehistory
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}
