/**
 * Componente de la vista de configuración de la aplicación
 * @namespace AppConfiguration
 * @extends Component
 */
import React, {Component} from 'react'
import fs from 'fs'
import {exec} from 'child_process'
import Api from '../controllers/Api'
import ErrorManagment from '../controllers/ErrorManagment'
import { 
  Form,
  Input,
  Button,
  notification,
 } from 'antd'
 import './styles/appConfiguration.css'

 const FormItem = Form.Item

class AppConfiguration extends Component {

  /**
   * Constructor del componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.errorManagment = new ErrorManagment()
    this.api = new Api()

    this.state = {
      isLoading: false,
    }

    this.configApp = this.configApp.bind( this )
  }

  /**
   * Función que envia los datos necesarios a la API para configurar la aplicación
   * @param {object} e Evento producido por el formulario 
   */
  configApp( e ) {
    const { validateFields } = this.props.form
    e.preventDefault()
    this.setState( { isLoading: true } )

    validateFields( ( err, values ) => {
      if ( !err ) {

        this.api.echoAPI()
          .then( response => {

            const { connection } = response.data.result

            if ( connection ) {
              this.getDeviceId()
                .then( deviceId => {
                  const appId = this.generteAppId()
                  const appConfiguration = {
                    appId,
                    deviceId,
                    username: values.username,
                    password: values.password,
                    appType: 'adminModule',
                  }

                  this.api.startMachine( appConfiguration )
                    .then( response => {

                      this.setState( { isLoading: false } )
                      if ( response.status === 200 ) {
                        this.writeConfigFile( appConfiguration )
                      } else {
                        this.errorManagment.resolveError( response.data )
                      }
                    } )
                    .catch( err => {
                      this.setState( { isLoading: false } )
                    } )
                  
                } )
                .catch( err => {
                  console.log(err);
                  
                } )
              
              
            } else {
              this.setState( { isLoading: false } )
              this.showNotification( 'error', 'Error de conexión', 'No se puedo establecer conexión con la API, favorde intentar de nuevo.' )
            }

          } )
          .catch( err => {
            console.log( err );
            
          } )

        
      }
    } )
  }

  /**
   * Crea un archivo de configuración en la carpeta del proyecto
   * @param {object} config Configuración de la aplicación 
   */
  writeConfigFile( config ) {
    const configText = JSON.stringify( config ) //`${appId}----${deviceId}----${username}----${password}`
    const { onConfirm } = this.props

    fs.writeFile('config.txt', configText, function (err) {
      if (err) throw err;
      console.log('Saved!');
      onConfirm()
    })
  }

  /**
   * Genera el device id de la maquina en donde esta instalada la aplicación
   */
  getDeviceId() {
    return new Promise( ( resolve, reject ) => {
      let deviceId = {}

      exec("wmic CPU get ProcessorId", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
            reject( error )
        }
        deviceId.ProcessorId = stdout.split("  \r\r\n")[1];
        exec("wmic baseboard get serialnumber", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`)
                reject( error )
            }
            deviceId.MotherBoardId = stdout.split("  \r\r\n")[1]
            //store.set("diviceId", deviceId)
  
            const deviceIdString = new Buffer(JSON.stringify(deviceId)).toString('base64')
            resolve( deviceIdString )
        } )
      } )
    } )

  }

  /**
   * Muestra una notificación al usuario
   * @param {String} type Tipo de notifiación que se le va a mostrar al usuario
   * @param {String} title Titulo que tendrá la notificación
   * @param {String} message Mensaje que se le mostrara al usuario
   */
  showNotification( type, title, message ) {
    notification[type]( {
      message: title,
      description: message
    } )
  }

  /**
   * Genera 3 ids de la aplicación
   */
  generteAppId() {
    const appId = []
    const numberOfItems = 3
    const max = 1000
    const min = 5

    for (let index = 0; index < numberOfItems; index++) {
      const number = Math.floor(Math.random() * (max - min + 1)) + min
      appId.push( `A${number}` )
    }

    return appId
  }

  /**
   * Randeriza la vista al usuario
   */
  render() {
    const { getFieldDecorator } = this.props.form
    const { isLoading } = this.state

    return(
      <div className="container">
        <h1>Configuración de la Aplicación</h1>

        <Form className="config-form" onSubmit={this.configApp}>
          <FormItem
            label="Usuario:"
          >
            {getFieldDecorator('username', {
              rules: [ { required: true, message: 'Este campo es obligatorio' } ]
            })(
              <Input disabled={isLoading}></Input>
            )}
          </FormItem>

          <FormItem
            label="Contraseña:"
          >
            {getFieldDecorator('password', {
              rules: [ { required: true, message: 'Este campo es obligatorio' } ]
            })(
              <Input type="password" disabled={isLoading}></Input>
            )}
          </FormItem>

          <FormItem>
            <Button 
              style={ {width: '100%'} }
              type="primary"
              size="large"
              htmlType="submit"
              loading={isLoading}
            >
              Configurar Aplicación
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const WrappedAppConfiguration = Form.create()(AppConfiguration)
module.exports = WrappedAppConfiguration