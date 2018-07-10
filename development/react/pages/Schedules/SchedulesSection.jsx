/**
 * Componente que representa a la sección de horarios del casino
 * @namespace SchedulesSection
 * @extends Component
 */
import React, {Component} from 'react'
import {
  Alert,
  Form,
  Icon,
  TimePicker,
  InputNumber,
  Modal,
  Button,
  notification
} from 'antd'
import moment from 'moment'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'

const FormItem = Form.Item

class SchedulesSection extends Component {

  /**
   * Función que crea el componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      loading: true,
      change: false,
      success: false,
      saveModal: false
    }

    this.api = new Api()
    this.errorMangament = new ErrorManagment()

    this.handleInputsChange = this.handleInputsChange.bind( this )
    this.handleSaveModal = this.handleSaveModal.bind( this )
    this.saveScheduleValues = this.saveScheduleValues.bind( this )
  }

  /**
   * Función que se ejecuta antes de randerizar la vista
   */
  componentWillMount() {
    this.api.getScheduleValues()
      .then( response => {
        this.setState( {
          loading: false,
          change: this.state.change,
          success: this.state.success,
          saveModal: this.state.saveModal
        } )

        this.props.form.setFieldsValue( {beginWorkingDay: moment(response.beginWorkingDay, 'HH:mm') } )
        this.props.form.setFieldsValue( {endWorkingDay: moment(response.endWorkingDay, 'HH:mm') } )
        this.props.form.setFieldsValue( {intervalMinutesSchedules: response.intervalMinutesSchedules } )
        this.props.form.setFieldsValue( {intervalMinutesScores: response.intervalMinutesScores } )
      } )
      .catch( err => {
        console.log(err)
      } )
  }

  /**
   * Función que indica en el estado que hubieron cambios de valores
   */
  handleInputsChange() {
    this.setState( {
      loading: false,
      change: true,
      success: false,
      saveModal: this.state.saveModal
    } )
  }

  /**
   * Función que maneja la presencia del modal para confirmar los cambios realizados
   */
  handleSaveModal() {
    this.setState( {
      loading: false,
      change: this.state.change,
      success: this.state.success,
      saveModal: !this.state.saveModal
    } )
    
  }

  /**
   * Función que muestra una notificación al usuario
   * @param {String} type Tipo de notificación 
   * @param {String} message Título de la notificación
   * @param {*} description Descripción de la notificación
   */
  openNotification( type, message, description ) {
    notification[type]({
      message,
      description
    } )
  }

  /**
   * Función que envia a la API los cambios realizados por el usuario
   */
  saveScheduleValues() {
    this.props.form.validateFields( (err, values) => {
      if ( !err ) {
        
        const beginWorkingDay = values.beginWorkingDay.format('LT').split(' ')[0].toString()
        const endWorkingDay = values.endWorkingDay.format('LT').split(' ')[0].toString()

        values.beginWorkingDay = beginWorkingDay.length === 4 ? `0${beginWorkingDay}` : beginWorkingDay
        values.endWorkingDay = endWorkingDay.length === 4 ? `0${endWorkingDay}` : endWorkingDay

        
        
        this.api.setScheduleValues( values )
          .then( response => {
            
            this.handleSaveModal()
            
            if ( response.status === 200 ) {
              this.setState( {
                loading: false,
                success: true,
                change: false,
                saveModal: false
              } )
            } else {
              // TODO: Error managment
              this.errorMangament.resolveError( response.data )
            }
          } )
          .catch( err => {
            //this.handleSaveModal()
            console.log(err)
          } )
      }
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {String} HTML markup del componente
   */
  render() {
    const format = 'HH:mm'
    const style = {width: '120%'}
    const {getFieldDecorator} =  this.props.form
    const changeMessage = this.state.change ? (<Alert style={{width: 'max-content', marginBottom: '30px'}} message="Se han detectado cambios, favor de guardarlos para que tengan efecto." type="warning" showIcon />) : ''
    this.state.success ? this.openNotification( 'success', 'Operación exitosa', 'Se han guardado los cambios con éxito.' ) : () => {}
    const loadingSpin = this.state.loading ? (
      <Icon 
        type="loading" 
        style={{ fontSize: '50px', display: 'block', margin: 'auto', marginBottom: '40px' }}
      /> ) : ''

    return(
      <div>
        <Form layout="inline">
          {changeMessage}
          {loadingSpin}

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
                disabled={this.state.loading}
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
                disabled={this.state.loading}
                onChange={this.handleInputsChange}
              />
            )}
            
          </FormItem>

          <FormItem
            label="Repartir rota cada (min):"
            style={ {marginRight: '100px', marginTop: '40px'} }
          >
            {getFieldDecorator( 'intervalMinutesSchedules', {
              rules: [
              { required: true, message: 'Ingrese un valor!' }]
            } )(
              <InputNumber 
                style={style} 
                disabled={this.state.loading}
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
                disabled={this.state.loading}
                onChange={this.handleInputsChange}  
              />
            )}
            
          </FormItem>
        </Form>

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
      </div>
    )
  }
}

const WrappedScheduleForm = Form.create()(SchedulesSection)
module.exports = WrappedScheduleForm
