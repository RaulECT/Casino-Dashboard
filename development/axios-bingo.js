import axios from 'axios'
import { API_URL } from '../config'

const instance = axios.create( {
  baseURL: API_URL,
  validateStatus: function (status) {
    return status <= 500; // Reject only if the status code is greater than or equal to 500
  },
  headers:{ token: localStorage.token ? localStorage.token : null }
} )

export default instance