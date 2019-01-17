import {
  CREATE_CASINO_START,
  CREATE_CASINO_SUCCESS,
  CREATE_CASINO_FAIL,
  GET_ALL_CASINOS_START,
  GET_ALL_CASINOS_SUCCESS,
  GET_ALL_CASINOS_FAIL
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

      if ( response.status === 200 ) {
        dispatch( createCasinoSuccess() )

        openNotification( 'success', 'Se ha creado el casino', `El casino ${name} se ha creado con éxito` )
      } else {
        console.log( response.data )

        openNotification( 'error', 'Ha ocurrido un error', `No se ha podido crear el casino, ha ocurrido un error. Error: ${response.data.error}` )
        dispatch( createCaisnoFail( response.data.error ) )
      }
    } )
    .catch( err => {
      console.log(err)
      openNotification( 'error', 'Ha ocurrido un error', `No se ha podido crear el casino, ha ocurrido un error. Error: ${err}` )
    } )
  }
}

// MARK: GET ALL CASINOS ACTIONS
export const getAllCasinosStart = () => {
  return {
    type: GET_ALL_CASINOS_START
  }
}

export const getAllCasinosSuccess = casinos => {
  return {
    type: GET_ALL_CASINOS_SUCCESS,
    casinos: casinos
  }
}

export const getAllCasinosFail = error => {
  return {
    type: GET_ALL_CASINOS_FAIL,
    error
  }
}

export const getAllCasinos = () => {
  return dispatch => {
    dispatch( getAllCasinosStart() )

    axios.post( '/casinos/get', {} )
      .then( response => {
        console.log( response )
        if ( response.status === 200 ) {
          dispatch( getAllCasinosSuccess( response.data.result.items ) )
        } else {
          dispatch( getAllCasinosFail( response.data.error ) )
          openNotification( 'error', 'Error en obtener casinos', `Ha ocurrido un error y no se ha podido listar los casinos. Error: ${response.data.error}` )
        }
      } )
      .catch( err => {
        console.log( err )
        dispatch( getAllCasinosFail( err ) )
        openNotification( 'error', 'Error en obtener casinos', `Ha ocurrido un error y no se ha podido listar los casinos. Error: ${err}` )
      } )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]( {
    message: title,
    description: description
  } )
}