import React, {Component} from 'react'
import PeriodForm from './PeriodForm.jsx'
import ChartForm from './CharForm.jsx'
import {
  Divider,
  Form,
} from 'antd'

class ConfigurationForm extends Component {
  constructor( props ) {
    super( props )
  }

  render(){
    return(
      <div>
        <PeriodForm />  

        <Divider orientation="left">Estadistica</Divider>

        <ChartForm />
      </div>
    )
  }
}

module.exports = ConfigurationForm