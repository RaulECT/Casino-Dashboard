import React, {Component} from 'react'
import fs from 'fs'
import sys from 'util'
import {exec} from 'child_process'
import Api from '../controllers/Api'
import { 
  Form,
  Input,
  Button,
  notification,
 } from 'antd'
 import './styles/appConfiguration.css'

 const FormItem = Form.Item

class AppConfiguration extends Component {

  constructor( props ) {
    super( props )

    this.api = new Api()

    this.state = {
      isLoading: false,
    }

    this.configApp = this.configApp.bind( this )
  }

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
                      console.log( response );
                      if ( response.status === 200 ) {
                        this.writeConfigFile( appConfiguration )
                      }
                    } )
                    .catch( err => {

                    } )
                  
                } )
                .catch( err => {
                  console.log(err);
                  
                } )
              
              
            } else {
              this.showNotification( 'error', 'Error de conexión', 'No se puedo establecer conexión con la API, favorde intentar de nuevo.' )
            }

          } )
          .catch( err => {
            console.log( err );
            
          } )

        this.setState( { isLoading: false } )
      }
    } )
  }

  writeConfigFile( config ) {
    const configText = JSON.stringify( config ) //`${appId}----${deviceId}----${username}----${password}`
    const { onConfirm } = this.props

    fs.writeFile('config.txt', configText, function (err) {
      if (err) throw err;
      console.log('Saved!');
      onConfirm()
    })
  }

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
            console.log(deviceId)
            const deviceIdString = new Buffer(JSON.stringify(deviceId)).toString('base64')
            resolve( deviceIdString )
        } )
      } )
    } )

  }

  showNotification( type, title, message ) {
    notification[type]( {
      message: title,
      description: message
    } )
  }

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