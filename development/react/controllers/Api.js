/**
 * Clase que representa a la conexión con la API
 * @namespace Api
 */
import axios from 'axios'
import fs from 'fs'
import res from './test_data'
import res_till from './till_fake'
import res_till_range from './till_range_fake'

class Api {

  /**
   * Crea la clase
   */
  constructor() {
    this.apiURL = 'http://springlabsdevs.online/casinos/api'
    this.appType = '' //'adminModule'
    this.appID = '' //'A0'
    this.deviceID = '' //'eyJQcm9jZXNzb3JJZCI6IkJGRUJGQkZGMDAwMzA2QTkiLCJNb3RoZXJCb2FyZElkIjoiQzlOMENKODU3NTkwMzczIn0='
  
    //this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluMSIsIm5hbWUiOiJhZG1pbjEgYWRtaW4xIGFkbWluMSIsInBlcm1pc3Npb25zIjp7ImFkbWluTW9kdWxlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJCYWxhbmNlIjp0cnVlLCJjb25zdWx0Q3VzdG9tZXJzIjp0cnVlLCJjcmVhdGVDdXN0b21lcnMiOnRydWUsImVkaXRDYXJkSWQiOnRydWUsImVkaXRDdXN0b21lcnMiOnRydWUsInBpdGJvc3NNb2R1bGUiOnRydWUsInJlY2VwdGlvbiI6dHJ1ZSwidGFibGVHYW1lIjp0cnVlLCJ0aWxsIjp0cnVlfSwiYXBwSWQiOiJBMiIsImlhdCI6MTUyMTkyNDUzNCwiZXhwIjoxNTIxOTUzMzM0fQ.WZ3qkm-6tMepxWsuKnfE4nt_wkFiFDD9f5mXgElKACI'
    this.token = localStorage.token ? localStorage.token : ''
    this.readConfigFile()
    
    this.createPromo = this.createPromo.bind( this )
    this.editPromo = this.editPromo.bind( this )  
    this.createUser = this.createUser.bind( this )
  }

  /**
   * Función que lee el archivo de configuración para conectar con la API
   */
  readConfigFile() {
    //const text = fs.readFileSync( 'config.txt', 'utf8');

    fs.readFile( 'config.txt', ( err, data ) => {
      
      if ( !err ) {
        const config = JSON.parse( data )
        const { appType, deviceId, appId, } = config
 
        this.appType = appType
        this.appID = appId[0]
        this.deviceID = deviceId
      }
    } )
  }

  /**
   * Función que obtiene la configuración general del casino guardada en la API
   */
  getConfiguration() {
    return axios.get( `${this.apiURL}/config/adminModule` )
  }

  /**
   * Función que obtiene el logo del casino guardado en la API
   */
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

  /**
   * Función que obtiene las fichas y sus valores guardadas en la API
   */
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

  /**
   * Función que obtiene los valores de recargas rápidas guardadas en la API
   */
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

  /**
   * Función que obtiene los valores de tipo de cambio guardados en la API
   */
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

  /**
   * Función que obtiene los valores de precios de membresia guardados en la API
   */
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

  /**
   * Función que obtiene los horarios del casino guardados en la API
   */
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

  /**
   * Función le envia a la API la nueva configuración de las fichas
   * @param {Object} values Nuevos valores de las fichas
   */
  updateChipsValues( values ) {
    return axios.post( `${this.apiURL}/admin/edit_config`, {
      appId: this.appID,
      chips: values
    },
    {
      headers: { token: this.token}
    } )
  }

  /**
   * Función que obtiene los roles del casino guradados en la API
   */
  getRoles() {
    return axios.get( `${this.apiURL}/admin/get_roles`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que envia a la API los nuevos valores de recargas rápidas
   * @param {Array} fastAmounts Nuevos valores de recargas ráìdas
   */
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

  /**
   * Función que envia a la API los nuevos valores de tipo de cambio
   * @param {*} values Nuevos valores de tipos de cambio
   */
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

  /**
   * Función que envia a la API la información para crear un nuevo rol
   * @param {String} rolName Nombre del nuevo rol 
   * @param {Object} permissions Permisos del nuevo rol 
   */
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

  /**
   * Función que le envia a la API el nombre del usuario para realizar una busqueda por nombre
   * @param {String} name Nombre del usuario que se quiere buscar
   */
  getUserByName( name ) {
    return axios.get( `${this.apiURL}/admin/users_by_name?partName=${name}`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API los nuevos valores de precios de membresias
   * @param {Object} values Valores de membresias 
   */
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

  /**
   * Función que le envia a la API la información para editar un rol
   * @param {String} id ID del rol para editar
   * @param {String} name Nombre del rol
   * @param {Object} permissions Nuevos permisos del rol 
   */
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

  /**
   * Función que le envia a la API la información para dar de alta a un usuario
   * @param {Object} userInfo Información del nuevo usuario
   */
  createUser( userInfo ) {
    userInfo.appId = this.appID

    return axios.post( `${this.apiURL}/admin/create_user`, userInfo, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API los nuevos horarios del casino
   * @param {Object} values Nuevos horarios del casino 
   */
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

  /**
   * Función que le envia a la API la información para iniciar sesión usando credenciales de acceso
   * @param {String} user Nombre de usuario 
   * @param {String} password Contraseña del usuario
   */
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

  /**
   * Función que le envia a la API la información para iniciar sesión usando un lector de huellas
   * @param {String} fingerprint Huella del usuario en formato WSQ
   */
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

  /**
   * Función que obtiene las promociones guardadas en la API
   */
  getProms() {
    return axios.post( `${this.apiURL}/admin/get_promos`,{}, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API la información para crear una nueva promoción
   * @param {Object} data Información de la nueva promoción 
   */
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

  /**
   * Función que le envia a la API la información para desactivar una promoción
   * @param {String} promoId ID de la promo a desactivar 
   */
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

  /**
   * Función que le envia a la API la información para editar una promoción
   * @param {Object} promo Informaicón para editar una promoción 
   */
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

  /**
   * Función que le envia a la API la infromación para que se realize una busqueda de clientes por nombre
   * @param {String} name Nombre del cliete para realizar la busqueda
   */
  getClientByName( name ) {
    return axios.get( `${this.apiURL}/reception/customers_by_name?partName=${name}&sliceSize=10&sliceNumber=1`, {
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API la información para eliminar a un usuario
   * @param {String} userId ID del usuario a eliminar 
   */
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

  /**
   * Función que le solicita a la API el historial de movimientos de caja
   */
  getTillLog() {
    return axios.get( `${this.apiURL}/admin/get_till_log`,{
      headers: {token: this.token},
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }
  
  /**
   * Función que le envia a la API la información para obtener el número de clientes en un rango de fechas
   * @param {String} startDate 
   * @param {String} endDate 
   */
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

  /**
   * Función que le envia a la API la información para obtener el número clientes en un rango de fechas
   * @param {String} startDate 
   * @param {String} endDate 
   */
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

  /**
   * Función que le envia la API la información para obtener las ganacias por fechas
   */
  getScoresByDates() {
    // TODO: REPLACE WITH API
    return new Promise( ( resolve, reject ) => {
      resolve( res )
    } )
  }

  /**
   * Función que le envia a la API la información para obtener los cortes de caja por día
   */
  getTillCash() {
    // TODO: REPLACE WITH API
    return new Promise( ( resolve, reject ) => {
      resolve( res_till )
    } )
  }

  /**
   * Función que le envia a la API la información para obtener los cortes de caja por rango de fecha
   */
  getTillCashByRange() {
    // TODO: REPLACE WITH API
    return new Promise( ( resolve, reject ) => {
      resolve( res_till_range )
    })
  }

  /**
   * Función que le envia a la API la información para obtener los cortes de caja de una fecha
   */
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

  /**
   * Función que le envia a la API la información para editar a un usuario
   * @param {object} userInfo Información para editar al usuario
   */
  editUser( userInfo ) {
    userInfo.appId = this.appID

    return axios.post( `${this.apiURL}/admin/edit_user`, userInfo, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le solicita a la API la lista de emails guardados
   */
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

  /**
   * Función que le envia a la API la información para crear una lista de correo
   * @param {Object} emailList Información de la lista de correo 
   */
  createEmailList( emailList ) {
    return axios.post( `${this.apiURL}/admin/create_email_list`, emailList, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API la información para editar una lista de correo
   * @param {Object} emailList Información para editar la lista de correo 
   */
  editEmailList( emailList ) {
    return axios.post( `${this.apiURL}/admin/update_email_list`, emailList, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que le envia a la API la información para configurar una lista de correo
   * @param {object} emailConfig Configuración de la lista de correo
   */
  configEmailList( emailConfig ) {
    return axios.post( `${this.apiURL}/admin/new_email`, emailConfig, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }

  /**
   * Función que sirve para indicar si la API esta en servicio
   */
  echoAPI() {
    return axios.get( `${this.apiURL}/echo/` )
  }

  /**
   * Función que le envia a la API la información para configurar la aplicación
   * @param {Object} appConfig Configuración de la aplicación 
   */
  startMachine( appConfig ) {

    return axios.post( `${this.apiURL}/start_machine`, appConfig, {
      headers: { token: this.token },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    } )
  }



}

module.exports = Api