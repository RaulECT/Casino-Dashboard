/**
 * Componente que representa a cada una de las fichas en el panel de ocnfiguración de fichas.
 */
import React, {Component} from 'react'
import {Form, InputNumber} from 'antd'

const FormItem = Form.Item

class ChipItem extends Component {

  /**
   * Randeriza la vista del componente.
   * @returns {string} HTML markup del componente.
   */
  render() {
    const {img, chip, valueChange, avaible} = this.props

    return(
      <div className="chip-container">
        <img className="chip-image" src={img} alt=""/>
        <FormItem
          label="Valor"
          className="chip-form"
        >
          {this.props.fieldDecorator(chip, {
            rules: [{ required: true, message: 'Ingrese un valor!' }],
          })(
            <InputNumber 
              className="chip-input" 
              min={1} 
              onChange={valueChange}
              disabled={avaible}
            />
          )}
        
        </FormItem>
      </div>
    )
  }
}

module.exports = ChipItem