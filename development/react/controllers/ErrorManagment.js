import React, {Component} from 'react'
import { Redirect } from 'react-router'

class ErrorManagment {

  constructor(  ) {
    this.errorDictionary = {
      "InvalidToken": this.handleInvalidToken
    }

    this.handleInvalidToken = this.handleInvalidToken.bind( this )
  }

  resolveError( error ) {
    console.log(error)

    const functionError = this.errorDictionary[error.error]
    functionError()
  }

  handleInvalidToken() {
    localStorage.clear()
    location.reload()
  }
}

module.exports = ErrorManagment