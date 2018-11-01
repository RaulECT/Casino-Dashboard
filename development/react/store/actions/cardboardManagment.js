import {
  CREATE_CARDBOARD_SUCCESS,
  CREATE_CARDBOARD_START,
  CREATE_CARDBOARD_FAIL,
  SEARCH_CARDBOARD_START,
  SEARCH_CARDBOARD_SUCCESS,
  SEARCH_CARDBOARD_FAIL,
  GET_CARDBOARDS_TOTAL_FAIL,
  GET_CARDBOARDS_TOTAL_START,
  GET_CARDBOARDS_TOTAL_SUCCESS,
  DELETE_CARDBOARD_FAIL,
  DELETE_CARDBOARD_START,
  DELETE_CARDBOARD_SUCCESS
} from './actions'
import axios from '../../../axios-bingo'
import Canvas from '../../components/Canvas/Canvas'
import { notification } from 'antd'
import React from 'react'

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

export const searchCardboardSuccess = ( cardboard, cardboardImg ) => {
  return {
    type: SEARCH_CARDBOARD_SUCCESS,
    cardboard: cardboard,
    cardboardImg: cardboardImg
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
          const cardboard = response.data.result.items[0]
          const cardboardImg = generateCardboardImage( cardboard.card, cardboard.id, cardboard.numcode )

          dispatch( searchCardboardSuccess( response.data.result.items[0], cardboardImg ) )  
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
    cardboardsTotal: cardboardsTotal,
  }
}

export const getCardboardsTotalFail = ( error ) => {
  openNotification( 'error', 'Ha ocurrido un error', `No se ha podido completar la operación. Error: ${error}` )

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

/**
 * MARK: -DELETE CARDBOARD ACTIONS
 */

export const deleteCardboardStart = () => {
  return {
    type: DELETE_CARDBOARD_START
  }
}

export const deleteCardboardFail = ( error ) => {
  openNotification( 'error', 'Ha ocurrido un error', `No se ha podido terminar la operación. Error: ${error}`)

  return {
    type: DELETE_CARDBOARD_FAIL,
    error: error
  }
}

export const deleteCardboardSuccess = () => {
  openNotification( 'success', 'Se ha borrado con éxito el cartón.' )

  return {
    type: DELETE_CARDBOARD_SUCCESS
  }
}

export const deleteCardboard = ( cardboardId ) => {
  return dispatch => {
    dispatch( deleteCardboardStart() )

    axios.post( '/cardboards/edit', {
      active: false,
      barcode: cardboardId,
      '..id': cardboardId
    } )
    .then( response => {
      console.log( response )

      if ( response.status === 200 ) {
        dispatch( deleteCardboardSuccess() )
      } else {
        dispatch( deleteCardboardFail( response.data.error ) )
      }
    } )
    .catch( err => {
      console.log( err )
      dispatch( deleteCardboardFail( err ) )
    } )
  }
}

const openNotification = ( type, title, description ) => {
  notification[type]({
    message: title,
    description: description
  })
}

const generateCardboardImage = ( cards, barcode, folio, key = 0 ) => {
  return <Canvas key={folio} card={cards} barcode={barcode} folio={folio} />
}