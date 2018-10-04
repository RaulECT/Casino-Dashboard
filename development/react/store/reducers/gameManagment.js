import * as actionsTypes from '../actions/actions'

const initialState = {
  isGameStart: false,
  turn: 0,
  error: null,
  loading: false
}

const reducer = ( state = initialState, action ) => {
  const { START_GAME, END_GAME, INCREMENT_TURN, CREATE_GAME_START, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL } = actionsTypes

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
        turn: 0,
        error: null,
        loading: false
      }

    case INCREMENT_TURN:
      return {
        ...state,
        turn: state.turn + 1
      }

    case CREATE_GAME_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
  
    case CREATE_GAME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case CREATE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }

    default:
      return state
  }
}

export default reducer