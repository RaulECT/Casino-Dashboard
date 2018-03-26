import React, {Component} from 'react'
import {
  Alert,
  Row,
  Button,
  Col, 
  InputNumber,
  Input,
  Form,
  Modal
} from 'antd'
import ExchangeOption from './ExchangeOption.jsx'
import Api from '../../controllers/Api'

import blackChip from '../images/poker-chip-black.png'
import dolarImg from '../images/dollar.png'

import '../styles/exchangeSection.css'

class ExchangeSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      success: false,
      change: false,
      exchangeValue: 0.0,
      valueChange: 0,
      saveModal: false,
      revertModal: false
    }

    this.api = new Api()

    this.handleInputChanges = this.handleInputChanges.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveExchangeValues = this.saveExchangeValues.bind( this )
  }

  componentWillMount() {
    this.api.getExchangeValues()
      .then( response => {
        this.props.form.setFieldsValue( {exchangeValue: response.exchangeRate} )
        this.props.form.setFieldsValue( {chipValue: (response.valueUnitChip/100)} )

        this.setState( {
          success: this.state.success,
          change: this.state.change,
          exchangeValue: response.exchangeRate,
          valueChange: response.valueUnitChip/100,
          saveModal: this.state.saveModal,
          revertModal: this.state.revertModal
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  handleInputChanges() {
    this.setState( {
      success: false,
      change: true,
      exchangeValue: this.state.exchangeValue,
      valueChange: this.state.valueChange,
      saveModal: this.state.saveModal,
      revertModal: this.state.revertModal
    } )
  }

  handleSaveModal() {
    this.setState( {
      success: this.state.success,
      change: this.state.change,
      exchangeValue: this.state.exchangeValue,
      valueChange: this.state.valueChange,
      saveModal: !this.state.saveModal,
      revertModal: this.state.revertModal
    } )
  }

  saveExchangeValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        console.log( values )
        this.api.updateExchangeValues( values )
          .then( response => {
            console.log( response )
            if ( this.response.data.success ) {
              this.setState( {
                success: true,
                change: false,
                exchangeValue: this.state.exchangeValue,
                valueChange: this.state.valueChange,
                saveModal: !this.state.saveModal,
                revertModal: this.state.revertModal
              } )
            } else {
              // TODO: Error Managment
            }
          } )
          .catch( err => {
            console.log(err)
          } )
      }
    } )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const changeMessage = this.state.change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    const successMessage = this.state.success ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han guardado los cambios con éxito." type="success" showIcon />) : ''

    return(
      <div className="exchange-section">
        {changeMessage}
        {successMessage}

        <Row>
          <Form>
            <Col span={12}>
              <ExchangeOption
                option="Valor del Dolar"
                image={dolarImg}
                imageClass="dollar-img"
                input="number"
                fieldDecorator={getFieldDecorator}
                reference="exchangeValue"
                change={this.handleInputChanges}
              />
            </Col>

            <Col span={12}>
              <ExchangeOption
                option="Valor de Ficha"
                image={blackChip}
                imageClass="chip-img"
                input="number"
                fieldDecorator={getFieldDecorator}
                reference="chipValue"
                change={this.handleInputChanges}
              />
            </Col>

            
          </Form>
        </Row>

        <Row>
          <Col offset={10}>
            <Button 
              style={ {marginTop: '40px'} } 
              size="large" 
              type="primary" 
              icon="save"
              onClick={this.handleSaveModal}
              disabled={!this.state.change}
            >
              Guardar Cambios
            </Button>

            
          </Col>
        </Row>

        <Modal
          title="Actualizar Valores"
          visible={this.state.saveModal}
          onOk={this.saveExchangeValues}
          onCancel={this.handleSaveModal}
        >
          <p>¿Desea actualizar los valores del tipo de cambio?</p>
              
        </Modal>
      </div>
    )
  }
}

const WrappedExchangeForm = Form.create()(ExchangeSection);
module.exports = WrappedExchangeForm