import React, {Component} from 'react'
import {
  Alert,
  Form,
  TimePicker,
  InputNumber,
  Modal,
  Button
} from 'antd'
import moment from 'moment'
import Api from '../../controllers/Api'

const FormItem = Form.Item

class SchedulesSection extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      change: false,
      success: false,
      saveModal: false
    }

    this.api = new Api()

    this.handleInputsChange = this.handleInputsChange.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveScheduleValues = this.saveScheduleValues.bind( this )
  }

  componentWillMount() {
    this.api.getScheduleValues()
      .then( response => {
        console.log(response)

        this.props.form.setFieldsValue( {beginWorkingDay: moment(response.beginWorkingDay, 'HH:mm') } )
        this.props.form.setFieldsValue( {endWorkingDay: moment(response.endWorkingDay, 'HH:mm') } )
        this.props.form.setFieldsValue( {intervalMinutesSchedules: response.intervalMinutesSchedules } )
        this.props.form.setFieldsValue( {intervalMinutesScores: response.intervalMinutesScores } )
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  handleInputsChange() {
    this.setState( {
      change: true,
      success: false,
      saveModal: this.state.saveModal
    } )
  }

  handleSaveModal() {
    this.setState( {
      change: this.state.change,
      success: this.state.success,
      saveModal: !this.state.saveModal
    } )
    
  }

  saveScheduleValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        const beginWorkingDay = values.beginWorkingDay.format('LT').split(' ')[0].toString()
        const endWorkingDay = values.endWorkingDay.format('LT').split(' ')[0].toString()

        values.beginWorkingDay = beginWorkingDay
        values.endWorkingDay = endWorkingDay

        this.api.setScheduleValues( values )
          .then( response => {
            console.log(response)
            if ( response.data.success ) {
              this.setState( {
                success: true,
                change: false,
                saveModal: !this.state.saveModal
              } )
            } else {
              // TODO: Error managment
            }
          } )
          .catch( err => {
            console.log(err)
          } )
      }
    } )
  }

  render() {
    const format = 'HH:mm'
    const style = {width: '100%'}
    const {getFieldDecorator} =  this.props.form
    const changeMessage = this.state.change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    const successMessage = this.state.success ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han guardado los cambios con éxito." type="success" showIcon />) : ''

    return(
      <div>
        <Form layout="inline">
          {changeMessage}
          {successMessage}

          <FormItem
            label="Hora de Apertura:"
            style={ {marginRight: '40px'} }
          >
            {getFieldDecorator( 'beginWorkingDay', {
              rules: [
              { required: true, message: 'Ingrese un valor!' }]
            } )(
              <TimePicker 
                style={style} 
                format={format} 
                onChange={this.handleInputsChange}
              />
            )}
            
            
          </FormItem>

          <FormItem
            label="Hora de Cierre:"
            style={ {marginRight: '40px'} }
          >
            {getFieldDecorator( 'endWorkingDay', {
              rules: [
              { required: true, message: 'Ingrese un valor!' }]
            } )(
              <TimePicker 
                style={style} 
                format={format} 
                onChange={this.handleInputsChange}
              />
            )}
            
          </FormItem>

          <FormItem
            label="Repartir rota cada (min):"
            style={ {marginRight: '40px', marginTop: '40px'} }
          >
            {getFieldDecorator( 'intervalMinutesSchedules', {
              rules: [
              { required: true, message: 'Ingrese un valor!' }]
            } )(
              <InputNumber 
                style={style} 
                onChange={this.handleInputsChange}
              />
            )}
            
          </FormItem>

          <FormItem
            label="Repartir score cada (min):"
            style={ {marginRight: '40px', marginTop: '40px'} }
          >
            {getFieldDecorator( 'intervalMinutesScores', {
              rules: [
              { required: true, message: 'Ingrese un valor!' }]
            } )(
              <InputNumber 
                style={style} 
                onChange={this.handleInputsChange}  
              />
            )}
            
          </FormItem>

          <FormItem>
            <Button
              icon="save"
              type="primary" 
              disabled={!this.state.change}
              style={{marginTop: '30px'}}
              onClick={this.handleSaveModal}
            >
              Guardar Cambios
            </Button>

            <Modal
              title="Actualizar Valores"
              visible={this.state.saveModal}
              onOk={this.saveScheduleValues}
              onCancel={this.handleSaveModal}
            >
              <p>¿Desea actualizar los valores?</p>
              
            </Modal>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedScheduleForm = Form.create()(SchedulesSection)
module.exports = WrappedScheduleForm
