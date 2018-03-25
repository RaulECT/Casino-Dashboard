import React, {Component} from 'react'
import {
  Row,
  Button,
  Col, 
  InputNumber,
  Input,
  Form
} from 'antd'
import ExchangeOption from './ExchangeOption.jsx'

import blackChip from '../images/poker-chip-black.png'
import dolarImg from '../images/dollar.png'

import '../styles/exchangeSection.css'

class ExchangeSection extends Component {
  render() {
    return(
      <div className="exchange-section">
        <Row>
          <Form>
            <Col span={12}>
              <ExchangeOption
                option="Valor del Dolar"
                image={dolarImg}
                imageClass="dollar-img"
                input="number"
              />
            </Col>

            <Col span={12}>
              <ExchangeOption
                option="Valor de Ficha"
                image={blackChip}
                imageClass="chip-img"
                input="text"
              />
            </Col>

            
          </Form>
        </Row>

        <Row>
          <Col offset={10}>
            <Button style={ {marginTop: '40px'} } size="large" type="primary" icon="save">
              Guardar Cambios
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

module.exports = ExchangeSection