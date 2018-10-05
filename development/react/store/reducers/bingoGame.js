import * as actionsTypes from '../actions/actions'

import { cardList } from './cards'

const initialState = {
  currentCard: null,
  playerWin: false,
  cardsList: cardList,
  currentGame: null,
  loading: false,
  error: null,
  cardboardList: [],
  history: []
}

const reducer = ( state = initialState, action )=> {
  const { CHANGE_CARD, GET_CURRENT_GAME, GET_CURRENT_GAME_SUCCESS, GET_CURRENT_GAME_FAIL, RESTART_GAME, ADD_CARDBOARD, SET_GAME_HISTORY } = actionsTypes

  switch ( action.type ) {
    case CHANGE_CARD:
      return {
        ...state,
        currentCard: action.card,
        cardsList: action.cardList,
        history: state.history.concat( parseInt(action.card.num) )
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
        error: null,
        cardboardList: [],
        history: []
      }

    case ADD_CARDBOARD:
      return {
        ...state,
        cardboardList: state.cardboardList.concat( parseInt(action.cardboard) )
      }

    case SET_GAME_HISTORY:
      return {
        ...state,
        history: action.gameHistory
      }

    default:
      return state
  }
}

export default reducer