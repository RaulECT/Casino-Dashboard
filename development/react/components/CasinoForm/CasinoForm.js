import React, {Component} from 'react'

import {
  Form,
  Icon,
  Input,
  Button,
  Divider
} from 'antd'

const hasErrors = fieldsError => {
  return Object.keys( fieldsError ).some( field => fieldsError[field] )
}

class CasinoForm extends Component {

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields( ( err, values ) => {
      console.log(err)
      if ( !err ) {
        console.log( 'Recived values: ', values )
      }
    } )
  }

  render() {
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = this.props.form

    const casinoNameError = isFieldTouched( 'casinoName' ) && getFieldError( 'casinoName' )
    const casinoAddressError = isFieldTouched( 'casinoAddress' ) && getFieldError( 'casinoAddress' )
    const casinoPhoneError = isFieldTouched( 'casinoPhone' ) && getFieldError( 'casinoPhone' )

    return(
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
      >
        <Divider orientation="left">Información Básica</Divider>
        <Form.Item
          validateStatus={ casinoNameError ? 'error' : '' }
          help={ casinoNameError || '' }
        >
          { getFieldDecorator( 'casinoName', {
            rules: [ { required: true, message: 'Ingrese el nombre del casino!' } ]
          } )(
            <Input 
              prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Nombre del casino" 
              size="large"  
            />
          ) }
        </Form.Item>
        
        <Form.Item
          validateStatus={ casinoAddressError ? 'error' : '' }
          help={ casinoAddressError || '' }
        >
          { getFieldDecorator( 'casinoAddress', {
            rules: [ { required: true, message: 'Ingrese la dirección del casino!' } ]
          } )(
            <Input 
              prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Dirección del casino" 
              size="large"
            /> 
          ) }
        </Form.Item>
        
        <Form.Item
          validateStatus={ casinoPhoneError ? 'error' : '' }
          help={ casinoPhoneError || '' }
        >
          { getFieldDecorator( 'casinoPhone', {
            rules: [ { required: true, message: 'Ingrese el telefono del casino!' } ]
          } )(
            <Input 
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Telefono del casino" 
              size="large"
            />
          ) }
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={ hasErrors( getFieldsError() ) }
          >
            Crear Casino
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedCasinoForm = Form.create()( CasinoForm )
export default WrappedCasinoForm