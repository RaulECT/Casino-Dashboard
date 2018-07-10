/**
 * Componente que representa al formulario de configuración de lista de correo
 * @namespace ConfigurationForm
 * @extends Component
 */
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

  /**
   * Crea el componente
   * @param {object} props 
   */
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

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentWillMount() {
    const date = new Date()
    const year = date.getFullYear()
    let month = `${date.getMonth() + 1}`
    let day = `${date.getDate()}`
    
    month = month.length === 1 ? `0${month}` : month
    day = day.length === 1 ? `0${day}` : day

    this.setState( { startDate: `${year}/${month}/${day}` } )
  }

  /**
   * Función que obtiene la información para configurar la lista de correo
   */
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

  /**
   * Función que obtiene la hora actual
   * @returns {string} Hora actual en string
   */
  getCurrentHour() {
    const date = new Date()
    let hour = `${date.getHours()}`
    let minutes = `${date.getMinutes()}`

    hour = hour.length === 1 ? `0${hour}` : hour
    minutes = minutes.length === 1 ? `0${minutes}` : minutes

    return `${hour}:${minutes}`
  }

  /**
   * Función guarda en el estado el tipo de gráfica seleccionada
   * @param {String} charType 
   */
  handleChartTypeChange( charType ) {
    this.setState( { charType } )
  }

  /**
   * Función que guarda en el estado el periodo seleccionado
   * @param {String} period 
   */
  handlePeriodChange( period ) {
    this.setState( { period } )
  }

  /**
   * Función que guarda en el estado el tipo de reporte seleccionado
   * @param {String} reportType 
   */
  handleReportTypeChange( reportType ){
    this.setState( { reportType } )
  }

  /**
   * Función que guarda en el estado la fecha inicial
   * @param {String} startDate 
   */
  handleStartDateChange( startDate ) {
    this.setState( { startDate } )
  }

  /**
   * Función que guarda en el estado la fecha final
   * @param {String} endDate 
   */
  handleEndDateChange( endDate ) {
    this.setState( { endDate } )
  }

  /**
   * Función que guarda en el estado si el envio es recurrente
   * @param {Boolean} isRecurrent 
   */
  handleRecurrentChange( isRecurrent ) {
    this.setState( { isRecurrent } )
  }

  /**
   * Función que guarda en el estado el cuerpo del email
   * @param {String} subject 
   */
  handleSubjectChange( subject ) {
    this.setState( { subject: subject.target.value } )
  }

  /**
   * Función que guarda en el estado la hora de envio seleccionada
   * @param {String} time 
   */
  handleTimeChange( time ) {
    this.setState( { time } )
  }

  /**
   * Función que le muesatra al usaurio un mensaje de error
   * @param {String} msg Mensaje para el usuario 
   */
  showErrorMessage( msg ) {
    message.error( msg )
  }

  /**
   * Función que valida los campos del formulario
   */
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

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente
   */
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