import * as actionsTypes from '../actions/actions'

const initialState = {
  isGameStart: false
}

const reducer = ( state = initialState, action ) => {
  const { START_GAME, END_GAME } = actionsTypes

  switch ( action.type ) {
    case START_GAME:
      return {
        ...state,
        isGameStart: true
      }

    case END_GAME:
      return {
        ...state,
        isGameStart: false
      }
  
    default:
      return state
  }
}

export default reducer