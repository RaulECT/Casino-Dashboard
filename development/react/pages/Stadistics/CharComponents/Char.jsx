import React, {Component} from 'react'
import Chart from 'chart.js'
import GraphicsManagment from '../../../controllers/GraphicsManagment'

class Char extends Component {

  constructor( props ) {
    super( props )

    this.graphicsManagment = new GraphicsManagment()
  }

  componentWillMount() {
    this.printChar()
  }

  cleanCanvas() {
    document.getElementById("chartContainer").innerHTML = '&nbsp;';
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>'
  }

  configBarChar( config ) {
    const { xLabel, yLabel } = this.props
    let barConfiguration = config
    
    barConfiguration[ 'xLabel' ] = xLabel
    barConfiguration[ 'yLabel' ] = yLabel
    barConfiguration[ 'type' ] = bar

    return barConfiguration
  }

  configLineChar( config ) {
    const { xLabel, yLabel } = this.props
    let lineConfiguration = config
    
    lineConfiguration[ 'xLabel' ] = xLabel
    lineConfiguration[ 'yLabel' ] = yLabel

    return lineConfiguration
  }

  printChar() {
    const { charType, data, dataLabels, chartLabel, title } = this.props
    let charConfig = {}
    let props = {
      data,
      dataLabels,
      chartLabel,
      title,
    }
    this.cleanCanvas()

    switch ( charType ) {
      case 'barGraph':
        props = this.configBarChar( props )
        charConfig = this.graphicsManagment.configBarGraphic( props )
        break;

      case 'pieGraph':
        charConfig = this.graphicsManagment.configPieGraphic( props )
        break;

      case 'lineGraph':
        props = this.configLineChar( props )
        charConfig = this.graphicsManagment.configLineGraphic( props )
        break;
    
      default:
        props = this.configBarChar( props )
        charConfig = this.graphicsManagment.configBarGraphic( props )
        break;
    }

    const ctx = document.getElementById("myChart");
    const char = new Chart( ctx, charConfig )
  }

  render() {
    return(
      <div id="chartContainer" className="container chart-container">
        <canvas id="myChart"></canvas>
      </div>
    )
  }
}

module.exports = Char
