import React, {Component} from 'react'
import Chart from 'chart.js'
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
      graphSlected: '',
      startDate: null,
      endDate: null
    }

    this.generateTesData = this.generateTesData.bind( this )

    this.graphics = {
      custumersByDate: { route: this.generateTesData }
    }

    this.dateFormat = "YYYY/MM/DD"

    this.handleRangePicker = this.handleRangePicker.bind( this )
    this.handleGraphicsOptions = this.handleGraphicsOptions.bind( this )
    this.makeGraphic = this.makeGraphic.bind( this )
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
    this.printLineGraphic( labels, data )
    //console.log(   );
    
  }

  makeGraphic() {
    this.getData()
  }

  printLineGraphic( labels, data ) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{ 
            data: data,
            label: "Usuarios nuevos",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'No. de usuarios'
              }
          }],
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Fechas'
            }
          }]
      },
        title: {
          display: true,
          fontSize: 16,
          text: 'Usuarios registrados de 23/02/2017 a 23/02/2017'
        }
      }
    })
  }

  handleGraphicsOptions( value ) {
    const { startDate, endDate } = this.state
    console.log( `selected: ${value}` )

    this.setState( {
      graphSlected: value,
      startDate,
      endDate
    } )
    
  }

  handleRangePicker( date, dateString ) {
    //console.log(date, dateString)
    const { graphSlected } = this.state

    this.setState( {
      startDate: dateString[0],
      endDate: dateString[1],
      graphSlected
    } )
  }

  render() {
    return(
      <div>
        <div className="graphics-options">
          <Select 
            style={{ width: 240 }} 
            onChange={ this.handleGraphicsOptions }
            placeholder="Seleccione una gráfica"
          >
            <Option value="custumersByDate">Registro de clientes</Option>
          </Select>

          <RangePicker onChange={this.handleRangePicker} format={ this.dateFormat } />

          <Button 
            type="primary" 
            icon="line-chart"
            onClick={this.makeGraphic}
          >
            Generar gráfica
          </Button>

          <Button
            icon="download"
          >
            Descargar gráfica
          </Button>
        </div>

        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    )
  }

}

module.exports = GraphicsSection