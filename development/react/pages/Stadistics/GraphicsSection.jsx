import React, {Component} from 'react'
import Chart from 'chart.js'
import jsPDF from 'jspdf'
import GraphicsManagment from '../../controllers/GraphicsManagment'
import ScoresByDate from '../../controllers/ScoresByDate'
import ScoresByDateRange from '../../controllers/ScoresByDateRange'
import TillCashByDate from '../../controllers/TillCashByDate'
import TillCashByRange from '../../controllers/TillCashByRange'

// TODO: TEST COMPONENTS REFACTORIZED
import ChartForm from './CharComponents/ChartForm.jsx'
import ChartSection from './CharComponents/Char.jsx'

import { 
  DatePicker,
  Select,
  Button,
  Switch
} from 'antd'
import Api from '../../controllers/Api'

const Option = Select.Option
const { RangePicker } = DatePicker

class GraphicsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      graphic: null,
      graphSlected: '',
      graphType: '',
      startDate: null,
      endDate: null,
      isMultiLine: false
    }

    this.stats = [
      {
        val: 'scoresByDate',
        name: 'Ganancias por Fecha',
        calendar: 'MULTI_DATE',
        charts: [ 'bar', 'pie', 'line', ],
      },
      {
        val: 'scoresByDates',
        name: 'Ganancias por rango de fechas',
        calendar: 'MULTI_RANGE',
        charts: [ 'bar', 'pie', 'line' ],
      },
      {
        val: 'tillLog',
        name: 'Corte de caja por fecha',
        calendar: 'DATE',
        charts: [ 'bar', 'line' ],
      },
      {
        val: 'tillRange',
        name: 'Corte de caja por rango de fechas',
        calendar: 'RANGE',
        charts: [ 'bar', 'line' ],
      },
    ]

    this.graphicsManagment = new GraphicsManagment()
    this.scoresByDate = new ScoresByDate()
    this.scoresByRange = new ScoresByDateRange()
    this.tillCashByDate = new TillCashByDate()
    this.tillCashByRange = new TillCashByRange()
    this.api = new Api()

    this.generateTesData = this.generateTesData.bind( this )
    this.printBarGraphic = this.printBarGraphic.bind( this )
    this.printLineGraphic = this.printLineGraphic.bind( this )
    this.printPieGraphic = this.printPieGraphic.bind( this )
    this.printPolarGraphic = this.printPolarGraphic.bind( this )
    
    this.graphics = {
      custumersByDate: { route: this.generateTesData, text: 'Usuarios registrados por fecha', xLabel: 'Fecha', yLabel: 'Cantidad de usuarios', },
      pieTest: { route: this.generateTesData, text: 'Ingresos por fecha', xLabel: 'Fecha', yLabel: 'Ingresos (en pesos)', },
      barTest: { route: this.generateTesData, text: 'Peridas por fecha', xLabel: 'Fecha', yLabel: 'Ingresos (en pesos)', },
      clientsByDay: { text: 'Usuarios registrados por fecha', },
      scoresByDate: { text: 'Ganacias por fecha' },
      scoresByDates: { text: 'Ganancias por rango de fechas' },
      tillLog: { text: 'Corte de caja por fecha' },
      tillRange: { text: 'Corte de caja por rango de fechas' },
    }

    this.dateFormat = "YYYY/MM/DD"

    this.getData = this.getData.bind( this )
    this.getCalendar = this.getCalendar.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
    this.handleChartType = this.handleChartType.bind(this)
    this.handleMultiLineChange = this.handleMultiLineChange.bind( this )
    this.handleRangePicker = this.handleRangePicker.bind( this )
    this.handleGraphicsOptions = this.handleGraphicsOptions.bind( this )
    this.makeGraphic = this.makeGraphic.bind( this )
    this.printChart = this.printChart.bind( this )
 
  }

  cleanCanvas() {
    document.getElementById("chartContainer").innerHTML = '&nbsp;';
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>'
  }

  formatData( data ) {
    let labels = []
    let info = []

    data.map( element => {
      for(var k in element) {
        labels.push(k)
        info.push( element[k] )
      }
    } )

    return { data: info, labels }
  }

  generatePDF() {
    const { graphic, graphSlected, startDate, endDate } = this.state
    const title = this.graphics[graphSlected].text
    const fileName = `${graphSlected}-${startDate}-to-${endDate}`

    const doc = new jsPDF( {
      orientation: 'landscape'
    } )

    doc.text(title, 10, 10)
    const img = graphic.toBase64Image()
   
    doc.addImage( img, 'png', 10, 20, 260, 180 )
    doc.save(`${fileName}.pdf`)
  }

  generateTesData() {
    let days = []
    let data = []
    const { startDate, endDate } = this.state

    let startFormated = new Date( startDate )
    const endFormtaed = new Date( endDate )

    for (var d = startFormated; d <= endFormtaed; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d).toDateString())
      data.push( Math.floor(Math.random() * 101) )
    }
    
    return { data, labels: days }
  }

  getData() {
    const { graphSlected, startDate, endDate, graphType, isMultiLine } = this.state

    switch (graphSlected) {
      case 'clientsByDay':
        this.api.getNumberCustomersByDay( startDate, endDate )
          .then( response => {

            if (response.status === 200) {
              const { data, labels } = this.formatData( response.data.result.customersByDay )
              this.printChart( labels, data,  )
            }
          } )
        break;

      case 'scoresByDate':
        this.api.getScoresByDate()
          .then( response => {
            const multiple = isMultiLine && ( graphType === 'lineGraph' || graphType === 'barGraph' )

             const lables = this.scoresByDate.getLables( response.data.result.items )
             const data = this.scoresByDate.getDatasets( response.data.result.items )
             
             if ( multiple ) {
               this.printChart( lables.labels, data.datasets, 'Horas', 'Ganancias (en pesos)', `Ganancias de la fecha ${startDate}`,  true )
             } else{
              this.printChart( lables.generalLabels, data.totalByTable, 'Mesas', 'Ganancias (en pesos)', `Ganancias de la fecha ${startDate}` )
             }

             
          } )
        break;

      case 'scoresByDates':
        this.api.getScoresByDates()
          .then( response => {
            const multiple = isMultiLine && ( graphType === 'lineGraph' || graphType === 'barGraph' )
            const labels = this.scoresByRange.getLabels( response.data.result.items )
            const data = this.scoresByRange.getDatasets( response.data.result.items )
            

            if ( multiple ) {
              this.printChart( labels.labels , data.datasets, 'Fechas', 'Ganancias (en pesos)', `Ganancias de ${startDate} a ${endDate}`, true)
            } else {
              this.printChart( labels.generalLabels, data.dataTotal, 'Mesas', 'Ganancias (en pesos)', `Ganancias de ${startDate} a ${endDate}`)
            }
            
          } )
        break;

      case 'tillLog':
        this.api.getTillCash()
          .then( response => {
            const labels = this.tillCashByDate.getLabels( response.data.result.items )
            const data = this.tillCashByDate.getData( response.data.result.items )
            
            this.printChart( labels, data, 'Horas', 'Ganancias (en pesos)', `Corte de caja del ${startDate}` )
          } )
        break;

      case 'tillRange':
        this.api.getTillCashByRange()
          .then( response => {
            const labels = this.tillCashByRange.getLabels( response.data.result.items )
            const data = this.tillCashByRange.getData( response.data.result.items )

            this.printChart( labels, data, 'Fechas', 'Ganancias (en pesos)', `Corte de caja del ${startDate} al ${endDate}` )
          } )
        break;
    
      default:
        const { data, labels } = this.graphics[graphSlected].route()
        this.printChart( labels, data, this.graphics[graphSlected].xLabel,this.graphics[graphSlected].yLabel, this.graphics[graphSlected].text )
        break;
    }
    
  }

  getCalendar() {
    const {graphSlected, graphType} = this.state
    let calendar = null

    switch ( graphSlected ) {
      case 'clientsByDay':
        calendar = (<RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />)
        break;

      case 'scoresByDate':
        if ( graphType === 'lineGraph' || graphType === 'barGraph' ) {
          calendar = (
            <div style={ {display: 'inline-flex', alignItems: 'center'} }>
              <DatePicker format={this.dateFormat} onChange={this.handleRangePicker} />
              <div style={ { marginLeft: 15 } }>
                <span>Ver por mesa: </span>
                <Switch onChange={this.handleMultiLineChange} />
              </div>
            </div>
          )
        } else {
          calendar = (<DatePicker format={this.dateFormat} onChange={this.handleRangePicker} />)
        }   
        break;

      case 'scoresByDates':
        if ( graphType === 'lineGraph' || graphType === 'barGraph' ) {
          calendar = (
            <div style={ {display: 'inline-flex', alignItems: 'center'} }>
              <RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />
              <div style={ { marginLeft: 15 } }>
                <span>Ver por mesa: </span>
                <Switch onChange={this.handleMultiLineChange} />
              </div>
            </div>
          )
        } else {
          calendar = (<RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />)
        } 
        break;

      case 'tillLog':
        calendar = (<DatePicker format={this.dateFormat} onChange={this.handleRangePicker} />)
        break;

      case 'tillRange':
        calendar = (<RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />)
        break;

      case 'opt1':
        calendar = (<DatePicker format={this.dateFormat} onChange={this.handleRangePicker} />)
        break;
    
      default:
        calendar = (<RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />)
        break;
    }

    return calendar
  }

  makeGraphic() {
    this.getData()
  }

  printBarGraphic( labels, data, xLabel, yLabel, title, isMultiLine = false ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configBarGraphic( {
      data,
      dataLabels: labels,
      chartLabel: title,
      xLabel: xLabel,
      yLabel: yLabel,
      title: title,
      type: 'bar'
    }, isMultiLine )
    var myChart = new Chart(ctx, configuration)

    this.setState( {
      graphic: myChart,
      graphSlected,
      startDate,
      endDate
    } )
  }

  printChart( labels, data, xLabel, yLabel, title, isMultiLine = false ) {
    const { graphType } = this.state
   
    switch ( graphType ) {
      case 'barGraph':
        this.printBarGraphic( labels, data, xLabel, yLabel, title, isMultiLine )
        break;

      case 'pieGraph':
        this.printPieGraphic( labels, data, xLabel, yLabel, title )
        break;

      case 'lineGraph':
        this.printLineGraphic( labels, data, xLabel, yLabel, title, isMultiLine )
        break;

      case 'y':
        this.printPolarGraphic( labels, xLabel, yLabel, title, data )
        break;
    
      default:
        this.printBarGraphic( labels, data )
        break;
    }
  }

  printLineGraphic( labels, data, xLabel, yLabel, title, isMultiLine = false ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configLineGraphic( {
      data,
      dataLabels: labels,
      chartLabel: title,
      xLabel: xLabel,
      yLabel: yLabel,
      title: title
    }, isMultiLine )
    var myChart = new Chart(ctx, configuration)

    this.setState( {
      graphic: myChart,
      graphSlected,
      startDate,
      endDate
    } )
  }

  printPolarGraphic( labels, data ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()
    
    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configPolarGraphic()

    var myChart = new Chart(ctx, configuration)

    this.setState( { graphic: myChart } )
  }

  printPieGraphic( labels, data, xLabel, yLabel, title, ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configPieGraphic( {
      data,
      dataLabels: labels,
      chartLabel: title,
      title: title
    } )
    var myChart = new Chart(ctx, configuration)

    this.setState( {
      graphic: myChart,
      graphSlected,
      startDate,
      endDate
    } )
  }

  handleGraphicsOptions( value ) {
    const { graphic, startDate, endDate } = this.state

    this.setState( {
      graphSlected: value,
      graphic,
      startDate,
      endDate
    } )
    
  }

  handleChartType( value ) {
    this.setState( { graphType: value } )
  }

  handleMultiLineChange( value ) {
    this.setState( { isMultiLine: value } )
  }

  handleRangePicker( date, dateString ) {
    //console.log(date, dateString)
    const { graphic, graphSlected } = this.state
    let startDate = ''
    let endDate = ''

    if ( Array.isArray(dateString) ) {
      startDate = dateString[0]
      endDate = dateString[1]
    } else {
      startDate = dateString
      endDate = dateString
    }

    this.setState( {
      startDate,
      endDate,
      graphSlected,
      graphic
    } )
  }

  render() {
    const { graphic, graphSlected, graphType, startDate, endDate } = this.state
    const generatePDFDisabled = graphic ? false : true
    const calendar = this.getCalendar()
    const generateGraphDisabled = ( graphSlected && graphType && startDate && endDate ) ? false : true

    return(
      <div>
        <div className="graphics-options">
          <Select 
            style={{ width: 240 }} 
            onChange={ this.handleGraphicsOptions }
            placeholder="Seleccione una estadistica"
          >
            <Option value="scoresByDate">Ganancias por Fecha</Option>
            <Option value="scoresByDates">Ganancias por rango de fechas</Option>
            <Option value="tillLog">Corte de caja por fecha</Option>
            <Option value="tillRange">Corte de caja por rango de fechas</Option>
          </Select>

          <Select
            style={{ width: 240 }}
            onChange={this.handleChartType}
            placeholder="Seleccione el tipo de gráfica"
          >
            <Option value="barGraph">Gráfica de barras</Option>
            <Option value="pieGraph">Gráfica de pastel</Option>
            <Option value="lineGraph">Gráfica de lineal</Option>
          </Select>

          {calendar}

          <div className="buttons-group">
            <Button 
              type="primary" 
              icon="line-chart"
              onClick={this.makeGraphic}
              style={{ marginLeft: 12 }}
              disabled={generateGraphDisabled}
            >
              Generar gráfica
            </Button>

            <Button
              icon="download"
              onClick={this.generatePDF}
              disabled={generatePDFDisabled}
            >
              Descargar gráfica
            </Button> 
          </div>

          
        </div>
        
        <div id="chartContainer" className="container-chart chart-container">
          <canvas id="myChart"></canvas>
        </div>
        
      </div>
    )
  }

}

module.exports = GraphicsSection