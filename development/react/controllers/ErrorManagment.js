import React, {Component} from 'react'
import { Redirect } from 'react-router'
import { Button, notification } from 'antd'

class ErrorManagment {

  constructor(  ) {
    this.errorDictionary = {
      "InvalidToken": this.handleInvalidToken,
      "TokenNotProvided": this.handleInvalidToken
    }

    this.handleInvalidToken = this.handleInvalidToken.bind( this )
    this.openErrorNotification = this.openErrorNotification.bind( this )
  }

  resolveError( error ) {
    console.log(error)

    const functionError = this.errorDictionary[error.error]
    functionError()
  }

  handleInvalidToken() {

    this.openErrorNotification( 'Sesión vencida', 'La sesión ha expirado, la apliación se va a reedirigir a la venta de inicio de sesión para iniciar una nueva sesión.' )

    setTimeout( () => {
       localStorage.clear()
      location.reload()
    }, 5000 ) 
  }

  openErrorNotification( title, description ) {
    notification['warning']({
      message: title,
      description: description,
    })
  }
}

module.exports = ErrorManagment