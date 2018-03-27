import React, {Component} from 'react'
import {
  Alert,
  Form,
  Input,
  Modal,
  Button
} from 'antd'
import Api from '../../controllers/Api'

const FormItem = Form.Item

class MembershipSection extends Component {
  constructor( props ) {
    super(props)

    this.state = {
      success: false,
      change: false,
      membershipPayment: 0.0,
      cardReposition: 0.0,
      saveChangesModal: false
    }

    this.api = new Api()

    this.handleInputsChange = this.handleInputsChange.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveMemebershipValues = this.saveMemebershipValues.bind( this )
  }

  componentWillMount() {
    this.api.getMembershipValues()
      .then( response => {
        console.log(response)
        this.setState( {
          success: this.state.success,
          change: this.state.change,
          membershipPayment: Number(response.membershipPayment/100),
          cardReposition: Number(response.cardReposition/100),
          saveChangesModal: this.state.saveChangesModal
        } )

        this.props.form.setFieldsValue( { membershipPayment: Number(this.state.membershipPayment ) } )
        this.props.form.setFieldsValue( { cardReposition: Number(this.state.cardReposition ) } )
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  handleSaveModal() {
    this.setState( {
      success: this.state.success,
      change: this.state.change,
      membershipPayment: this.state.membershipPayment,
      cardReposition: this.state.cardReposition,
      saveChangesModal: !this.state.saveChangesModal
    } )
  }

  handleInputsChange() {
    this.setState( {
      success: false,
      change: true,
      membershipPayment: this.state.membershipPayment,
      cardReposition: this.state.cardReposition,
      saveChangesModal: this.state.saveChangesModal
    } )
  }

  saveMemebershipValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        values.membershipPayment = Number( values.membershipPayment )
        this.api.updateMembershipValues( values )
          .then( response => {
            this.handleSaveModal()

            if ( response.status === 200 ) {

              this.setState( {
                success: true,
                change: false,
                membershipPayment: this.state.membershipPayment,
                cardReposition: this.state.cardReposition,
                saveChangesModal: false
              } )
            } else {
              // TODO: Error managment
            }
          } )
          .catch( err => {
            this.handleSaveModal()

            console.log(err)
          } )
      }
    } )
  }

  render() {
    const {getFieldDecorator} =  this.props.form
    const changeMessage = this.state.change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    const successMessage = this.state.success ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han guardado los cambios con éxito." type="success" showIcon />) : ''

    return(
      <Form layout="inline">
        {changeMessage}
        {successMessage}

        <FormItem
          label="Costo de Membresia:"
        >
          {getFieldDecorator( 'membershipPayment', {
            rules: [
              { required: true, message: 'Ingrese un valor!' }]
          } )(
            <Input onChange={this.handleInputsChange} addonBefore="$" />
          )}
          
        </FormItem>

        <FormItem
          label="Reposición de Tarjeta:"
        >
          {getFieldDecorator( 'cardReposition', {
            rules: [
              { required: true, message: 'Ingrese un valor!' }]
          } )(
            <Input onChange={this.handleInputsChange} addonBefore="$" />
          )}
          
        </FormItem>

        <FormItem>
          <Button 
            disabled={!this.state.change}
            icon="save"
            type="primary" 
            onClick={this.handleSaveModal}
          >
            Guardar Cambios
          </Button>

          <Modal
            title="Actualizar Valores"
            visible={this.state.saveChangesModal}
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