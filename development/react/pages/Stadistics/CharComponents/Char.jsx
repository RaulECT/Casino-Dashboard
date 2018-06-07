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

  configBarChar( props ) {
    const { xLabel, yLabel } = this.props
    let barConfiguration = props
    
    barConfiguration[ 'xLabel' ] = xLabel
    barConfiguration[ 'yLabel' ] = yLabel
    barConfiguration[ 'type' ] = bar

    return barConfiguration
  }

  configLineChar( props ) {
    const { xLabel, yLabel } = this.props
    let lineConfiguration = props
    
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
      title
    }

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
      <div id="chartContainer">
        <canvas id="myChart" width="200" height="200"></canvas>
      </div>
    )
  }
}

module.exports = Char
