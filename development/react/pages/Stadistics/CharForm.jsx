import React, {Component} from 'react'
import {
  Form,
  Input,
  Select,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class CharForm extends Component {

  render() {
    
    return(
      <div className="stats-form">
        <FormItem
          label="Reporte:"
        >
          <Select style={{ width: 220 }} placeholder="Seleccione el tipo de reporte">
            <Option key="tableWin" value="tableWin">Ganancias por mesa</Option>
            <Option key="casinoWin" value="casinoWin">Ganancias del casino</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Tipo de gráfica"
        >
          <Select style={{ width: 220 }} placeholder="Selecciones una gráfica">
            <Option value="barra">Barra</Option>
            <Option value="pastel">Pastel</Option>
            <Option value="poligonal">Poligonal</Option>
          </Select>
        </FormItem>
      </div>
    )
  }
}

module.exports = CharForm