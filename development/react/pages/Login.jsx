import React, {Component} from 'react'
import { Alert, Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import Api from '../controllers/Api'

import './styles/login.css'

const FormItem = Form.Item

class Login extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      wrongCredentials: false
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const errorMsg = this.state.wrongCredentials ? <Alert message="User or password incorrect, try again." type="error" showIcon />: ''

    return(
      <div className="login-background">

        <Row>
          <Col 
            span={12} 
            offset={6} 
            xs={{span: 24, offset: 0}}
          >
            <div className="form-section">
              <h1 className="login-title">Administrador del Casino</h1>

              <Form
                className="login-form"
              >
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your Email!' }],
                  })(
                    <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Ingrese su Usuario" />
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Ingrese su contraseña" />
                  )}
                </FormItem>

                { errorMsg }

                <FormItem>
                  <Button size="large" type="primary" htmlType="submit" className="login-form-button">
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