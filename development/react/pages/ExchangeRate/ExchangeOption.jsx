/**
 * Componente que representa a una opción de la sección de manejor de cambio
 * @namespace ExchangeOption
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Input,
  InputNumber
} from 'antd'

class ExchangeOption extends Component {
  
  /**
   * Randeriza la vista al usuario
   * @returns {string} HTML markup del componente.
   */
  render() {
    const input = this.props.input == 'number' ? (<InputNumber disabled={this.props.avaible} onChange={this.props.change} />) : (<Input disabled={this.props.avaible} onChange={this.props.change} className="chip-input"/>)

    return(
      <div className="exchange-container">
        <p>{this.props.option}</p>
        <img className={this.props.imageClass} src={this.props.image} alt=""/>
        {
          this.props.fieldDecorator( this.props.reference, {
            rules: [{ required: true, message: 'Ingrese un valor!' }]
          } )(
            input
          )
        }
      
      </div>
    )
  }
}

module.exports = ExchangeOption