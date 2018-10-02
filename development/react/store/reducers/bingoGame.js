import * as actionsTypes from '../actions/actions'

import { cardList } from './cards'

const initialState = {
  currentCard: null,
  playerWin: false,
  cardsList: cardList,
  currentGame: null,
  loading: false,
  error: null
}

const reducer = ( state = initialState, action )=> {
  const { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME } = actionsTypes

  switch ( action.type ) {
    case CHANGE_CARD:
      return {
        ...state,
        currentCard: action.card,
        cardsList: action.cardList
      }
    
    case GET_CURRENT_GAME:
      return {
        ...state,
        error: null,
        loading: true
      }

    case GET_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        currentGame: action.game
      }
    
    case GET_CURRENT_GAME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case RESTART_GAME:
      return {
        currentCard: null,
        playerWin: false,
        cardsList: cardList,
        currentGame: null,
        loading: false,
        error: null
      }

    default:
      return state
  }
}

export default reducer