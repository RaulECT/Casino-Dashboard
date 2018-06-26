import React, {Component} from 'react'
import {Button} from 'antd'
import FingerprintSDKTest from '../../controllers/FingerprintSDKTest'
import Api from '../../controllers/Api'
import ErrorManagment from '../../controllers/ErrorManagment'
import fingerImg from '../images/huella_big.png'

class FingerLogin extends Component {

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

  checkFinger() {
    const data = this.fingerManagment.getData()

    if ( data.success ) {
      this.fingerManagment.stopCapture()

      this.setState( { fingerPrint: data.samples, reading: false } )
      this.api.fingerprintLogin( data.samples )
        .then( response => {

          if ( response.status === 200 ) {
            localStorage.setItem( 'user', 'User' )
            // TODO: Redirect to Dashboard

            localStorage.setItem( 'token', response.data.result.token )
            localStorage.setItem( 'isLogin', 'true' )
        
            // TODO: Router Redirect to /dashboard
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



  readFinger() {
    this.setState( { reading: true } )

    this.fingerManagment.startCapture( res => {;
      
      if ( res.success ) {
        setTimeout( this.checkFinger, 1000 )
      }
    } )
  }

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