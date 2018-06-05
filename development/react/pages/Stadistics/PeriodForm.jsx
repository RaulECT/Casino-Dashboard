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
  constructor( props ) {
    super( props )

    this.state = {
      endDate: '',
      period: '',
      sendHour: '',
      startDate: '',
      isActive: false,
    }

    this.handleDateChange = this.handleDateChange.bind( this )
    this.handleEndDateChange = this.handleEndDateChange.bind( this )
    this.handleHourChange = this.handleHourChange.bind( this )
    this.handlePeriodChange = this.handlePeriodChange.bind( this )
    this.handleStartDateChange = this.handleStartDateChange.bind( this )
    this.handleSwitchChange = this.handleSwitchChange.bind( this )
  }

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

  handleDateChange( dates, datesStrings ) {
    this.setState( { startDate: datesStrings[0], endDate: datesStrings[1] } )
  }

  handleEndDateChange( date, dateString ) {
    this.setState( { endDate: dateString } )
  }

  handleHourChange( hour,hourString ) {
    this.setState( { sendHour: hourString } )
  }

  handlePeriodChange( period ) {
    this.setState( {period} )
  }

  handleStartDateChange( date, dateString ) {
    
    this.setState( { startDate: dateString } )
  }

  handleSwitchChange() {
    const {isActive} = this.state

    this.setState( { isActive: !isActive } )
  }

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