import * as actionsTypes from '../actions/actions'

const initalState = {
  error: null,
  loading: false
}

const reducer = ( state = initalState, action ) => {
  const { CREATE_CASINO_START, CREATE_CASINO_FAIL, CREATE_CASINO_SUCCESS } = actionsTypes

  switch ( action ) {
    case CREATE_CASINO_START:
      return {
        ...state,
        error: null,
        loading: true
      }
      
    case CREATE_CASINO_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      }

    case CREATE_CASINO_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
  
    default:
      return state
  }
}

export default reducer