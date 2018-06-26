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
      subject: null,
      time: null,
    }

    this.configEmailList = this.configEmailList.bind( this )
    this.handleChartTypeChange = this.handleChartTypeChange.bind( this )
    this.handlePeriodChange = this.handlePeriodChange.bind( this )
    this.handleReportTypeChange = this.handleReportTypeChange.bind( this )
    this.handleStartDateChange = this.handleStartDateChange.bind( this )
    this.handleEndDateChange = this.handleEndDateChange.bind( this )
    this.handleTimeChange = this.handleTimeChange.bind( this )
    this.handleRecurrentChange = this.handleRecurrentChange.bind( this )
    this.handleSubjectChange = this.handleSubjectChange.bind( this )
    this.validateFields = this.validateFields.bind( this )
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
    const {onConfig} = this.props
    const { charType, isRecurrent, reportType, startDate, endDate, period, subject, time } = this.state
    const areCorrectFields = this.validateFields()
    
    if ( areCorrectFields ) {
      let config = {
        startDate,
        reportType,
        subject,
        period: "once",
        graphicType: charType,
        time: this.getCurrentHour()
      }

      if ( isRecurrent ) {
        config['endDate'] = endDate
        config['period'] = period
        config['time'] = time
      }

      onConfig( config )
      
    } else{
      this.showErrorMessage( 'Verifique que todos los campos esten llenos.' )
    }
  }

  getCurrentHour() {
    const date = new Date()
    let hour = `${date.getHours()}`
    let minutes = `${date.getMinutes()}`

    hour = hour.length === 1 ? `0${hour}` : hour
    minutes = minutes.length === 1 ? `0${minutes}` : minutes

    return `${hour}:${minutes}`
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

  handleSubjectChange( subject ) {
    this.setState( { subject: subject.target.value } )
  }

  handleTimeChange( time ) {
    this.setState( { time } )
  }

  showErrorMessage( msg ) {
    message.error( msg )
  }

  validateFields() {
    const { charType, isRecurrent, reportType, startDate, endDate, period, subject, time } = this.state
    let correctFields = false

    if ( isRecurrent ) {
      correctFields = charType && reportType && startDate && endDate && period && time && subject
    } else{
      correctFields = charType && reportType && subject
    }

    return correctFields
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
          onSubjectChange={this.handleSubjectChange}
        />

        <Popconfirm key="1" title="¿Desea configurar esta lista de correo?" onConfirm={ ()=>{ this.configEmailList() } }>
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