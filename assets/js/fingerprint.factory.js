(function () {
    angular.module('app')
        .factory('fingerFactory', fingerfactory)

    fingerfactory.$inject = [];

    function fingerfactory() {
        vm = this;

        var test, qualityInfo;
        var fingerPrintData = false;
        var myVal = "";
        var currentFormat="Raw";

        var service = {
            init: init,
            enumerateDevices: enumerateDevices,
            getDeviceInfo: getDeviceInfo,
            startCapture: startCapture,
            stopCapture: stopCapture,
            setFormat: setFormat,
            getQuality: getQuality,
            getData: getData
        };

        var FingerprintSdkTest = (function () {
            function FingerprintSdkTest() {
                var _instance = this;
                this.operationToRestart = null;
                this.acquisitionStarted = false;
                this.sdk = new Fingerprint.WebApi;
                this.sdk.onDeviceConnected = function (e) {
                    // Detects if the deveice is connected for which acquisition started
                    //console.log("Scan your finger");
                };
                this.sdk.onDeviceDisconnected = function (e) {
                    // Detects if device gets disconnected - provides deviceUid of disconnected device
                    //console.log("Device disconnected");
                };
                this.sdk.onCommunicationFailed = function (e) {
                    // Detects if there is a failure in communicating with U.R.U web SDK
                    //console.log("Communinication Failed")
                };
                this.sdk.onSamplesAcquired = function (s) {
                    // Sample acquired event triggers this function
                    sampleAcquired(s);
                };
                this.sdk.onQualityReported = function (e) {
                    // Quality of sample aquired - Function triggered on every sample acquired
                    qualityInfo = Fingerprint.QualityCode[(e.quality)];
                }

            }

            FingerprintSdkTest.prototype.startCapture = function () {
                if (this.acquisitionStarted) // Monitoring if already started capturing
                    return { success: false, error: "Already capturing" };//return; 
                var _instance = this;
                this.operationToRestart = this.startCapture;
                return this.sdk.startAcquisition(currentFormat, myVal).then(function () {
                    _instance.acquisitionStarted = true;

                    //Disabling start once started
                    //disableEnableStartStop();
                    return { success: true, data: "Start Capturing" };

                }, function (error) {
                    return { success: false, error: error };//console.log(error.message);
                });
            };
            FingerprintSdkTest.prototype.stopCapture = function () {
                if (!this.acquisitionStarted) //Monitor if already stopped capturing
                    return { success: false, error: "Already not capturing" };//return;
                var _instance = this;
                return this.sdk.stopAcquisition().then(function () {
                    _instance.acquisitionStarted = false;

                    //Disabling stop once stoped
                    //disableEnableStartStop();
                    return { success: true, data: "Stop Capturing" };

                }, function (error) {
                    return { success: false, error: error };//console.log(error.message);
                });
            };

            FingerprintSdkTest.prototype.getInfo = function () {
                var _instance = this;
                return this.sdk.enumerateDevices().then(function (sucessObj) {
                    if (sucessObj.length > 0) {
                        return { success: true, data: sucessObj };
                    }
                    else {
                        return { success: false, error: "No devices" };
                    }
                }, function (error) {
                    return { success: false, data: error }
                });
            };

            FingerprintSdkTest.prototype.getDeviceInfoWithID = function (uid) {
                var _instance = this;
                return this.sdk.getDeviceInfo(uid).then(function (sucessObj) {
                    return { success: true, data: sucessObj };
                }, function (error) {
                    return { success: true, error: error };
                });
            };


            return FingerprintSdkTest;
        })();


        function sampleAcquired(s) {
            if (currentFormat == Fingerprint.SampleFormat.PngImage) {
                // If sample acquired format is PNG- perform following call on object recieved 
                // Get samples from the object - get 0th element of samples as base 64 encoded PNG image         
                var samples = JSON.parse(s.samples);
                //localStorage.setItem("imageSrc", "data:image/png;base64," + Fingerprint.b64UrlTo64(samples[0]));
                return { format: "png", samples: samples };

            }

            else if (currentFormat == Fingerprint.SampleFormat.Raw) {
                // If sample acquired format is RAW- perform following call on object recieved 
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
                // after decoding get Data key from it, it returns Base64 encoded raw image data
                var samples = JSON.parse(s.samples);
                //var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                //var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
                //localStorage.setItem("raw", Fingerprint.b64UrlTo64(decodedData.Data));
                fingerPrintData = { format: "raw", samples: samples[0] };
                //console.log(fingerPrintData);
                return { format: "raw", samples: samples[0] };

            }

            else if (currentFormat == Fingerprint.SampleFormat.Compressed) {
                // If sample acquired format is Compressed- perform following call on object recieved 
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // Returned data is Base 64 encoded, which needs to get decoded to UTF8,
                // after decoding get Data key from it, it returns Base64 encoded wsq image
                var samples = JSON.parse(s.samples);
                var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                var decodedData = JSON.parse(Fingerprint.b64UrlToUtf8(sampleData));
                //localStorage.setItem("wsq", "data:application/octet-stream;base64," + Fingerprint.b64UrlTo64(decodedData.Data));
                fingerPrintData = { format: "wsq", samples: Fingerprint.b64UrlTo64(decodedData.Data) };
                return { format: "wsq", samples: Fingerprint.b64UrlTo64(decodedData.Data) };
            }

            else if (currentFormat == Fingerprint.SampleFormat.Intermediate) {
                // If sample acquired format is Intermediate- perform following call on object recieved 
                // Get samples from the object - get 0th element of samples and then get Data from it.
                // It returns Base64 encoded feature set
                //var samples = JSON.parse(s.samples);
                //var sampleData = Fingerprint.b64UrlTo64(samples[0].Data);
                //localStorage.setItem("intermediate", sampleData);
                return { format: "intermediate", samples: samples };


            }

            else {
                return ({ fomart: "Format Error" });
                //disableEnableExport(true);
            }
        }


        function init() {
            test = new FingerprintSdkTest();
        }

        function enumerateDevices() {
            return test.getInfo();
        }

        function getDeviceInfo(uid) {
            return test.getDeviceInfoWithID(uid);
        }

        function startCapture() {
            return test.startCapture();
        }

        function stopCapture() {
            return test.stopCapture();
        }

        function setFormat(format) {
            if (format == "Raw") {
                currentFormat = Fingerprint.SampleFormat.Raw;
            }
            if (format == "Intermediate") {
                currentFormat = Fingerprint.SampleFormat.Intermediate;
            }
            if (format == "Compressed") {
                currentFormat = Fingerprint.SampleFormat.Compressed;
            }
            if (format == "PngImage") {
                currentFormat = Fingerprint.SampleFormat.PngImage;
            }
        }

        function getQuality() {
            return qualityInfo;
        }

        function getData() {
            var out = fingerPrintData;
            fingerPrintData = false;
            return out;
        }

        return service;

    };

})();
