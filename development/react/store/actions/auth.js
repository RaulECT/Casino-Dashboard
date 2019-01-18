import { AUTH_FAIL, AUTH_START, AUTH_LOGOUT, AUTH_SUCCESS, SET_AUTH_REDIRECT_PATH } from './actions'
import axios from '../../../axios-bingo'
import React from 'react'
import {Redirect} from 'react-router-dom'

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

export const logout = ( push ) => {

  return dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    //return <Redirect to="/login" />
    push( '/' )
    location.reload()
    // return {
    //   type: AUTH_LOGOUT
    // }
  }

}

export const auth = ( email, password ) => {
  return dispatch => {
    dispatch( authsStart() )

    axios.post( '/login', {
      username: email,
      password: password
    } )
    .then( response => {
     
      if ( response.status === 200 ) {
        const perm = {
          users: [ 'createUsers' ],
          games: [ 'createGame', 'manageGame' ],
          cardboards: [ 'createCardboard', 'printCardboard' ],
          casinos: [ 'create' ]
        }

        // localStorage.setItem( 'casinoId', Math.floor( Math.random() * 3000 ) + 1000 )
        localStorage.setItem( 'casinoId', response.data.result.casinoId )
        localStorage.setItem( 'token', response.data.result.token )
        localStorage.setItem( 'user', email )
        localStorage.setItem( 'permissions', JSON.stringify(response.data.result.permissions) )
        // localStorage.setItem( 'permissions', JSON.stringify( perm ) )

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
      //dispatch( logout() )
    } else {
      dispatch( authSuccess( token, user ) )
    }

  }
}