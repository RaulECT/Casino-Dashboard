/**
 * Componente que representa a la sección de inicio se sesión usando el lector de huellas
 */
import React, {Component} from 'react'
import {Button} from 'antd'
import FingerprintSDKTest from '../../controllers/FingerprintSDKTest'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'
import fingerImg from '../images/huella_big.png'

class FingerLogin extends Component {

  /**
   * Crea el componente
   * @param {object} props 
   */
  constructor( props ) {
    super( props )

    this.state = {
      fingerPrint: '',
      reading: false
    }

    this.fingerManagment = new FingerprintSDKTest()
    this.errorManagment = new ErrorManagment()
    this.api = new Api()

    this.checkFinger = this.checkFinger.bind( this )
    this.readFinger = this.readFinger.bind( this )
  }

  /**
   * Verifica si se registro la huella del usuario
   */
  checkFinger() { 
    const data = this.fingerManagment.getData()

    if ( data.success ) {
      this.fingerManagment.stopCapture()

      this.setState( { fingerPrint: data.samples, reading: false } )
      this.api.fingerprintLogin( data.samples )
        .then( response => {

          if ( response.status === 200 ) {
            localStorage.setItem( 'user', 'User' )
            localStorage.setItem( 'token', response.data.result.token )
            localStorage.setItem( 'isLogin', 'true' )
        
            this.props.push( '/dashboard/configuraciones_generales' )
          } else {
            this.errorManagment.resolveError( response.data )
          }
        } )
        .catch( err => {
          console.log(err);
          
        } )
    } else {
      this.fingerManagment.stopCapture()
      this.setState( {reading: false} )
    }
    
  }

  /**
   * Lee la huella del usuario usando el lector de huella
   */
  readFinger() {
    this.setState( { reading: true } )

    this.fingerManagment.startCapture( res => {
      
      if ( res.success ) {
        setTimeout( this.checkFinger, 1000 )
      }
    } )
  }

  /**
   * Randeriza la vista del componente
   * @returns {string} HTML markup del componente.
   */
  render() {
    const {reading} = this.state
    const buttonText = reading ? 'Iniciando sesión...' : 'Leer huella para iniciar sesión'

    return(
      <div>
        <div>
          <img className="finger-img" src={fingerImg} alt="finger"/>
        </div>

        <Button disabled={reading} type="primary" loading={reading} onClick={this.readFinger}>{buttonText}</Button>
      </div>
    )
  }
}

module.exports = FingerLogin