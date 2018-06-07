import React, {Component} from 'react'
import {
  Select
} from 'antd'

const {Option} = Select

class ChartForm extends Component {

  render() {
    return(
      <div className="graphics-options">
        <Select
          style={{ width: 240 }}
          placeholder="Seleccione una estadistica" 
        >
          <Option value="custumersByDate">Registro de clientes</Option>
          <Option value="pieTest">Ingresos generales</Option>
          <Option value="barTest">Peridas generales</Option>
          <option value="clientsByDay">Número de clientes por día</option>
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
      </div>
    )
  }
}

module.exports = ChartForm