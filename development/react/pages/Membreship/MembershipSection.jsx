import React, {Component} from 'react'
import {
  Form,
  Input,
  Button
} from 'antd'

const FormItem = Form.Item

class MembershipSection extends Component {
  render() {

    return(
      <Form layout="inline">
        <FormItem
          label="Costo de Membresia:"
        >
          <Input addonBefore="$" />
        </FormItem>

        <FormItem
          label="Reposición de Tarjeta:"
        >
          <Input addonBefore="$" />
        </FormItem>

        <FormItem>
          <Button 
            icon="save"
            type="primary" 
          >
            Guardar Cambios
          </Button>
        </FormItem>
      </Form>
    )
  }
}

module.exports = MembershipSection