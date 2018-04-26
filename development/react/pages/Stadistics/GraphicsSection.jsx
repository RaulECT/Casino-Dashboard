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

    this.dateFormat = "YYYY/MM/DD"
  }

  makeGraphic() {
  
  }

  handleGraphicsOptions( value ) {
    console.log( `selected: ${value}` )
  }

  handleRangePicker( date, dateString ) {
    console.log(date, dateString)
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
        </div>

        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    )
  }

}

module.exports = GraphicsSection