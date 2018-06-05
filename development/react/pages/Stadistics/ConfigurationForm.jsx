import React, {Component} from 'react'
import PeriodForm from './PeriodForm.jsx'
import ChartForm from './CharForm.jsx'
import {
  Button,
  Divider,
  message,
  Form,
  Popconfirm,
} from 'antd'

class ConfigurationForm extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      charType: null,
      endDate: null,
      isRecurrent: false,
      reportType: null,
      startDate: null,
      period: null,
      time: null,
    }

    this.handleChartTypeChange = this.handleChartTypeChange.bind( this )
    this.handlePeriodChange = this.handlePeriodChange.bind( this )
    this.handleReportTypeChange = this.handleReportTypeChange.bind( this )
    this.handleStartDateChange = this.handleStartDateChange.bind( this )
    this.handleEndDateChange = this.handleEndDateChange.bind( this )
    this.handleTimeChange = this.handleTimeChange.bind( this )
    this.handleRecurrentChange = this.handleRecurrentChange.bind( this )
  }

  componentWillMount() {
    const date = new Date()
    const year = date.getFullYear()
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    
    month = month.length === 1 ? `0${month}` : month
    day = day.length === 1 ? `0${day}` : day

    this.setState( { startDate: `${year}/${month}/${day}` } )
  }

  configEmailList() {
    const { charType, isRecurrent, reportType, startDate, endDate, period, time } = this.state


  }

  handleChartTypeChange( charType ) {
    this.setState( { charType } )
  }

  handlePeriodChange( period ) {
    this.setState( { period } )
  }

  handleReportTypeChange( reportType ){
    this.setState( { reportType } )
  }

  handleStartDateChange( startDate ) {
    this.setState( { startDate } )
  }

  handleEndDateChange( endDate ) {
    this.setState( { endDate } )
  }

  handleRecurrentChange( isRecurrent ) {
    this.setState( { isRecurrent } )
  }

  handleTimeChange( time ) {
    this.setState( { time } )
  }

  showErrorMessage( message ) {
    message.error( message )
  }

  validateFields() {
    const { charType, isRecurrent, reportType, startDate, endDate, period, time } = this.state

    
  }

  render(){
    return(
      <div>
        <PeriodForm
          onStartDateChange={this.handleStartDateChange}
          onEndDateChange={this.handleEndDateChange}
          onTimeChange={this.handleTimeChange}
          onPeriodChange={this.handlePeriodChange}
          onRecurrentChange={this.handleRecurrentChange}
        />  

        <Divider orientation="left">Estadistica</Divider>

        <ChartForm
          onChartChange={this.handleChartTypeChange}
          onReportChange={this.handleReportTypeChange}
        />

        <Popconfirm key="1" title="¿Desea configurar esta lista de correo?" onConfirm={ ()=>{} }>
          <Button 
            type="primary"
            style={ {marginTop: 20} }
            icon="setting"
          >
            Configurar Lista
          </Button>
        </Popconfirm>
      </div>
    )
  }
}

module.exports = ConfigurationForm