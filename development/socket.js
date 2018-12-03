import openSocket from 'socket.io-client'
import { SOCKET_DEV_URL, SOCKET_PRODUCTION_URL, SOCKET_TIMEOUT } from '../config/config'
/**
 * CHANGE ON PRODUCTION SERVER
 */
const socketURL = SOCKET_DEV_URL //SOCKET_PRODUCTION_URL

export const socket = openSocket( socketURL,{ timeout: SOCKET_TIMEOUT } )

export const openConnection = () => {
  return openSocket( socketURL )
}