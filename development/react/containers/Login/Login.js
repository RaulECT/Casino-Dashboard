import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  Button,
  Row,
  Col,
  Input,
  Alert
} from 'antd'

import './Login.css'
import { auth } from '../../store/actions/index'

const FormItem = Form.Item
const styles = {
  img: { width: '100%' },
  icon: { color: 'rgba(0,0,0,.25)' }
}

class Login extends Component {


  onHandleLogin = ( e ) => {
    e.preventDefault()

    this.props.form.validateFields( ( error, values ) => {
      if ( !error ) {
        this.props.onAuth( values.userName, values.password )
      }
    } )
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const errorAlert = this.props.error ? (
      <Alert 
        message="Usuario y/o contraseña incorrectos"
        description="Ingrese un email y correo validos."
        type="error"
        showIcon
      />
    ) : null

    return(
      <Row>
        <Col
          span={12}
          offset={6}
          xs={ { span: 24, offset: 0 } }
        >
          <div className="form-section">
            <h1 className="login-title">Bingo Dashboard</h1>

            <Form
              className="login-form"
              onSubmit={this.onHandleLogin}
            >
              <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Ingrese su e-mail!' }],
                })(
                <Input
                  size="large"
                  placeholder="E-mail"
                  disabled={this.props.loading}
                  prefix={ <Icon type="user" style={ styles.icon } /> }
                />  
              )}
                
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Ingrese su contraseña!' }],
                  })(
                   <Input 
                    size="large"
                    placeholder="Password"
                    disabled={this.props.loading}
                    prefix={ <Icon type="lock" style={ styles.icon } /> }
                  /> 
                )}

                
              </FormItem>
              
              { errorAlert }

              <FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={ this.props.loading }
                >Iniciar Sesión</Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: ( email, password ) => dispatch( auth( email, password ) )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default connect( mapStateToProps, mapDispatchToProps )(WrappedNormalLoginForm)