import axios from 'axios'

const instance = axios.create( {
  baseURL: 'http://74.208.210.201:3002/loteriabingo/api',
  validateStatus: function (status) {
    return status < 500; // Reject only if the status code is greater than or equal to 500
  }
} )

export default instance