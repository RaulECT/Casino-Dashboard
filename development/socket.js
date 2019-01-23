import openSocket from 'socket.io-client'
import { SOCKET_DEV_URL, SOCKET_PRODUCTION_URL, SOCKET_TIMEOUT } from '../config/config'
/**
 * CHANGE ON PRODUCTION SERVER
 */
const socketURL = SOCKET_DEV_URL
const casinoId = localStorage.getItem( 'casinoId' )

export const socket = openSocket( socketURL,{ timeout: SOCKET_TIMEOUT, query: { casinoId } } )

export const openConnection = () => {
  return openSocket( socketURL,{ timeout: SOCKET_TIMEOUT, query: { casinoId } } )
}