/**
 * Función que representa a la sección de finalización de configuración de la lista de correo
 * @namespace FinishMessage
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Icon
} from 'antd'

class FinishMessage extends Component {

  /**
   * Función que se ejecuta despues de randerizar la vista
   */
  componentDidMount() {
    const { onClose, onReset } = this.props

    setTimeout( () => {
      onClose()
      onReset()
    }, 500 )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente
   */
  render() {
    return(
      <div className="message-section">
        <Icon type="check-circle-o" />

        <p>Se ha creado y configurado con éxito la lista de correo.</p>
      </div>
    )
  }
}

module.exports = FinishMessage