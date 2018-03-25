import React, {Component} from 'react'
import {
  Input,
  InputNumber
} from 'antd'

class ExchangeOption extends Component {
  

  render() {
    const input = this.props.input == 'number' ? (<InputNumber/>) : (<Input className="chip-input"/>)

    return(
      <div className="exchange-container">
        <p>{this.props.option}</p>
        <img className={this.props.imageClass} src={this.props.image} alt=""/>
        {input}
      </div>
    )
  }
}

module.exports = ExchangeOption