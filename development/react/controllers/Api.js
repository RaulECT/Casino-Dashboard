import axios from 'axios'
import res from './test_data'

class Api {

  constructor() {
    this.apiURL = 'http://springlabsdevs.online/casinos/api'
    this.appType = 'adminModule'
    this.appID = 'A0'
    this.deviceID = 'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
  
    //this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsIm5hbWUiOiJhZG1pbjEgYWRtaW4xIGFkbWluMSIsInBlcm1pc3Npb25zIjp7ImFkbWluTW9kdWxlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJCYWxhbmNlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJzIjp0cnVlLCJjcmVhdGVDdXN0b21lcnMiOnRydWUsImVkaXRDYXJkSWQiOnRydWUsImVkaXRDdXN0b21lcnMiOnRydWUsInBpdGJvc3NNb2R1bGUiOnRydWUsInJlY2VwdGlvbiI6dHJ1ZSwidGFibGVHYW1lIjp0cnVlLCJ0aWxsIjp0cnVlfSwiYXBwSWQiOiJBMiIsImlhdCI6MTUyMTkyNDUzNCwiZXhwIjoxNTIxOTUzMzM0fQ.WZ3qkm-6tMepxWsuKnfE4nt_wkFiFDD9f5mXgElKACI'
    this.token = localStorage.token ? localStorage.token : ''
    this.config = {}
    this.getConfiguration()
    
    this.createPromo = this.createPromo.bind( this )
    this.editPromo = this.editPromo.bind( this )  
    this.createUser = this.createUser.bind( this )
  }

   getConfiguration() {
    return axios.get( `${this.apiURL}/config/adminModule` )
      
  }

  getLogo() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          resolve( response.data.result.logo )
        } else {
          reject( { success: false, message: 'No se pudo completar la operación.' } )
        }
      } )
      .catch( err => {
        reject( err )
      } )
    } )
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

  getScheduleValues() {
    return new Promise( ( resolve, reject ) => {
      this.getConfiguration()
      .then( response => {
        if ( response.data.success ) {
          const data = { 
            beginWorkingDay: response.data.result.beginWorkingDay,
            endWorkingDay: response.data.result.endWorkingDay,
            intervalMinutesSchedules: response.data.result.intervalMinutesSchedules,
            intervalMinutesScores: response.data.result.intervalMinutesScores
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

  getRoles() {
    return axios.get( `${this.apiURL}/admin/get_roles`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
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

  createRol( rolName, permissions) {
    return axios.post( `${this.apiURL}/admin/create_rol`, {
      name: rolName,
      permissions: permissions
    }, {
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

  updateMembershipValues( values ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      cardReposition: (values.cardReposition*100),
      membershipPayment: (values.membershipPayment*100)

    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  editRol( id, name, permissions ) {
   return axios.post( `${this.apiURL}/admin/edit_rol`, {
    id: id,
    name: name,
    permissions: permissions
   }, {
    headers: {token: this.token},
    validateStatus: function (status) {
      return status < 500; // Reject only if the status code is greater than or equal to 500
    }
   } ) 
  }

  createUser( userInfo ) {
    userInfo.appId = this.appID

    return axios.post( `${this.apiURL}/admin/create_user`, userInfo, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  setScheduleValues( values ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      beginWorkingDay: values.beginWorkingDay,
      endWorkingDay: values.endWorkingDay,
      intervalMinutesSchedules: values.intervalMinutesSchedules,
      intervalMinutesScores: values.intervalMinutesScores
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

  fingerprintLogin( fingerprint ) {
    return axios.post( `${this.apiURL}/fingerprint_login`, {
      fingerprint,
      appType: this.appType,
      appId: this.appID,
      deviceId: this.deviceID
    }, {
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getProms() {
    return axios.post( `${this.apiURL}/admin/get_promos`,{}, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  createPromo( data ) {
    const { amount, description, name, timeLimit, type, valueMax, valueMin } = data

    return axios.post( `${this.apiURL}/admin/create_promo`, {
      appId: this.appID,
      amount,
      description,
      name,
      timeLimit,
      type,
      valueMax,
      valueMin,
      customers: []
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  deactivePromo( promoId ) {
    return axios.post( `${this.apiURL}/admin/edit_promo`, {
      appId: this.appID,
      promoId: promoId,
      active: false
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  editPromo( promo ) {
    const { amount, description, name, promoId, timeLimit, type, valueMax, valueMin } = promo
    
    return axios.post( `${this.apiURL}/admin/edit_promo`,{
      appId: this.appID,
      amount: amount,
      description: description,
      name: name,
      promoId: promoId,
      timeLimit: timeLimit,
      type: type,
      valueMax: valueMax,
      valueMin: valueMin
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getClientByName( name ) {
    return axios.get( `${this.apiURL}/reception/customers_by_name?partName=${name}&sliceSize=10&sliceNumber=1`, {
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
  }

  getTillLog() {
    return axios.get( `${this.apiURL}/admin/get_till_log`,{
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }
  
  getNumberCustomersByRangeDate( startDate, endDate ) {
    return axios.post( `${this.apiURL}/admin/number_customers_by_day`, {
      startDate: startDate,
      endDate: endDate
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getNumberCustomersByDay(startDate, endDate) {
    return axios.post( `${this.apiURL}/admin/number_customers_by_day`, {
      startDate,
      endDate
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getScoresByDates() {
    // TODO: REPLACE WITH API
    return new Promise( ( resolve, reject ) => {
      resolve( res )
    } )
  }

  getScoresByDate() {
    // TODO: REPLACE WITH API
   return new Promise( ( resolve, reject ) => {
    resolve( {
      status: 200,
      data: {
        "result": {
          "items": [
              {
                  "tableId": "M1",
                  "scores": [
                      {
                          "amount": 4706500,
                          "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                          "gameName": "Black Jack",
                          "players": 3,
                          "tableId": "M1",
                          "time": "16:00"
                      },
                      {
                          "amount": 9702500,
                          "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                          "gameName": "Black Jack",
                          "players": 3,
                          "tableId": "M1",
                          "time": "17:00"
                      },
                      {
                          "amount": 1002500,
                          "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                          "gameName": "Black Jack",
                          "players": 4,
                          "tableId": "M1",
                          "time": "18:00"
                      },
                      {
                        "amount": 9865465,
                        "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                        "gameName": "Black Jack",
                        "players": 4,
                        "tableId": "M1",
                        "time": "19:00"
                    }
                  ]
              },
              {
                  "tableId": "M2",
                  "scores": [
                      {
                        "amount": 1002500,
                        "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                        "gameName": "Black Jack",
                        "players": 4,
                        "tableId": "M2",
                        "time": "15:00"
                      },
                      {
                          "amount": 4205000,
                          "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                          "gameName": "Black Jack",
                          "players": 5,
                          "tableId": "M2",
                          "time": "16:00"
                      },
                      {
                        "amount": 4605000,
                        "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                        "gameName": "Black Jack",
                        "players": 5,
                        "tableId": "M2",
                        "time": "17:00"
                      },
                      {
                          "amount": 9000000,
                          "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                          "gameName": "Black Jack",
                          "players": 2,
                          "tableId": "M2",
                          "time": "19:00"
                      },
                      {
                        "amount": 8605000,
                        "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                        "gameName": "Black Jack",
                        "players": 5,
                        "tableId": "M2",
                        "time": "20:00"
                      }
              ]
            },
            {
              "tableId": "M3",
              "scores": [
                  {
                    "amount": 102500,
                    "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                    "gameName": "Black Jack",
                    "players": 4,
                    "tableId": "M2",
                    "time": "15:00"
                  },
                  {
                      "amount": 7205000,
                      "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                      "gameName": "Black Jack",
                      "players": 5,
                      "tableId": "M2",
                      "time": "16:00"
                  },
                  {
                    "amount": 8605000,
                    "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                    "gameName": "Black Jack",
                    "players": 5,
                    "tableId": "M2",
                    "time": "17:00"
                  },
                  {
                      "amount": 4000000,
                      "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                      "gameName": "Black Jack",
                      "players": 2,
                      "tableId": "M2",
                      "time": "19:00"
                  },
                  {
                    "amount": 4605000,
                    "gameId": "770206db-4420-5c34-a438-25bddffaf5ca",
                    "gameName": "Black Jack",
                    "players": 5,
                    "tableId": "M2",
                    "time": "20:00"
                  }
              ]
            }
          ]
        }
      }
    } )
   } ) 
  }

  editUser( userInfo ) {
    userInfo.appId = this.appID

    return axios.post( `${this.apiURL}/admin/edit_user`, userInfo, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  getEmailsList() {
    return axios.post( `${this.apiURL}/admin/get_email_list`, {
      pageNumber: 1,
      pageSize: 10
    }, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  createEmailList( emailList ) {
    return axios.post( `${this.apiURL}/admin/create_email_list`, emailList, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  configEmailList( emailConfig ) {
    return axios.post( `${this.apiURL}/admin/new_email`, emailConfig, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

}

module.exports = Api