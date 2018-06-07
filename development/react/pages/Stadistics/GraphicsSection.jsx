import React, {Component} from 'react'
import Chart from 'chart.js'
import jsPDF from 'jspdf'
import GraphicsManagment from '../../controllers/GraphicsManagment'
import ScoresByDate from '../../controllers/ScoresByDate'
import { 
  DatePicker,
  Select,
  Button
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
      endDate: null
    }

    this.graphicsManagment = new GraphicsManagment()
    this.scoresByDate = new ScoresByDate()
    this.api = new Api()

    this.generateTesData = this.generateTesData.bind( this )
    this.printBarGraphic = this.printBarGraphic.bind( this )
    this.printLineGraphic = this.printLineGraphic.bind( this )
    this.printPieGraphic = this.printPieGraphic.bind( this )
    this.printPolarGraphic = this.printPolarGraphic.bind( this )
    
    this.graphics = {
      custumersByDate: { route: this.generateTesData, text: 'Usuarios registrados por fecha', },
      pieTest: { route: this.generateTesData, text: 'Ingresos por fecha', },
      barTest: { route: this.generateTesData, text: 'Peridas por fecha', },
      clientsByDay: { text: 'Usuarios registrados por fecha', },
      scoresByDate: { text: 'Ganacias por fecha' },
    }

    this.dateFormat = "YYYY/MM/DD"

    this.getData = this.getData.bind( this )
    this.getCalendar = this.getCalendar.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
    this.handleChartType = this.handleChartType.bind(this)
    this.handleRangePicker = this.handleRangePicker.bind( this )
    this.handleGraphicsOptions = this.handleGraphicsOptions.bind( this )
    this.makeGraphic = this.makeGraphic.bind( this )
    this.printChart = this.printChart.bind( this )
 
  }

  cleanCanvas() {
    document.getElementById("chartContainer").innerHTML = '&nbsp;';
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>'
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
    const { graphSlected, startDate, endDate } = this.state

    switch (graphSlected) {
      case 'clientsByDay':
        this.api.getNumberCustomersByDay( startDate, endDate )
          .then( response => {
            console.log(response);
            if (response.status === 200) {
              const { data, labels } = this.formatData( response.data.result.customersByDay )
              this.printChart( labels, data )
            }
          } )
        break;

      case 'scoresByDate':
        this.api.getScoresByDate()
          .then( response => {

             const lables = this.scoresByDate.getLables( response.data.result.items )
             const data = this.scoresByDate.getDatasets( response.data.result.items )
             this.printChart( lables, data, true )
          } )
        break;
    
      default:
        const { data, labels } = this.graphics[graphSlected].route()
        this.printChart( labels, data )
        break;
    }
    
  }

  getCalendar() {
    const {graphSlected} = this.state
    let calendar = null

    switch ( graphSlected ) {
      case 'clientsByDay':
        calendar = (<RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />)
        break;

      case 'scoresByDate':
        calendar = (<DatePicker format={this.dateFormat} onChange={this.handleRangePicker} />)
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

  printBarGraphic( labels, data ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configBarGraphic( {
      data,
      dataLabels: labels,
      chartLabel: 'Perdidas',
      xLabel: 'Fechas',
      yLabel: 'Perdidas',
      title: `Perdidas registradas de ${startDate} a ${endDate}`,
      type: 'bar'
    } )
    var myChart = new Chart(ctx, configuration)

    this.setState( {
      graphic: myChart,
      graphSlected,
      startDate,
      endDate
    } )
  }

  printChart( labels, data, isMultiLine = false ) {
    const { graphType } = this.state
   
    switch ( graphType ) {
      case 'barGraph':
        this.printBarGraphic( labels, data )
        break;

      case 'pieGraph':
        this.printPieGraphic( labels, data )
        break;

      case 'lineGraph':
        this.printLineGraphic( labels, data, isMultiLine )
        break;

      case 'y':
        this.printPolarGraphic( labels, data )
        break;
    
      default:
        console.log('holi')
        this.printBarGraphic( labels, data )
        break;
    }
  }

  printLineGraphic( labels, data, isMultiLine = false ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configLineGraphic( {
      data,
      dataLabels: labels,
      chartLabel: 'Clientes nuevos',
      xLabel: 'Fechas',
      yAxes: 'No. de usuarios',
      title: `Usuarios registrados de ${startDate} a ${endDate}`
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

  printPieGraphic( labels, data ) {
    const { graphSlected, startDate, endDate } = this.state
    this.cleanCanvas()

    const ctx = document.getElementById("myChart");
    const configuration = this.graphicsManagment.configPieGraphic( {
      data,
      dataLabels: labels,
      chartLabel: 'Ingresos generales',
      title: `Ingresos registrados de ${startDate} a ${endDate}`
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
    console.log( `selected: ${value}` )

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
            <Option value="custumersByDate">Registro de clientes</Option>
            <Option value="pieTest">Ingresos generales</Option>
            <Option value="barTest">Peridas generales</Option>
            <Option value="clientsByDay">Número de clientes por día</Option>
            <Option value="scoresByDate">Ganancias por Fecha</Option>
          </Select>

          <Select
            style={{ width: 240 }}
            onChange={this.handleChartType}
            placeholder="Seleccione el tipo de gráfica"
          >
            <Option value="barGraph">Gráfica de barras</Option>
            <Option value="pieGraph">Gráfica de pastel</Option>
            <Option value="lineGraph">Gráfica de lineal</Option>
            <Option value="y">Gráfica Polar*</Option>
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
        
         <div id="chartContainer">
           <canvas id="myChart" width="200" height="200"></canvas>
         </div>
        
      </div>
    )
  }

}

module.exports = GraphicsSection