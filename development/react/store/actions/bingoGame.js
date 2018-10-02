import { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME } from './actions'
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
    /*setTimeout( () => {
      const fakeGame = {
        name: 'doble linea',
        id: '15319',
        order: '32',
        linePrice: '189',
        bingoPrice: '852',
        jackPotPrice: '3,764'
      }

      dispatch( setCurrentGame( fakeGame ) )
    }, 6000 )*/

    axios.post( '/games/get', {} )
      .then( response => {
        console.log( response )
        if ( response.status === 200 ) {
          const game = getNextGame( response.data.result.items )
          
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
  //console.log('Current date:', currentDate)
  for (let index = 0; index < games.length; index++) {
    console.log( `No. ${index}, Before: ${currentDate.isBefore( games[index].gameDate )}, After: ${currentDate.isAfter( games[index].gameDate )}` )
    if ( games[index].gameDate !== undefined && currentDate.isBefore( games[index].gameDate ) ) {
      game = games[index]
      break
    }
  }

  return game
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}