/**
 * Componenete que representa a la sección de tipos de cambio.
 * @namespace ExchangeSection
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Alert,
  Row,
  Icon,
  Button,
  Col, 
  InputNumber,
  Input,
  Form,
  Modal,
  notification
} from 'antd'
import ExchangeOption from './ExchangeOption.jsx'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

import blackChip from '../images/ficha_negra.png'
import dolarImg from '../images/dolares.png'

import '../styles/exchangeSection.css'

class ExchangeSection extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      loading: true,
      success: false,
      change: false,
      exchangeValue: 0.0,
      valueChange: 0,
      saveModal: false,
      revertModal: false
    }

    this.api = new Api()
    this.errorManagment = new ErrorManagment()

    this.handleInputChanges = this.handleInputChanges.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveExchangeValues = this.saveExchangeValues.bind( this )
  }

  /**
   * Obtiene los valores actules de tipo de cambio guardados en la API.
   */
  componentWillMount() {
    this.api.getExchangeValues()
      .then( response => {
        this.props.form.setFieldsValue( {exchangeValue: response.exchangeRate} )
        this.props.form.setFieldsValue( {chipValue: (response.valueUnitChip/100)} )

        this.setState( {
          loading: false,
          exchangeValue: response.exchangeRate,
          valueChange: response.valueUnitChip/100,
        } )
      } )
      .catch( err => {
        console.log( err )
      } )
  }

  /**
   * Escucha cuando hay cambios de valores en los campos de texto.
   */
  handleInputChanges() {
    this.setState( {
      loading: false,
      success: false,
      change: true
    } )
  }

  /**
   * Maneja la presencia del modal de confirmación 
   */
  handleSaveModal() {
    const {saveModal} = this.state

    this.setState( {
      loading: false,
      saveModal: !saveModal
    } )
  }

  /**
   * Muestra un mensaje de notificación al usuario.
   * @param {string} type Tipo de mensaje que se quiere mostrar.
   * @param {message} message Título del mensaje que se mostrara al usuario.
   * @param {description} description Descripción del mensaje que mostrara al usuario.
   */
  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  /**
   * Guarda los cambios realizados por el usuario en la API.
   */
  saveExchangeValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {

        this.api.updateExchangeValues( values )
          .then( response => {
            this.handleSaveModal()

            if ( response.status === 200 ) {
              this.setState( {
                loading: false,
                success: true,
                change: false,
                saveModal: false
              } )
            } else {
              // TODO: Error Managment
              this.errorManagment.resolveError( response.data )
            }
          } )
          .catch( err => {
            console.log(err)
          } )
      }
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente.
   */
  render() {
    const { getFieldDecorator } = this.props.form
    const {change, success, loading, saveModal} = this.state
    const changeMessage = change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    success ? this.openNotification( 'success', 'Operación exitosa', 'Se han guardado los cambios con éxito.' ) : () => {}
    const loadingSpin = loading ? (
      <Icon 
        type="loading" 
        style={{ fontSize: '50px', display: 'block', margin: 'auto', marginBottom: '40px' }}
      /> ) : ''

    return(
      <div className="exchange-section">
        {changeMessage}
        {loadingSpin}

        <Row>
          <Form>
            <Col span={12}>
              <ExchangeOption
                option="Valor del Dolar"
                image={dolarImg}
                imageClass="dollar-img"
                input="number"
                avaible={loading}
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
                avaible={loading}
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
              disabled={!change}
            >
              Guardar Cambios
            </Button>

            
          </Col>
        </Row>

        <Modal
          title="Actualizar Valores"
          visible={saveModal}
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