import React, {Component} from 'react'
import {Form, InputNumber} from 'antd'

const FormItem = Form.Item

class ChipItem extends Component {
  constructor( props ) {
    super( props )
    
  }
  
  render() {
    
    return(
      <div className="chip-container">
        <img className="chip-image" src={this.props.img} alt=""/>
        <FormItem
          label="Valor"
          className="chip-form"
        >
          {this.props.fieldDecorator(this.props.chip, {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(
            <InputNumber 
              className="chip-input" 
              min={1} 
              onChange={this.props.valueChange}
            />
          )}
        
        </FormItem>
      </div>
    )
  }
}

module.exports = ChipItem