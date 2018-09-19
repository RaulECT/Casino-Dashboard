import { AUTH_FAIL, AUTH_START, AUTH_LOGOUT, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from './actions'

export const authsStart = () => {
  return {
    type: AUTH_START
  }
}

export const authSuccess = ( token, userName ) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userName: userName
  }
}

export const authFail = ( error ) => {
  return {
    type: AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: AUTH_LOGOUT
  }
}

export const auth = ( email, password ) => {
  return dispatch => {
    dispatch( authsStart )
    if ( email === 'a@b.com' && password === '123' ) {
      dispatch( authSuccess( 'FAKE_TOKEN', email ) )
    } else {
      dispatch( authFail( { error: 'WRONG_CREDENTIALS' } ) )
    }
  }
}

export const setAuthRedirectPath = ( path ) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path
  }
}