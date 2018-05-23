
import React, {Component} from 'react'
import { Alert, Form, Icon, Input, Button, Checkbox, Row, Col, notification } from 'antd'
import Api from '../controllers/Api'

import './styles/login.css'

const FormItem = Form.Item

class Login extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      wrongCredentials: false,
      errorMessage: '',
      isShowingSpin: false
    }

    this.api = new Api()
    this.handleLoginSubmit = this.handleLoginSubmit.bind( this )
    this.handleLoadingSpin = this.handleLoadingSpin.bind( this )
    this.redirectToDashboard = this.redirectToDashboard.bind( this )
  }

  componentWillMount() {
    if ( localStorage.isLogin == 'true' ) {
      // TODO: Router redirectt to /dashboard
      this.props.history.push( '/dashboard/configuraciones_generales' )
    }
  }

  handleLoginSubmit( event ) {
    event.preventDefault()

    this.props.form.validateFields( ( error, values ) => {
      if ( !error ) {
        this.handleLoadingSpin()

        this.api.passwordLogin( values.userName, values.password )
          .then( response => {
            this.handleLoadingSpin()
            if ( response.data.success ) {
              localStorage.setItem( 'user', values.userName )
              this.redirectToDashboard( response.data )
            } else {
              this.setState( {
                wrongCredentials: true,
                errorMessage: response.data.message.charAt(0).toUpperCase() + response.data.message.slice(1), // Convert first letter to uppercase
              } )
            }
          } )
          .catch( error => {
            this.handleLoadingSpin()
            this.showErrorNotification( `Ha ocurrido un error interno. Favor de volver a intentarlo. ${error}` )
          } )
      } 
    } )
  }

  redirectToDashboard( data ) {
    localStorage.setItem( 'token', data.result.token )
    localStorage.setItem( 'isLogin', 'true' )
    
    // TODO: Router Redirect to /dashboard
    this.props.history.push( '/dashboard/configuraciones_generales' )
  }

  handleLoadingSpin() {
    this.setState( { isShowingSpin: !this.state.isShowingSpin } )
  }

  showErrorNotification( description ) {
    notification['error']({
      message: 'Error interno',
      description
    } )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {wrongCredentials, errorMessage, isShowingSpin} = this.state
    const errorMsg = wrongCredentials ? <Alert style={ { textAlign: 'left' } } message={errorMessage} type="error" showIcon />: ''
    const loadinSpin = isShowingSpin ? 
      (<div className="loading-section">
        <Icon className="loading-icon" type="loading" />
      </div> ) : ''

    return(
      <div className="login-background">

        <Row>
          <Col 
            span={12} 
            offset={6} 
            xs={{span: 24, offset: 0}}
          >
            <div className="form-section">
              <h1 className="login-title">Modulo de Administración</h1>

              <Form
                onSubmit={this.handleLoginSubmit}
                className="login-form"
              >
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Ingrese su e-mail!' }],
                  })(
                    <Input disabled={isShowingSpin} size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Nombre de Usuario" />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Ingrese su contraseña!' }],
                  })(
                    <Input disabled={isShowingSpin} size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                  )}
                </FormItem>

                { errorMsg }
                { loadinSpin }

                <FormItem>
                  <Button disabled={isShowingSpin} size="large" type="primary" htmlType="submit" className="login-form-button">
                    Iniciar Sesión
                  </Button>
                </FormItem>
              </Form>
            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
module.exports = WrappedNormalLoginForm