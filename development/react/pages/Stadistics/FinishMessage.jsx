import React, {Component} from 'react'
import {
  Icon
} from 'antd'

class FinishMessage extends Component {
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