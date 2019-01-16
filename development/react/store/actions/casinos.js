import {
  CREATE_CASINO_START,
  CREATE_CASINO_SUCCESS,
  CREATE_CASINO_FAIL,
} from './actions'
import axios from '../../../axios-bingo'
import { notification } from 'antd'

// MARK: CREATE CASINOS ACTIONS

export const createCasionStart = () => {
  return {
    type: CREATE_CASINO_START
  }
}

export const createCasinoSuccess = () => {
  return {
    type: CREATE_CASINO_SUCCESS
  }
}

export const createCaisnoFail = ( error ) => {
  return {
    type: CREATE_CASINO_FAIL,
    error: error
  }
}

export const createCasino = ( { name, address, phone } ) => {
  return dispatch => {
    dispatch( createCasionStart() )

    axios.post( '/casinos/create', {
      name,
      address,
      phone
    } )
    .then( response => {
      console.log( response )

      if ( response === 200 ) {
        dispatch( createCasinoSuccess() )
      } else {
        console.log( response.data )
        dispatch( createCaisnoFail( response.data.error ) )
      }
    } )
    .catch( err => {
      console.log(err)
    } )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]( {
    message: title,
    description: description
  } )
}