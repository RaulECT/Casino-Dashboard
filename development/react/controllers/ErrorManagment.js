import React, {Component} from 'react'
import { Redirect } from 'react-router'
import { Button, notification } from 'antd'

class ErrorManagment {

  constructor() {

    this.resolveError = this.resolveError.bind( this )
    this.handleAditionalProperties = this.handleAditionalProperties.bind( this )
    this.handleInvalidToken = this.handleInvalidToken.bind( this )
    this.handleErrorPattern= this.handleErrorPattern.bind( this )
    this.handleFormatError = this.handleFormatError.bind( this )
    this.handleRequestFaildes = this.handleRequestFaildes.bind( this )
    this.handleFingerprintNotFound = this.handleFingerprintNotFound.bind( this )
    this.openErrorNotification = this.openErrorNotification.bind( this )
    this.handleDataNotFound = this.handleDataNotFound.bind( this ) 
    this.handleLoginFailed = this.handleLoginFailed.bind( this )
    this.handleFingerprintsErro = this.handleFingerprintsErro.bind( this )
    this.handleInvalidDate = this.handleInvalidDate.bind( this )
    this.handleRequiredError = this.handleRequiredError.bind( this )

    this.errorDictionary = {
      "InvalidToken": this.handleInvalidToken,
      "TokenNotProvided": this.handleInvalidToken,
      "Request failed with status code 401": this.handleRequestFaildes,
      "additionalProperties": this.handleAditionalProperties,
      "pattern": this.handleErrorPattern,
      "format": this.handleFormatError,
      "FingerprintNotFound": this.handleFingerprintNotFound,
      "dataNotFound": this.handleDataNotFound,
      "loginFailed": this.handleLoginFailed,
      "FingerprintsEnrollmentError": this.handleFingerprintsErro,
      "invalidDate": this.handleInvalidDate,
      "required": this.handleRequiredError,
    }
  }

  resolveError( error ) {
    
    const functionError = this.errorDictionary[error.error]
    functionError()
  }

  handleAditionalProperties() {
    this.openErrorNotification( 'Error en la petición', 'Verifique que se cumplan todos los campos necesarios para realizar esta operación.' )
  }

  handleInvalidToken() {

    this.openErrorNotification( 'Sesión vencida', 'La sesión ha expirado, la apliación se va a reedirigir a la venta de inicio de sesión para iniciar una nueva sesión.' )

    setTimeout( () => {
      localStorage.clear()
      location.reload()
    }, 5000 ) 
  }

  handleRequestFaildes() {
    this.openErrorNotification( 'Error en la petición', 'La petición ha fallado, favor de verificar los campos. En caso de reeincidencia, cerrar la sesión actual e iniciar una nueva sesión. Error: Request failed with status code 401' )
  }

  handleErrorPattern() {
    this.openErrorNotification( 'Error en el formato', 'Verifique que el formato de los valores sea el correcto. Error: pattern' )
  }

  handleFormatError() {
    this.openErrorNotification( 'Error en el formato de los datos', 'Verique que todos los campos cumplan en el formato establecido. Error: format' )
  }

  handleFingerprintNotFound() {
    this.openErrorNotification( 'No se encotro ningun usuario con esa huella. Error: FingerprintNotFound' )
  }

  handleDataNotFound() {
    this.openErrorNotification( 'Información no encontrada', 'No se ha encontrado ningún usuario y/o registro con la información proporcionada. Error: dataNotFound' )
  }

  handleLoginFailed() {
    this.openErrorNotification( 'Error en el inicio de sesión', 'El usuario y/o contraseña no coinciden, verificar la credenciales proporcionadas. Error: loginFailed' )
  }

  handleFingerprintsErro() {
    this.openErrorNotification( 'Error en la lectura de huellas', 'Vuelva a escanear las huellas. Error: FingerprintsEnrollmentError' )
  }

  handleInvalidDate() {
    this.openErrorNotification( 'Fecha incorrecta', 'La fecha no cumple con el formato correcto. Error: invalidDate.' )
  }

  handleRequiredError() {
    this.openErrorNotification( 'Información incompleta', 'Falta información para realizar la petición, verifique todos los campos. Error: required' )
  }

  openErrorNotification( title, description ) {
    notification['warning']({
      message: title,
      description: description,
    })
  }


}

module.exports = ErrorManagment