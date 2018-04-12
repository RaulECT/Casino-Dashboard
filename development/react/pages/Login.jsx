import React, {Component} from 'react'
import { Alert, Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
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
            //console.log( response.data )
            this.handleLoadingSpin()
            if ( response.data.success ) {
              this.redirectToDashboard( response.data )
            } else {
              this.setState( {
                wrongCredentials: true,
                errorMessage: response.data.message.charAt(0).toUpperCase() + response.data.message.slice(1), // Convert first letter to uppercase
                isShowingSpin: this.state.isShowingSpin
              } )
            }
          } )
          .catch( error => {
            this.handleLoadingSpin()
            //TODO: Implement errors handling
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
    this.setState( {
      wrongCredentials: this.state.wrongCredentials,
      errorMessage: this.state.errorMessage,
      isShowingSpin: !this.state.isShowingSpin
    } )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const errorMsg = this.state.wrongCredentials ? <Alert style={ { textAlign: 'left' } } message={this.state.errorMessage} type="error" showIcon />: ''
    const loadinSpin = this.state.isShowingSpin ? 
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
              <h1 className="login-title">Casino Dashboard</h1>

              <Form
                onSubmit={this.handleLoginSubmit}
                className="login-form"
              >
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                  })(
                    <Input disabled={this.state.isShowingSpin} size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input disabled={this.state.isShowingSpin} size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>

                { errorMsg }
                { loadinSpin }

                <FormItem>
                  <Button disabled={this.state.isShowingSpin} size="large" type="primary" htmlType="submit" className="login-form-button">
                    Log In
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