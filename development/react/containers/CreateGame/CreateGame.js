import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  Form,
  Divider,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber
} from 'antd'
import { createGame } from '../../store/actions/index'

const FormItem = Form.Item
const { Option } = Select
const styles = {
  input: {
    width: '100%'
  }
}

class CreateGame extends Component {

  handleOnSubmitForm = ( e ) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onCreateGame( values )
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form 

    return(
      <Form onSubmit={this.handleOnSubmitForm}>
        <Divider orientation="left">Información General</Divider>
        <FormItem
          label="Nombre del Juego:"
        >
          {getFieldDecorator('gameName', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <Input size="large" /> 
          )}
          
        </FormItem> 

        <FormItem
          label="Orden de Partida:"
        >
          {getFieldDecorator('orderGame', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber size="large" min={0} style={styles.input} />
          )}
         
        </FormItem> 

        <FormItem
          label="Fecha de Juego:"
        > 
          {getFieldDecorator('gameDate', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <DatePicker size="large" style={styles.input} />
          )}
          
        </FormItem> 

        <Divider orientation="left">Inscripciones</Divider>
        <FormItem
          label="Precio Sencillo:"
        >
          {getFieldDecorator('singlePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
           />
          )}
        </FormItem>

        <FormItem
          label="Precio Doble:"
        >
          {getFieldDecorator('doublePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
           />
          )}
        </FormItem> 

        <FormItem
          label="Precio Triple:"
        >
          {getFieldDecorator('triplePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
            />
          )}
        </FormItem> 

        <FormItem
          label="Precio Electronico:"
        >
          {getFieldDecorator('electronicPrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
            />
          )}
        </FormItem> 

        <Divider orientation="left">Premios</Divider>
        <FormItem
          label="Patron de Premio de Línea:"
        >
          {getFieldDecorator('linePatron', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <Select
              placeholder="Seleccione un patron"
              size="large"
            >
              <Option value="doble">DOBLE LINEA</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Patron de Premio de Lotería:"
        >
          
          {getFieldDecorator('bingoPatron', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <Select
              placeholder="Seleccione un patron"
              size="large"
            >
              <Option value="doble">DOBLE LINEA</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Premio de Linea:"
        >
          {getFieldDecorator('lineAward', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
            />
          )}
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Linea:"
        >
          {getFieldDecorator('percentageAward', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <InputNumber 
            min={0}
            formatter={value => `${value}%`}
            parser={value => value.replace('%', '')}
            style={ styles.input }
            size="large"
           />
          )}
        </FormItem> 

        <FormItem
          label="Premio de Lotería:"
        >
          {getFieldDecorator('bingoAward', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
            /> 
          )}
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Lotería:"
        >
          {getFieldDecorator('consolationAward', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              style={ styles.input }
              size="large"
            />
          )}
        </FormItem> 

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          icon="plus"
        >
          Crear Partida
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dsh.loading, 
    error: state.dsh.error
  }
  
}

const mapDispatchToProps = disparch => {
  return {
    onCreateGame: ( gameInfo ) => disparch( createGame( gameInfo ) )
  }
}

const WrappedCreateGameForm = Form.create()(CreateGame)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateGameForm)