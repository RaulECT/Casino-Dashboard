import React, {Component} from 'react'
import {Form, InputNumber} from 'antd'

const FormItem = Form.Item

class ChipItem extends Component {
  render() {
    return(
      <div className="chip-container">
        <img className="chip-image" src={this.props.img} alt=""/>
        <FormItem
          label="Valor"
          className="chip-form"
        >
          <InputNumber className="chip-input" min={1} defaultValue={this.props.value}/>
        </FormItem>
      </div>
    )
  }
}

module.exports = ChipItem