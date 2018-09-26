import { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME } from './actions'

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
    game: game
  }
}

export const getCurrentGameStart = () => {
  return {
    type: GET_CURRENT_GAME
  }
}

export const getCurrentGameFail = ( error ) => {
  return {
    type: GET_CURRENT_GAME_FAIL,
    error: error
  }
}

export const loadCurrentGame = () => {
  return dispatch => {
    dispatch( getCurrentGameStart() )
    setTimeout( () => {
      const fakeGame = {
        name: 'doble linea',
        id: '15319',
        order: '32',
        linePrice: '189',
        bingoPrice: '852',
        jackPotPrice: '3,764'
      }

      dispatch( setCurrentGame( fakeGame ) )
    }, 6000 )
  }
}

export const resetGame = () => {
  return {
    type: RESTART_GAME
  }
}