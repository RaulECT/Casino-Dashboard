import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import {
  Form,
  Divider,
  Input,
  Select,
  Button,
  DatePicker,
  InputNumber,
  TimePicker
} from 'antd'
import { createGame } from '../../store/actions/index'

const FormItem = Form.Item
const { Option } = Select
const format = 'HH:mm'
const styles = {
  input: {
    width: '100%'
  }
}

class CreateGame extends Component {

  state = {
    isSelectedDateCurrentDate: true
  }

  handleOnGameDateChange = ( e ) => {
    this.setState( { isSelectedDateCurrentDate: !moment().isBefore( e ) } )
  }

  handleOnSubmitForm = ( e ) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const dateString = values.gameDate.format('YYYY-DD-MM') 
        const hourString = values.gameHour.format('HH:mm:ss') 
        values.gameDate = moment( `${dateString} ${hourString}`, 'YYYY-DD-MM h:mm:ss Z' ).format()
        
        this.props.onCreateGame( values, this.props.form.resetFields )
      }
    })
  }

  disabledDate = ( current ) => {
    return current && current < moment().startOf('day')
  }

  disabledHours = () => {
    const { isSelectedDateCurrentDate } = this.state
    const currentHour = ( new Date() ).getHours()
    const hoursRange = isSelectedDateCurrentDate ? this.range( 0, currentHour ) : this.range( 0, 0 )
 
    return hoursRange
  }

  disabledMinutes = () => {
    const { isSelectedDateCurrentDate } = this.state
    const minute = ( new Date() ).getMinutes()
    const minutesRange = isSelectedDateCurrentDate ? this.range( 0, minute ) : this.range( 0, 0 )
 
    return minutesRange
  }

  disabledSeconds = () => {
    const { isSelectedDateCurrentDate } = this.state
    const second = ( new Date() ).getSeconds()
    const secondsRange = isSelectedDateCurrentDate ? this.range( 0, second ) : this.range( 0, 0 )
 
    return secondsRange
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
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
            rules: [{ 
              required: true, 
              message: 'Este campo no puede estar vacio y debe contener al menos 5 caracteres!',
              min: 5, }],
          })(
           <Input 
            size="large" 
            disabled={this.props.loading} 
            placeholder="El nombre de la pártida debe contener al menos 5 letras..."
           /> 
          )}
          
        </FormItem> 

        <FormItem
          label="Fecha de Juego:"
        > 
          {getFieldDecorator('gameDate', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <DatePicker 
            size="large" 
            style={styles.input} 
            disabledDate={this.disabledDate}
            disabled={this.props.loading}
            onChange={ this.handleOnGameDateChange }
          />
          )}
          
        </FormItem> 

        <FormItem
          label="Hora de Juego:"
        > 
          {getFieldDecorator('gameHour', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <TimePicker 
            size="large"  
            format={format}
            style={styles.input} 
            disabled={this.props.loading}
            disabledHours={this.disabledHours}
            disabledMinutes={ this.disabledMinutes }
            disabledSeconds={ this.disabledSeconds }
            hideDisabledOptions
          />
          )}
          
        </FormItem> 

        <Divider orientation="left">Inscripciones</Divider>
        <FormItem
          label="Precio Sencillo:"
        >
          {getFieldDecorator('singlePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 10
          })(
           <InputNumber 
              min={10}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
           />
          )}
        </FormItem>

        <FormItem
          label="Precio Doble:"
        >
          {getFieldDecorator('doublePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 15
          })(
            <InputNumber 
              min={15}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
           />
          )}
        </FormItem> 

        <FormItem
          label="Precio Triple:"
        >
          {getFieldDecorator('triplePrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 20
          })(
            <InputNumber 
              min={1}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
            />
          )}
        </FormItem> 

        <FormItem
          label="Precio Electronico:"
        >
          {getFieldDecorator('electronicPrice', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 1
          })(
            <InputNumber 
              min={1}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
            />
          )}
        </FormItem> 

        <Divider orientation="left">Premios</Divider>
        <FormItem
          label="Patron de Premio de Línea:"
        >
          {getFieldDecorator('linePattern', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <Select
              placeholder="Seleccione un patron"
              size="large"
              disabled={this.props.loading}
            >
              <Option value="LINEA">LINEA</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Patron de Premio de Lotería:"
        >
          
          {getFieldDecorator('lotteryPattern', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <Select
              placeholder="Seleccione un patron"
              size="large"
              disabled={this.props.loading}
            >
              <Option value="DOBLE LINEA">DOBLE LINEA</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          label="Premio de Linea:"
        >
          {getFieldDecorator('linePrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 50
          })(
            <InputNumber 
              min={1}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
            />
          )}
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Linea:"
        >
          {getFieldDecorator('lineConsPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
           <InputNumber 
            min={0}
            max={100}
            formatter={value => `%${value}`}
            style={ styles.input }
            size="large"
            disabled={this.props.loading}
           />
          )}
        </FormItem> 

        <FormItem
          label="Premio de Lotería:"
        >
          {getFieldDecorator('lotteryPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
            initialValue: 150
          })(
            <InputNumber 
              min={1}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
            /> 
          )}
        </FormItem> 

        <FormItem
          label="% Premio de Consolación de Lotería:"
        >
          {getFieldDecorator('lotteryConsoPrize', {
            rules: [{ required: true, message: 'Este campo no puede estar vacio!' }],
          })(
            <InputNumber 
              min={0}
              max={100}
              formatter={value => `%${value}`}
              style={ styles.input }
              size="large"
              disabled={this.props.loading}
            />
          )}
        </FormItem> 

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          icon="plus"
          loading={this.props.loading}
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
    onCreateGame: ( gameInfo, onResetFields ) => disparch( createGame( gameInfo, onResetFields ) )
  }
}

const WrappedCreateGameForm = Form.create()(CreateGame)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateGameForm)