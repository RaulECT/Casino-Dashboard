/**
 * Componente que representa a las opciones para generar gráficas de estadisticas
 * @namespace CharForm
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Form,
  Input,
  Select,
} from 'antd'

const {TextArea} = Input
const FormItem = Form.Item
const Option = Select.Option

class CharForm extends Component {

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente
   */
  render() {
    const { onChartChange, onReportChange, onSubjectChange } = this.props

    return(
      <div>
        <div className="stats-form">
          <FormItem
            label="Reporte:"
          >
            <Select style={{ width: 220 }} placeholder="Seleccione el tipo de reporte" onChange={onReportChange}>
              <Option key="tableWin" value="tableWin">Ganancias por mesa</Option>
              <Option key="casinoWin" value="casinoWin">Ganancias del casino</Option>
            </Select>
          </FormItem>

          <FormItem
            label="Tipo de gráfica"
          >
            <Select style={{ width: 220 }} placeholder="Selecciones una gráfica" onChange={onChartChange}>
              <Option value="barra">Barra</Option>
              <Option value="pastel">Pastel</Option>
              <Option value="poligonal">Poligonal</Option>
            </Select>
          </FormItem>

          
        </div>

        <div>
          <FormItem
            label="Asunto del correo:"
          >
            <TextArea onChange={onSubjectChange} />
          </FormItem>
        </div>
      </div>

    )
  }
}

module.exports = CharForm