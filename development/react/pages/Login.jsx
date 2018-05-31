/**
 * Componente que representa al Login para entrear al Dashboard.
 * @namespace Login
 * @extends Component
 */
import React, {Component} from 'react'
import { Alert, Form, Icon, Input, Button, Checkbox, Row, Col, notification, Tabs } from 'antd'
import Api from '../controllers/Api'
import FingerLogin from './Login/FingerLogin.jsx'

import './styles/login.css'

const TabPane = Tabs.TabPane 
const FormItem = Form.Item

class Login extends Component {

  /**
   * Crea el componente.
   * @param {object} props 
   */
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

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentWillMount() {
    if ( localStorage.isLogin == 'true' ) {
      // TODO: Router redirectt to /dashboard
      this.props.history.push( '/dashboard/configuraciones_generales' )
    }
  }

  /**
   * Función que maneja ek evento submit del formulario de inicio se sesión.
   * @param {object} event Evento lanzado por el formulario de inicio de sesión.
   */
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

  /**
   * Redirige al usuario a la vista principal del Dashboard.
   * @param {object} data Información complementaria del usuario propocionada por el servidor.
   */
  redirectToDashboard( data ) {
    localStorage.setItem( 'token', data.result.token )
    localStorage.setItem( 'isLogin', 'true' )
    
    // TODO: Router Redirect to /dashboard
    this.props.history.push( '/dashboard/configuraciones_generales' )
  }

  /**
   * Maneja la presencia del icono spin.
   */
  handleLoadingSpin() {
    this.setState( { isShowingSpin: !this.state.isShowingSpin } )
  }

  /**
   * Muestra una notificación al usuario en caso de algún error.
   * @param {string} description Descripción del error ocurrido. 
   */
  showErrorNotification( description ) {
    notification['error']({
      message: 'Error interno',
      description
    } )
  }

  /**
   * Randeriza la vista del componente.
   * @returns {string} HTML markup del componente.
   */
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

              <Tabs defaultActiveKey="1">
                <TabPane tab="Password" key="1">
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
                </TabPane>
                <TabPane tab="Huella" key="2">
                  <FingerLogin
                    push={this.props.history.push}
                  />
                </TabPane>
              </Tabs>

            </div>
          </Col>
        </Row>

      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
module.exports = WrappedNormalLoginForm