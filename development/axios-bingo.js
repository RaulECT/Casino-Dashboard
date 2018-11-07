import axios from 'axios'

const instance = axios.create( {
  baseURL: 'http://104.192.4.252:3002/loteriabingo/api',
  validateStatus: function (status) {
    return status <= 500; // Reject only if the status code is greater than or equal to 500
  },
  headers:{ token: localStorage.token ? localStorage.token : null }
} )

export default instance