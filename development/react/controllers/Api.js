import axios from 'axios'

class Api {

  constructor() {
    this.apiURL = 'http://springlabsdevs.online/casinos/api'
    this.appType = 'adminModule'
    this.appID = 'A2'
    this.deviceID = 'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
  
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsIm5hbWUiOiJhZG1pbjEgYWRtaW4xIGFkbWluMSIsInBlcm1pc3Npb25zIjp7ImFkbWluTW9kdWxlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJCYWxhbmNlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJzIjp0cnVlLCJjcmVhdGVDdXN0b21lcnMiOnRydWUsImVkaXRDYXJkSWQiOnRydWUsImVkaXRDdXN0b21lcnMiOnRydWUsInBpdGJvc3NNb2R1bGUiOnRydWUsInJlY2VwdGlvbiI6dHJ1ZSwidGFibGVHYW1lIjp0cnVlLCJ0aWxsIjp0cnVlfSwiYXBwSWQiOiJBMiIsImlhdCI6MTUyMTkyNDUzNCwiZXhwIjoxNTIxOTUzMzM0fQ.WZ3qkm-6tMepxWsuKnfE4nt_wkFiFDD9f5mXgElKACI'
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

  getFastAmountsValues() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          resolve( response.data.result.fastAmounts )
        } else {
          reject( { success: false, message: 'No se pudo completar la operación.' } )
        }
      } )
      .catch( err => {
        reject( err )
      } )
    } )
  }

  getExchangeValues() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          const data = { 
            valueUnitChip: response.data.result.valueUnitChip,
            exchangeRate: response.data.result.exchangeRate
          }
          resolve( data )
        } else {
          reject( { success: false, message: 'No se pudo completar la operación.' } )
        }
      } )
      .catch( err => {
        reject( err )
      } )
    } )
  }

  getMembershipValues() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          const data = { 
            cardReposition: response.data.result.cardReposition,
            membershipPayment: response.data.result.membershipPayment
          }
          resolve( data )
        } else {
          reject( { success: false, message: 'No se pudo completar la operación.' } )
        }
      } )
      .catch( err => {
        reject( err )
      } )
    } )
  }

  updateChipsValues( values ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      chips: values
    },
    {
      headers: { token: this.token}
    } )
  }

  updateFastAmounts( fastAmounts ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      fastAmounts: fastAmounts
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  updateExchangeValues( values ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      exchangeRate: values.exchangeValue,
      valueUnitChip: (values.chipValue*100)

    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
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