import React, {Component} from 'react'
import Chart from 'chart.js'
import jsPDF from 'jspdf'
import GraphicsManagment from '../../controllers/GraphicsManagment'
import { 
  DatePicker,
  Select,
  Button
} from 'antd'

const Option = Select.Option
const { RangePicker } = DatePicker

class GraphicsSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      graphic: null,
      graphSlected: '',
      startDate: null,
      endDate: null
    }

    this.graphicsManagment = new GraphicsManagment()

    this.generateTesData = this.generateTesData.bind( this )
    this.printBarGraphic = this.printBarGraphic.bind( this )
    this.printLineGraphic = this.printLineGraphic.bind( this )
    this.printPieGraphic = this.printPieGraphic.bind( this )
    
    this.graphics = {
      custumersByDate: { route: this.generateTesData, text: 'Usuarios registrados por fecha', chart: this.printLineGraphic },
      pieTest: { route: this.generateTesData, text: 'Ingresos por fecha', chart: this.printPieGraphic },
      barTest: { route: this.generateTesData, text: 'Peridas por fecha', chart: this.printBarGraphic }
    }

    this.dateFormat = "YYYY/MM/DD"

    this.getData = this.getData.bind( this )
    this.generatePDF = this.generatePDF.bind(this)
    this.handleRangePicker = this.handleRangePicker.bind( this )
    this.handleGraphicsOptions = this.handleGraphicsOptions.bind( this )
    this.makeGraphic = this.makeGraphic.bind( this )
 
  }

  cleanCanvas() {
    document.getElementById("chartContainer").innerHTML = '&nbsp;';
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart" width="400" height="400"></canvas>'
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
    const { graphSlected } = this.state
    
    const { data, labels } = this.graphics[graphSlected].route()
    this.graphics[graphSlected].chart( labels, data )
    //this.printLineGraphic( labels, data )
    //console.log(   );
    
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

  printLineGraphic( labels, data ) {
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
    } )
    var myChart = new Chart(ctx, configuration)

    this.setState( {
      graphic: myChart,
      graphSlected,
      startDate,
      endDate
    } )
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

  handleRangePicker( date, dateString ) {
    //console.log(date, dateString)
    const { graphic, graphSlected } = this.state

    this.setState( {
      startDate: dateString[0],
      endDate: dateString[1],
      graphSlected,
      graphic
    } )
  }

  render() {
    const { graphic, graphSlected, startDate, endDate } = this.state
    const generatePDFDisabled = graphic ? false : true
    const generateGraphDisabled = ( graphSlected && startDate && endDate ) ? false : true

    return(
      <div>
        <div className="graphics-options">
          <Select 
            style={{ width: 240 }} 
            onChange={ this.handleGraphicsOptions }
            placeholder="Seleccione una gráfica"
          >
            <Option value="custumersByDate">Registro de clientes</Option>
            <Option value="pieTest">Ingresos generales</Option>
            <Option value="barTest">Peridas generales</Option>
          </Select>

          <RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />

          <Button 
            type="primary" 
            icon="line-chart"
            onClick={this.makeGraphic}
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
        
         <div id="chartContainer">
           <canvas id="myChart" width="400" height="400"></canvas>
         </div>
        
      </div>
    )
  }

}

module.exports = GraphicsSection