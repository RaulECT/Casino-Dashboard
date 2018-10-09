import { AUTH_FAIL, AUTH_START, AUTH_LOGOUT, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from './actions'
import axios from '../../../axios-bingo'

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
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: AUTH_LOGOUT
  }
}

export const auth = ( email, password ) => {
  return dispatch => {
    dispatch( authsStart )

    axios.post( '/login', {
      username: email,
      password: password
    } )
    .then( response => {
     
      if ( response.status !== 404 ) {
        localStorage.setItem( 'token', response.data.result.token )
        localStorage.setItem( 'user', email )
        localStorage.setItem( 'permissions', response.data.permissions )

        dispatch( authSuccess( response.data.result.token, email ) )

        location.reload()
      } else {
        dispatch( authFail( response.data ) )
      }
    } )
    .catch( err => {
      console.log(err)
      dispatch( authFail( err ) )
    } )
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