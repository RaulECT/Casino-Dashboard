import React, {Component} from 'react'
import {
  Icon
} from 'antd'

class FinishMessage extends Component {
  componentDidMount() {
    const { onClose, onReset } = this.props

    setTimeout( () => {
      onClose()
      onReset()
    }, 500 )
  }

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