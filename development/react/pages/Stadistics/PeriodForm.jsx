/**
 * Componente que representa al form de configuración de periodicidad de la lista de correo
 * @namespace PeriodForm
 * @extends Component
 */
import React, {Component} from 'react'
import {
  DatePicker,
  Form,
  Switch,
  Select,
  TimePicker,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker, MonthPicker, WeekPicker } = DatePicker 

class PeriodForm extends Component {

  /**
   * Crea el componente
   * @param {Object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      isActive: false,
    }

    this.handleDateChange = this.handleDateChange.bind( this )
    this.handleEndDateChange = this.handleEndDateChange.bind( this )
    this.handleHourChange = this.handleHourChange.bind( this )
    this.handlePeriodChange = this.handlePeriodChange.bind( this )
    this.handleStartDateChange = this.handleStartDateChange.bind( this )
    this.handleSwitchChange = this.handleSwitchChange.bind( this )
  }

  /**
   * Función que regresa el tipo de calendario de acuerdo a la periodicidad indicanda por el usuario
   * @returns {JSX} Calendario para introducir la periodicidad
   */
  getRangeCalendar() {
    const {period} = this.state

    if ( period === "weekly" ) {
      return(
        <div style={{ display: 'flex' }}>
          <FormItem
            label="Inicio"
          >
            <WeekPicker format="YYYY/MM/DD" onChange={ this.handleStartDateChange } />
          </FormItem>

          <FormItem
            label="Fin"
          >
            <WeekPicker format="YYYY/MM/DD" onChange={ this.handleEndDateChange } />
          </FormItem>
        </div>   
      )
    } else if( period === "monthly" ) {
      return(
        <div style={{ display: 'flex' }}>
          <FormItem
            label="Inicio"
          >
            <MonthPicker format="YYYY/MM/DD" onChange={this.handleStartDateChange} />
          </FormItem>

          <FormItem
            label="Fin"
          >
            <MonthPicker format="YYYY/MM/DD" onChange={this.handleEndDateChange} />
          </FormItem>
        </div>   
      )
    } else {
      return(
        <FormItem
          label="Rango de fechas:"
        >
          <RangePicker 
            format="YYYY/MM/DD"
            placeholder={['Fecha de Inicio', 'Fecha de Fin']} 
            onChange={this.handleDateChange}
          />
        </FormItem>
      )

    }
  }

  /**
   * Función que maneja los cambios de fechas de periodicidad
   * @param {Array} dates Fechas en formato Moment seleccionadas por el usuario 
   * @param {Array} datesStrings Fehcas en formato String seleccionadas por el usuario
   */
  handleDateChange( dates, datesStrings ) {
    const {onStartDateChange, onEndDateChange} = this.props

    onStartDateChange( datesStrings[0] )
    onEndDateChange( datesStrings[1] )
  }

  /**
   * Función que maneja solo la fecha de terminación 
   * @param {Moment} date Fecha de terminación en formato Moment
   * @param {String} dateString Fecha de terminación en formato String
   */
  handleEndDateChange( date, dateString ) {
    const {onEndDateChange} = this.props 

    onEndDateChange( dateString )
  }

  /**
   * Función que maneja el cambio de horas
   * @param {Date} hour Hora en formato Date
   * @param {String} hourString Hora en formato String
   */
  handleHourChange( hour,hourString ) {
    const {onTimeChange} = this.props

    onTimeChange( hourString )
  }

  /**
   * Función que maneja el cambio de periodicidad
   * @param {String} period Periodicidad
   */
  handlePeriodChange( period ) {
    const {onPeriodChange} = this.props

    onPeriodChange( period )
  }

  /**
   * Función que maneja solo los cambios de fecha de inicio de la periodicidad
   * @param {Moment} date Fecha de inicio en formato Moment 
   * @param {String} dateString Fecha de inicio en formato String
   */
  handleStartDateChange( date, dateString ) {
    const { onStartDateChange } = this.props

    onStartDateChange( dateString )
  }

  /**
   * Función que maneja la presencia del formulario de configuración de periodicidad
   */
  handleSwitchChange() {
    const {isActive} = this.state
    const {onRecurrentChange} = this.props

    this.setState( { isActive: !isActive }, onRecurrentChange( !isActive ) )
  }

  /**
   * Randeriza la vista del componente
   * @returns {String} HTML markup del componente
   */
  render() {
    const { isActive } = this.state
    const formStyle = isActive ? { display: 'inline-flex' } :  { display: 'none' }
    const calendar = this.getRangeCalendar()

    return(
      <div className="periodicity-section" style={ {display: 'flex', flexDirection: 'column'} }>
        <FormItem
          label="Activar envio recurrente:"
        >
          <Switch onChange={this.handleSwitchChange} />
        </FormItem>

        <div style={formStyle}>
          <FormItem
            label="Hora de envio:"
          >
            <TimePicker format="HH:mm" onChange={this.handleHourChange} />
          </FormItem>

          <FormItem
            label="Enviar cada:"
          >
            <Select style={{ width: 180 }} onChange={this.handlePeriodChange}>
              <Option key="daily" value="daily">Cada día</Option>
              <Option key="weekly" value="weekly">Cada semana</Option>
              <Option key="monthly" value="monthly">Cada mes</Option>
            </Select>
          </FormItem>

          {calendar}
        </div>
      </div>
    )
  }

}

module.exports = PeriodForm