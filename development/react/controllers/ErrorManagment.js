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

    this.errorDictionary = {
      "InvalidToken": this.handleInvalidToken,
      "TokenNotProvided": this.handleInvalidToken,
      "Request failed with status code 401": this.handleRequestFaildes,
      "additionalProperties": this.handleAditionalProperties,
      "pattern": this.handleErrorPattern,
      "format": this.handleFormatError,
      "FingerprintNotFound": this.handleFingerprintNotFound
    }
  }

  resolveError( error ) {
    console.log(error)
    
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
    this.openErrorNotification( 'Error en la petición', 'La petición ha fallado, favor de verificar los campos. En caso de reeincidencia, cerrar la sesión actual e iniciar una nueva sesión.' )
  }

  handleErrorPattern() {
    this.openErrorNotification( 'Error en el formato', 'Verifique que el formato de los valores sea el correcto.' )
  }

  handleFormatError() {
    this.openErrorNotification( 'Error en el formato de los datos', 'Verique que todos los campos cumplan en el formato establecido.' )
  }

  handleFingerprintNotFound() {
    this.openErrorNotification( 'No se encotro ningun usuario con esa huella.' )
  }

  openErrorNotification( title, description ) {
    notification['warning']({
      message: title,
      description: description,
    })
  }
}

module.exports = ErrorManagment