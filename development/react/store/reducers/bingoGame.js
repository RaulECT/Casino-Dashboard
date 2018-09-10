import * as actionsTypes from '../actions/actions'

import { cardList } from './cards'

const initialState = {
  currentCard: null,
  playerWin: false,
  cardsList: cardList
}

const reducer = ( state = initialState, action )=> {
  const { CHANGE_CARD } = actionsTypes

  switch ( action.type ) {
    case CHANGE_CARD:
      return {
        ...state,
        currentCard: action.card,
        cardsList: action.cardList
      }
  
    default:
      return state
  }
}

export default reducer