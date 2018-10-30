import * as actionsTypes from '../actions/actions'

const initialState = {
  loading: false,
  error: null
}

const reducer = ( state = initialState, action ) => {
  const { CREATE_CARDBOARD_START, CREATE_CARDBOARD_SUCCESS, CREATE_CARDBOARD_FAIL } = actionsTypes

  switch ( action.type ) {
    case CREATE_CARDBOARD_START:
      return {
        ...state,
        loading: true,
        error: null
      }

    case CREATE_CARDBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      }

    case CREATE_CARDBOARD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
  
    default:
      return state
  }
}

export default reducer