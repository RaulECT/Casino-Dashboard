import axios from 'axios'
import { log } from 'util';

class Api {
  constructor() {
    this.apiURL = 'http://springlabsdevs.online/casinos/api'
    this.appType = 'adminModule'
    this.appID = 'A2'
    this.deviceID = 'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
  
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsIm5hbWUiOiJhZG1pbjEgYWRtaW4xIGFkbWluMSIsInBlcm1pc3Npb25zIjp7ImFkbWluTW9kdWxlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJCYWxhbmNlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJzIjp0cnVlLCJjcmVhdGVDdXN0b21lcnMiOnRydWUsImVkaXRDYXJkSWQiOnRydWUsImVkaXRDdXN0b21lcnMiOnRydWUsInBpdGJvc3NNb2R1bGUiOnRydWUsInJlY2VwdGlvbiI6dHJ1ZSwidGFibGVHYW1lIjp0cnVlLCJ0aWxsIjp0cnVlfSwiYXBwSWQiOiJBMiIsImlhdCI6MTUyNzAwMDA1NCwiZXhwIjoxNTI3MDI4ODU0fQ.76rp7RZRyr9u7lhqrvpChKfcRjTo7e62Tdz2bSRvKTU'
  
    this.createUser = this.createUser.bind( this )
  }

  getRoles() {
    return axios.get( `${this.apiURL}/admin/get_roles`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getUserByName( name ) {

    return axios.get( `${this.apiURL}/admin/users_by_name?partName=${name}`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  createUser( userInfo ) {
    userInfo.appId = this.appID
    
    return axios.post( `${this.apiURL}/admin/create_user_tmp`, userInfo, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  deleteUser( userId ) {

    return axios.post( `${this.apiURL}/admin/deactive_user`, {
      appId: this.appID,
      userId: userId
    }, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )

    console.log( req )
  }

}

module.exports = Api