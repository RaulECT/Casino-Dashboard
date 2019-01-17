import * as actionsTypes from '../actions/actions'

const initalState = {
  error: null,
  loading: false,
  casinos: []
}

const reducer = ( state = initalState, action ) => {
  const { 
    CREATE_CASINO_START, 
    CREATE_CASINO_FAIL, 
    CREATE_CASINO_SUCCESS, 
    GET_ALL_CASINOS_START, 
    GET_ALL_CASINOS_SUCCESS, 
    GET_ALL_CASINOS_FAIL 
  } = actionsTypes

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

    case GET_ALL_CASINOS_START: 
      return {
        ...state,
        error: null,
        loading: true
      }
    

    case GET_ALL_CASINOS_SUCCESS: 
      return {
        ...state,
        loading: false,
        casinos: action.casinos
      }
    

    case GET_ALL_CASINOS_FAIL: 
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