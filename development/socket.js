import openSocket from 'socket.io-client'

/**
 * CHANGE ON PRODUCTION SERVER
 */
const socketURL = 'http://localhost:3000' // DEVELOPMENT
//const socketURL = 'PRODUCTION_URL' // PRODUCTION

export const socket = openSocket( socketURL )