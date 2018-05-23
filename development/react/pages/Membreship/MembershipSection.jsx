/**
 * Componente que represente la sección de precios de membresias.
 * @namespace MembershipSection
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Icon,
  Alert,
  Form,
  Input,
  Modal,
  Button,
  notification
} from 'antd'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

const FormItem = Form.Item

class MembershipSection extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
  constructor( props ) {
    super(props)

    this.state = {
      loading: true,
      success: false,
      change: false,
      membershipPayment: 0.0,
      cardReposition: 0.0,
      saveChangesModal: false
    }

    this.api = new Api()
    this.errorManagment = new ErrorManagment()

    this.handleInputsChange = this.handleInputsChange.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveMemebershipValues = this.saveMemebershipValues.bind( this )
  }

  /**
   * Función que carga desde la API los datos de membrsía guardados. 
   */
  componentWillMount() {
    this.api.getMembershipValues()
      .then( response => {
        console.log(response)
        this.setState( {
          loading: false,
          membershipPayment: Number(response.membershipPayment/100),
          cardReposition: Number(response.cardReposition/100)
        } )

        this.props.form.setFieldsValue( { membershipPayment: Number(this.state.membershipPayment ) } )
        this.props.form.setFieldsValue( { cardReposition: Number(this.state.cardReposition ) } )
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  /**
   * Función que se encarga de la presencia del modal de confirmación de cambios.
   */
  handleSaveModal() {
    const {saveChangesModal} = this.state

    this.setState( {
      loading: false,
      saveChangesModal: !saveChangesModal
    } )
  }

  /**
   * Función que detecta los cambios en los campos de texto.
   */
  handleInputsChange() {
    this.setState( {
      loading: false,
      success: false,
      change: true,
    } )
  }

  /**
   * Muestra un mensaje al usuario.
   * @param {string} type Tipo de mensaje que se le mostrara al usuario. 
   * @param {string} message Mensaje que se le mostrara al usuario. 
   * @param {*} description Decripción del mensaje.
   */
  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  /**
   * Guarda los cambios realizados a los precios de membresía en la API.
   */
  saveMemebershipValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        values.membershipPayment = Number( values.membershipPayment )
        this.api.updateMembershipValues( values )
          .then( response => {
            this.handleSaveModal()

            if ( response.status === 200 ) {

              this.setState( {
                loading: false,
                success: true,
                change: false,
                saveChangesModal: false
              } )
            } else {
              // TODO: Error managment
              this.errorManagment.resolveError( response.data )
            }
          } )
          .catch( err => {
            this.handleSaveModal()

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
    const {loading, change, saveChangesModal, success} = this.state

    const {getFieldDecorator} =  this.props.form
    const changeMessage = change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    success ? this.openNotification( 'success', 'Operación exitosa', 'Se han guardado los cambios con éxito.' ) : () => {}
    const loadingSpin = loading ? (
      <Icon 
        type="loading" 
        style={{ fontSize: '50px', display: 'block', margin: 'auto', marginBottom: '40px' }}
      /> ) : ''

    return(
      <Form layout="inline">
        {changeMessage}
        {loadingSpin}

        <FormItem
          label="Costo de Membresia:"
        >
          {getFieldDecorator( 'membershipPayment', {
            rules: [
              { required: true, message: 'Ingrese un valor!' }]
          } )(
            <Input disabled={loading} onChange={this.handleInputsChange} addonBefore="$" />
          )}
          
        </FormItem>

        <FormItem
          label="Reposición de Tarjeta:"
        >
          {getFieldDecorator( 'cardReposition', {
            rules: [
              { required: true, message: 'Ingrese un valor!' }]
          } )(
            <Input disabled={loading} onChange={this.handleInputsChange} addonBefore="$" />
          )}
          
        </FormItem>

        <FormItem>
          <Button 
            disabled={!change}
            icon="save"
            type="primary" 
            onClick={this.handleSaveModal}
          >
            Guardar Cambios
          </Button>

          <Modal
            title="Actualizar Valores"
            visible={saveChangesModal}
            onOk={this.saveMemebershipValues}
            onCancel={this.handleSaveModal}
          >
            <p>¿Desea actualizar los valores?</p>
              
          </Modal>
        </FormItem>
      </Form>
    )
  }
}

const WrappedMembershipForm = Form.create()(MembershipSection)
module.exports = WrappedMembershipForm