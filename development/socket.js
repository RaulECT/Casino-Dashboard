import openSocket from 'socket.io-client'

/**
 * CHANGE ON PRODUCTION SERVER
 */
const socketURL = 'http://localhost:3000' // DEVELOPMENT
//const socketURL = 'http://104.192.4.252:3000' // PRODUCTION

export const socket = openSocket( socketURL )