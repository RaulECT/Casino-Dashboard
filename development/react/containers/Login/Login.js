import React, {Component} from 'react'
import {
  Form,
  Icon,
  Button,
  Row,
  Col,
  Input,
  notification
} from 'antd'

import './Login.css'

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
        // TODO: REPLACE WITH API CALL
        if ( values.userName === 'a@b.com' && values.password === '123' ) {
          this.props.history.push( '/dashboard' )
        } else {
          notification['error']({
            message: 'Usuario y/o Contraseña erroneas',
            description: 'No se encontro a ningún usuario con ese correo y/o contraseña',
          })
        }
      }
    } )
  }

  render() {
    const { getFieldDecorator } = this.props.form

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
                    prefix={ <Icon type="lock" style={ styles.icon } /> }
                  /> 
                )}

                
              </FormItem>

              <FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >Iniciar Sesión</Button>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm