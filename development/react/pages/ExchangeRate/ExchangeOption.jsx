import React, {Component} from 'react'
import {
  Form,
  Input,
  InputNumber
} from 'antd'

class ExchangeOption extends Component {
  

  render() {
    const input = this.props.input == 'number' ? (<InputNumber onChange={this.props.change} />) : (<Input onChange={this.props.change} className="chip-input"/>)
    const FormItem = Form.FormItem

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