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
    // TODO: REPLACE WITH API
    if ( email === 'a@b.com' && password === '123' ) {
      localStorage.setItem('token', 'FAKE_TOKEN')
      localStorage.setItem('user', email)
      
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

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if ( !token && !user ) {
      dispatch( logout() )
    } else {
      dispatch( authSuccess( token, user ) )
    }

  }
}