import React, { Component } from 'react'

import {
  Form,
  Divider,
  Input,
  Select,
  Button
} from 'antd'

const FormItem = Form.Item
const { Option } = Select

class CreateGame extends Component {

  render() {
    return(
      <Form>
        <Divider orientation="left">Información General</Divider>
        <FormItem
          label="Nombre del Juego:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="Orden de Partida:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="Fecha de Juego:"
        >
          <Input />
        </FormItem> 

        <Divider orientation="left">Inscripciones</Divider>
        <FormItem
          label="Precio Sencillo:"
        >
          <Input />
        </FormItem>

        <FormItem
          label="Precio Doble:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="Precio Triple:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="Precio Electronico:"
        >
          <Input />
        </FormItem> 

        <Divider orientation="left">Premios</Divider>
        <FormItem
          label="Patron de Premio de Línea:"
        >
          <Select
            placeholder="Seleccione un patron"
          >
            <Option value="linea">Linea</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Patron de Premio de Lotería:"
        >
          <Select
            placeholder="Seleccione un patron"
          >
            <Option value="doble">DOBLE LINEA</Option>
          </Select>
        </FormItem>

        <FormItem
          label="Premio de Linea:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Linea:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="Premio de Lotería:"
        >
          <Input />
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Lotería:"
        >
          <Input />
        </FormItem> 

        <Button
          type="primary"
          size="large"
        >
          Crear Partida
        </Button>
      </Form>
    )
  }
}

export default CreateGame