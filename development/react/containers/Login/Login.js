import React, {Component} from 'react'
import {
  Form,
  Icon,
  Button,
  Row,
  Col,
  Input
} from 'antd'

import './Login.css'

const FormItem = Form.Item
const styles = {
  img: { width: '100%' },
  icon: { color: 'rgba(0,0,0,.25)' }
}

class Login extends Component {

  render() {
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
            >
              <FormItem>
                <Input
                  size="large"
                  placeholder="E-mail"
                  prefix={ <Icon type="user" style={ styles.icon } /> }
                />
              </FormItem>

              <FormItem>
                <Input 
                  size="large"
                  placeholder="Password"
                  prefix={ <Icon type="lock" style={ styles.icon } /> }
                />
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

export default Login