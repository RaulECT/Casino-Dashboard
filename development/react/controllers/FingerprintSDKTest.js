class FingerprintSDKTest {
  constructor( errM ) {
    this.operationToRestart = null
    this.acquisitionStarted = false
    this.currentFormat = Fingerprint.SampleFormat.Compressed
    this.deviceId = 'A7429977-B0D4-9640-9AF7-CC792A5989BD'
    this.fingerData = {}
    this.sdk = new Fingerprint.WebApi
    this.errorManagment = errM

    this.onReading = this.onReading.bind( this )
    this.startCapture = this.startCapture.bind( this )
    this.stopCapture = this.stopCapture.bind( this )
    this.sampleAcquired = this.sampleAcquired.bind( this )
    this.getData = this.getData.bind( this )

    this.sdk.onDeviceConnected = function( e ) {
      console.log('conected');
    }
    this.sdk.onDeviceDisconnected = function( e ) {
      console.log('disconected');
    }
    this.sdk.onSamplesAcquired = this.sampleAcquired
    this.onCommunicationFailed = this.onCommunicationFailed

    this.onDeviceConnected = this.onDeviceConnected.bind( this )
    this.onDeviceDisconnected = this.onDeviceDisconnected.bind( this )
    this.onCommunicationFailed = this.onCommunicationFailed.bind( this )


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

  onReading( s ) {
    console.log('leyendo');
  }

  setFormat( format ) {
    switch ( format ) {
      case 'Raw':
        this.currentFormat = 'Raw'
        break

      case 'Intermediate':
        this.currentFormat = 'Intermediate'
        break

      case 'Compressed':
        this.currentFormat = 'Compressed'
        break

      case 'PngImage':
        this.currentFormat = 'PngImage'
        break;
      default:
        this.currentFormat = 'Raw'
    }
  }



  getDeviceList() {
    return this.sdk.enumerateDevices()
  }


  sampleAcquired(s){
    if(this.currentFormat == Fingerprint.SampleFormat.PngImage){
      // If sample acquired format is PNG- perform following call on object recieved
      // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
      localStorage.setItem("imageSrc", "");
      var samples = JSON.parse(s.samples);
      localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));

      console.log(samples);

    } else if(this.currentFormat == Fingerprint.SampleFormat.Raw){
      // If sample acquired format is RAW- perform following call on object recieved
      // Get samples from the object - get 0th element of samples and then get Data from it.
      // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
      // after decoding get Data key from it, it returns Base64 encoded raw image data
      localStorage.setItem("raw", "");
      var samples = JSON.parse(s.samples);
      var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
      var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
      localStorage.setItem("raw", Fingerprint.b64UrlTo64(decodedData.Data));

      console.log(sampleData);
    } else if(this.currentFormat == Fingerprint.SampleFormat.Compressed){
      // If sample acquired format is Compressed- perform following call on object recieved
      // Get samples from the object - get 0th element of samples and then get Data from it.
      // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
      // after decoding get Data key from it, it returns Base64 encoded wsq image
      localStorage.setItem("wsq", "");
      var samples = JSON.parse(s.samples);
      var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
      var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
      localStorage.setItem("wsq","data:application/octet-stream;base64," + Fingerprint.b64UrlTo64(decodedData.Data));

      const fingerPrintData = { success: true, format: "wsq", samples: Fingerprint.b64UrlTo64(decodedData.Data) }
      this.fingerData = fingerPrintData

      return fingerPrintData
    } else if(this.currentFormat == Fingerprint.SampleFormat.Intermediate){
      // If sample acquired format is Intermediate- perform following call on object recieved
      // Get samples from the object - get 0th element of samples and then get Data from it.
      // It returns Base64 encoded feature set
      localStorage.setItem("intermediate", "");
      var samples = JSON.parse(s.samples);
      var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
      localStorage.setItem("intermediate", sampleData);

      console.log(sampleData);
    } else{
      alert("Format Error");
      //disableEnableExport(true);
    }
  }

  startCapture( func ) {
    if (this.acquisitionStarted) // Monitoring if already started capturing
      return;

    var _instance = this;
    this.operationToRestart = this.startCapture;
    this.sdk.startAcquisition(this.currentFormat, this.deviceId).then(function () {
      _instance.acquisitionStarted = true;

      //Disabling start once started
      //disableEnableStartStop();
      console.log('started');
      //return { success: true, data: "Start Capturing" }
      func( { success: true, data: "Start Capturing" } )
    }, function (error) {
      console.log(error.message);
      _instance.errorManagment(error.message)
      //return { success: false, error: error }
      return new Promise( (resolve, reject) => {
        reject( { success: false, error: error } )
      } )
    })
  }

  stopCapture() {
    if (!this.acquisitionStarted) //Monitor if already stopped capturing
      return;

    var _instance = this;

    this.sdk.stopAcquisition().then(function () {
      _instance.acquisitionStarted = false;

    //Disabling stop once stoped
    //disableEnableStartStop();
    console.log('stoped');
    }, function (error) {
      console.log(error.message);
    } )
  }

  getData() {
    return this.fingerData
  }


}

module.exports = FingerprintSDKTest