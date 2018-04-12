import './libs/fingerprint.sdk.min.js'
import './libs/websdk.client.bundle.min.js'

class FingerprintSDKTest {
  constructor() {
    this.operationToRestart = null
    this.acquisitionStarted = false
    this.sdk = new Fingerprint.WebApi

    this.sdk.onDeviceConnected = this.onDeviceConnected( e )
    this.sdk.onDeviceDisconnected = this.onDeviceDisconnected( e )
    this.onCommunicationFailed = this.onCommunicationFailed( e )
  }

  onDeviceConnected( e ) {
    console.log( 'This wea is connceted' )
  }

  onDeviceDisconnected( e ) {
    console.log( 'This wea is disconnceted' )
  }

  onCommunicationFailed( e ) {
    console.log( 'Communication failed' )
  }

  onSamplesAcquired( e ) {
    
  }
}

module.exports = FingerprintSDKTest