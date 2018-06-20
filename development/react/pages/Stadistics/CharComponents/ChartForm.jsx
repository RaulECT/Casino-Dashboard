import React, {Component} from 'react'
import {
  Select,
  DatePicker,
  Button,
} from 'antd'

const {Option} = Select
const {RangePicker} = DatePicker

class ChartForm extends Component {

  constructor( props ) {
    super( props )

    this.dateFormat = 'YYYY/MM/DD'
  }

  getChartOptions() {
    const { charts } = this.props
    let options = []

    charts.map( ( chart, index ) => {
      switch ( chart ) {
        case 'bar':
          options.push( ( <Option key={index} value="barGraph">Gráfica de barras</Option> ) )
          break;

        case 'pie':
          options.push( <Option key={index} value="pieGraph">Gráfica de pastel</Option> )
          break;

        case 'line':
          options.push( ( <Option key={index} value="lineGraph">Gráfica lineal</Option> ) )
          break;
      
        default:
          break;
      }
    } )

    return options
  }

  getOptions() {
    const { stats } = this.props
    let options = []

    stats.map( ( element, index ) => options.push( ( <Option key={index} value={element.val}>{element.name}</Option> ) ) )

    return options
  }

  getRangeCalendar( isMuliply ) {
    const { onDateChange, onMultiChange } = this.props

    if ( isMuliply ) {
      return (
        <div style={ {display: 'inline-flex', alignItems: 'center'} }>
          <DatePicker format={this.dateFormat} onChange={onDateChange} />
          <div style={ { marginLeft: 15 } }>
            <span>Ver por mesa: </span>
            <Switch onChange={onMultiChange} />
          </div>
        </div>
      )
    } else {
      return (
        <RangePicker onChange={onDateChange} format={ this.dateFormat } />
      )
    }
  }

  getDateCalendar( isMuliply ) {
    const { onDateChange, onMultiChange } = this.props

    if ( isMuliply ) {
      return(
        <div style={ {display: 'inline-flex', alignItems: 'center'} }>
          <DatePicker format={this.dateFormat} onChange={onDateChange} />
          <div style={ { marginLeft: 15 } }>
            <span>Ver por mesa: </span>
            <Switch onChange={onMultiChange} />
          </div>
        </div>
      )
    } else {
      return (
        <RangePicker onChange={onDateChange} format={ this.dateFormat } />
      )
    }
  }

  renderCalendar() {
    const { calendarType, } = this.props
    let calendar = null

    switch ( calendarType ) {
      case 'RANGE':
        calendar = this.getRangeCalendar( false )
        break;

      case 'DATE':
        calendar = this.getDateCalendar( false )
        break;

      case 'MULTI_RANGE':
        calendar = this.getRangeCalendar( true )
        break;

      case 'MULTI_DATE':
        calendar = this.getDateCalendar( true )
        break;
    
      default:
        calendar = this.getRangeCalendar( false )
        break;
    }

    return calendar
  }

  render() {
    const { onStatsChange, onChartChange, onCreateChart, onDownloadChart, chartDisabled, dowloandDisabled } = this.props

    return(
      <div className="graphics-options">
        <Select
          style={{ width: 240 }}
          placeholder="Seleccione una estadistica" 
          onChange={ onStatsChange }
        >
          { this.getOptions() }
        </Select>

        <Select
          style={{ width: 240 }}
          placeholder="Seleccione el tipo de gráfica"
          onChange={ onChartChange }
        >
          { this.getChartOptions() }
        </Select>

        { this.renderCalendar() }

        <div className="buttons-group">
          <Button
            type="primary"
            icon="line-chart"
            style={ { marginLeft: 12 } }
            onClick={ onCreateChart }
            disabled={ chartDisabled }
          >
            Generar gráfica
          </Button>

          <Button
            icon="download"
            onClick={ onDownloadChart }
            disabled={ dowloandDisabled }
          >
            Descargar gráfica
          </Button>
        </div>
      </div>
    )
  }
}

module.exports = ChartForm