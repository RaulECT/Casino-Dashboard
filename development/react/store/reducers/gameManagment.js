import * as actionsTypes from '../actions/actions'

const initialState = {
  isGameStart: false,
  turn: 0,
}

const reducer = ( state = initialState, action ) => {
  const { START_GAME, END_GAME, INCREMENT_TURN } = actionsTypes

  switch ( action.type ) {
    case START_GAME:
      return {
        ...state,
        isGameStart: true,
        turn: 1
      }

    case END_GAME:
      return {
        ...state,
        isGameStart: false,
        turn: 0
      }

    case INCREMENT_TURN:
      return {
        ...state,
        turn: state.turn + 1
      }
  
    default:
      return state
  }
}

export default reducer