import {
  CREATE_CARDBOARD_SUCCESS,
  CREATE_CARDBOARD_START,
  CREATE_CARDBOARD_FAIL,
  SEARCH_CARDBOARD_START,
  SEARCH_CARDBOARD_SUCCESS,
  SEARCH_CARDBOARD_FAIL,
  GET_CARDBOARDS_TOTAL_FAIL,
  GET_CARDBOARDS_TOTAL_START,
  GET_CARDBOARDS_TOTAL_SUCCESS
} from './actions'
import axios from '../../../axios-bingo'
import { notification } from 'antd'

/**
 * MARK: - CREATE CARDBOARDS ACTIONS
 */

export const createCardboardStart = () => {
  return {
    type: CREATE_CARDBOARD_START
  }
}

export const createCardboardSuccess = () => {
  openNotification( 'success', 'Se ha creado con éxito el cartón', 'El cartón se ha creado con éxito.' )

  return {
    type: CREATE_CARDBOARD_SUCCESS
  }
}

export const createCardboardFail = ( error ) => {
  openNotification( 'error', `No se ha podido completar la operación', 'Ha ocurrido un error y no se ha podido completar la operación. Error: ${error}` )

  return {
    type: CREATE_CARDBOARD_FAIL,
    error: error
  }
}

export const createCardboard = ( cardboardType ) => {
  return dispatch => {
    dispatch( createCardboardStart() )

    axios.post( '/cardboards/create', {
      type: cardboardType
    } )
    .then( response => {
      console.log( response )

      if ( response.status === 200 ) {
        dispatch( createCardboardSuccess() )
        dispatch( getCardboardsTotal() )
      } else {
        dispatch( createCardboardFail( response.data.error ) )
      }
    } )
    .catch( err => {
      console.log( err )
      dispatch( createCardboardFail( err ) )
    } )
  }
}

/**
 * MARK: - SEARCH CARDBOARD ACTIONS
 */

export const searchCardboardStart = () => {
  return {
    type: SEARCH_CARDBOARD_START
  }
}

export const searchCardboardSuccess = ( cardboard ) => {
  return {
    type: SEARCH_CARDBOARD_SUCCESS,
    cardboard: cardboard
  }
}

export const searchCardboardFail = ( error ) => {
  openNotification( 'error', 'Ha ocurrido un error.', `No se puedo completar la operación. Error: ${error}`  )

  return {
    type: SEARCH_CARDBOARD_FAIL,
    error: error
  }
}

export const searchCardboard = ( cardboardId ) => {
  return dispatch => {
    dispatch( searchCardboardStart() )

    axios.post( '/cardboards/get', {
      numcode: parseInt( cardboardId )
    } )
    .then( response => {
      console.log( response )

      if ( response.status === 200 ) {
        
        if ( response.data.result.totalFound !== 0 ) {
          dispatch( searchCardboardSuccess( response.data.result.items[0] ) )  
        } else {
          dispatch( searchCardboardFail( `El carton con folio ${cardboardId} NO existe.` ) )
        }
      } else {
        console.log( response.data )
        dispatch( searchCardboardFail( response.data.error ) )
      }
    } )
    .catch( err => {
      dispatch( searchCardboardFail( err ) )
    } )
  }
}

/**
 * MARK: - GET CARDBOARDS TOTAL
 */

export const getCardboardsTotalStart = () => {
  return {
    type: GET_CARDBOARDS_TOTAL_START
  }
}

export const getCardboardsTotalSuccess = ( cardboardsTotal ) => {
  return {
    type: GET_CARDBOARDS_TOTAL_SUCCESS,
    cardboardsTotal: cardboardsTotal
  }
}

export const getCardboardsTotalFail = ( error ) => {
  return {
    type: GET_CARDBOARDS_TOTAL_FAIL,
    error: error
  }
}

export const getCardboardsTotal = () => {
  return dispatch => {
    dispatch( getCardboardsTotalStart() )

    axios.post( '/cardboards/get' )
    .then( response => {
      console.log( response )
  
      if ( response.status === 200 ) {
        dispatch( getCardboardsTotalSuccess( response.data.result.totalFound ) )
      } else {
        dispatch( getCardboardsTotalFail( response.data.error ) )     
      }
  
    } )
    .catch( err => {
      console.log( err )
      dispatch( getCardboardsTotalFail( err ) )
    } )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}