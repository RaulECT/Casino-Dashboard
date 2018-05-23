/**
 * Componente que representa a la sección de configuración de fichas
 */
import React, {Component} from 'react'
import ChipItem from './ChipItem.jsx'
import {
  Icon,
  Form,
  Row,
  Col,
  Button,
  Alert,
  Modal,
  notification
} from 'antd'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

import aquaChip from './../images/ficha_aqua.png'
import blackChip from './../images/ficha_negra.png'
import blueChip from './../images/ficha_azul.png'
import greenChip from './../images/ficha_verde.png'
import orangeChip from './../images/ficha_naranja.png'
import pinkChip from './../images/ficha_rosa.png'
import purpleChip from './../images/ficha_morada.png'
import redChip from './../images/ficha_roja.png'
import grayChip from './../images/ficha_blanca.png'

const FormItem = Form.Item

class ChipsSection extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      loading: true,
      valueChange: false,
      successOperation : false,
      isModalVisible: false
    }

    this.api = new Api()
    this.errorManagment = new ErrorManagment()
    this.formatChipsData = this.formatChipsData.bind( this )
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind( this )
    this.handleModal = this.handleModal.bind( this )
    this.updateChipsValues = this.updateChipsValues.bind( this )
  }

  /**
   * Función que se ejecutan antes de randerizar la vista, obtiene los valores de las fichas de la API.
   */
  componentWillMount() {
    this.api.getChips()
      .then( response => {
        response.map( element => {
          var item = {}
          item[ element.color ] = element.value
          this.props.form.setFieldsValue( item )
          
          this.setState( {loading: false} )
        } )
      } )
      .catch( err => {
        console.log(err)
      } )

  }

  /**
   * Se formatea la información recivida de la API para mostrala al usuario.
   * @param {object} values Valores de las fichas guardadas en el servidor
   */
  formatChipsData( values ) {
    return [
      {
        "color":  "aqua" ,
        "value": values.aqua
      },
      {
        "color":  "black" ,
        "value": values.black
      },
      {
        "color":  "blue" ,
        "value": values.blue
      },
      {
        "color":  "green" ,
        "value": values.green
      },
      {
        "color":  "orange" ,
        "value": values.orange
      },
      {
        "color":  "pink" ,
        "value": values.pink
      },
      {
        "color":  "purple" ,
        "value": values.purple
      } ,
      {
        "color":  "red" ,
        "value": values.red
      },
      {
        "color":  "white" ,
        "value": values.white
      }
    ]
  }

  handleSubmit( event ) {
    event.preventDefault()
    this.handleModal()
  }

  /**
   * Función que maneja el evento submit de los inputs de las fichas.
   * @param {object} newValue Información del evento submit de los forms de fichas.
   */
  handleValueChange( newValue ) {
    const {valueChange} = this.state

    if ( valueChange ) {
      this.setState( {
        loading: false,
        valueChange: !valueChange,
        successOperation: false
      } )
    }
  }

  /**
   * Maneja la presencia del modal de confirmación de cambios.
   */
  handleModal() {
    const {isModalVisible} = this.state

    this.setState( {
      loading: false,
      isModalVisible: !isModalVisible
    } )
  }

  /**
   * Muestra una notificación al usuario
   * @param {string} type Tipo de mensaje que se quiere mostrar.
   * @param {string} message Título del mensaje a mostrar. 
   * @param {string} description Descripción del mensaje a mostrar.
   */
  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  /**
   * Actualiza a la API los nuevos valores ingresados por usuario,
   * valida los campos, y luego se los envia a la API.
   */
  updateChipsValues() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        
        const chips = this.formatChipsData( values )

        this.api.updateChipsValues( chips )
          .then( response => {
            this.handleModal()
            
            if ( response.status === 200 ) {
              this.setState( {
                loading: false,
                valueChange: false,
                successOperation: true,
                isModalVisible: false
              } )  
            } else {
              //TODO: Error managment
              this.errorManagment.resolveError( response.data )
            }
            
          } )
          .catch( err => {
            this.handleModal()
            //this.openNotification('error', 'Error', err.message)
            console.log( err )
            this.errorManagment.resolveError( {error: err.message} )
          } )
      }
    })
  }

  /**
   * Randeriza la vista del componente.
   * @returns {string} HTML markup del componente.
   */
  render() {
 
    const { getFieldDecorator, setFieldsValue } = this.props.form
    const { loading, valueChange, isModalVisible } = this.state
    const changeMessage = this.state.valueChange ? (<Alert style={{width: 'max-content'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    this.state.successOperation ? this.openNotification( 'success', 'Operación exitosa', 'Se han guardado los cambios con éxito.' ) : () => {}

    const loadingSpin = loading ? (
      <Icon 
        type="loading" 
        style={{ fontSize: '50px', display: 'block', margin: 'auto', marginBottom: '40px' }}
      /> ) : ''

    return(
      <Form onSubmit={this.handleSubmit}>
        {changeMessage}
        {loadingSpin}

        <Row style={{marginTop: '40px', marginBottom: '70px'}}>
          <Col span={4}>
            <ChipItem 
              img={aquaChip}
              valueChange={this.handleValueChange}
              chip = "aqua"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blackChip}
              valueChange={this.handleValueChange}
              chip = "black"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={blueChip}
              valueChange={this.handleValueChange}
              chip = "blue"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={greenChip}
              valueChange={this.handleValueChange}
              chip = "green"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={4} offset={1}>
            <ChipItem 
              img={orangeChip}
              valueChange={this.handleValueChange}
              chip = "orange"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>
        </Row>

        <Row style={{marginBottom: '60px'}}>
          <Col span={6}>
            <ChipItem 
              img={pinkChip}
              valueChange={this.handleValueChange}
              chip = "pink"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={purpleChip}
              valueChange={this.handleValueChange}
              chip = "purple"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={redChip}
              valueChange={this.handleValueChange}
              chip = "red"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>

          <Col span={6}>
            <ChipItem 
              img={grayChip}
              valueChange={this.handleValueChange}
              chip = "white"
              avaible = {loading}
              fieldDecorator = {getFieldDecorator}
            />         
          </Col>
        </Row>

        <FormItem style={{textAlign: 'center'}}>
          <Button disabled={!valueChange} size="large" type="primary" htmlType="submit" icon="save">
            Guardar Cambios
          </Button>

          <Modal
            title="Actualizar Fichas"
            visible={isModalVisible}
            onOk={this.updateChipsValues}
            onCancel={this.handleModal}
          >
            <p>¿Desea actualizar los valores de las fichas?</p>
              
          </Modal>
        </FormItem>
      </Form>
    )
  }
}

const WrappedChipsForm = Form.create()(ChipsSection);
module.exports = WrappedChipsForm
