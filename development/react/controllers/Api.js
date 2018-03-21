import axios from 'axios'

class Api {

  constructor() {
    this.apiURL = 'http://springlabsdevs.online/casinos/api'
    this.appType = 'adminModule'
    this.appID = 'A2'
    this.deviceID = 'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
  
    this.config = {}
    this.getConfiguration()
    
  }

   getConfiguration() {
    return axios.get( `${this.apiURL}/config/adminModule` )
      
  }

  getChips() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          resolve( response.data.result.chips )
        } else {
          reject( { success: false, message: 'No se pudo completar la operación.' } )
        }
      } )
      .catch( err => {
        reject( err )
      } )
    } )
  }

  passwordLogin( user, password ) {
    return axios.post( `${this.apiURL}/password_login`, {
      username: user,
      password: password,
      appType: this.appType,
      appId: this.appID,
      deviceId: this.deviceID
    }, 
    {
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }



}

module.exports = Api