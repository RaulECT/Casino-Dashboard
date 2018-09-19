import * as actionsTypes from '../actions/actions'

const initialState = {
  token: null,
  error: null,
  loading: false,
  userName: null
}

const reducer = ( state = initialState, action ) => {
  const { AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_FAIL } = actionsTypes

  switch ( action.type ) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      }

    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
        userName: action.userName
      }

      case AUTH_LOGOUT:
        return {
          ...state,
          token: null,
          userName: null
        }

      case AUTH_FAIL:
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