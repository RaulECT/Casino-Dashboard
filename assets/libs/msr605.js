var SerialPort = require('serialport');
var binascii = require('binascii');
var Promise = require('bluebird');
//var sleep = require('sleep');




const ESC = 0x1B;
const FS = 0x1C;
const ACK = [0x1B, 0x79];

const RESET = [0x1B, 0x61];
const READ_ISO = [0x1B, 0x72];
const WRITE_ISO = [0x1B, 0x77];
const COMMUNICATIONS_TEST = [0x1B, 0x65];
const ALL_LED_OFF = [0x1B, 0x81];
const ALL_LED_ON = [0x1B, 0x82];
const GREEN_LED_ON = [0x1B, 0x83];
const YELLOW_LED_ON = [0x1B, 0x84];
const RED_LED_ON = [0x1B, 0x85];
const SENSOR_TEST = [0x1B, 0x86];
const RAM_TEST = [0x1B, 0x87];

var myport;

/*
function msr605(path, callback) {
  // open port
  var port = new SerialPort(path, { baudRate: 9600, });
  this.s = port;
  myport = port;
  this.connection = false;
  port.on('open', function () {
    // initialize (btw the programming manual has some of this stuff backwards)
    port.write(RESET, function (err) {
      if (err) console.log(err);
    });
    port.write(COMMUNICATIONS_TEST, function (err) {
      if (err) console.log(err);
    });

    port.on('data', function (data) {

      if (data.length == 2 && data[0] == ESC && data[1] == 'y'.charCodeAt(0)) {
        //port.write(RESET, callback(true));
        setTimeout(callback(true), 1000);
      }
    });
    //port.write(RESET);
    //setTimeout(callback(true), 1000);



  });

  port.on('error', function (err) {
    console.log('Error: ', err.message);
    callback(false);
  });
}
*/
function msr605() {
  // open port
  this.s = null;
  this.connection = false;
  this.com=[];
}

msr605.prototype.init=function (index, callback){
 var vm=this;
 console.log(vm.com[index]);
 var port = new SerialPort(vm.com[index], { baudRate: 9600, });
  this.s = port;
  myport = port;
  this.connection = false;
  port.on('open', function () {
    // initialize (btw the programming manual has some of this stuff backwards)
    port.write(RESET, function (err) {
      if (err) console.log(err);
    });
    port.write(COMMUNICATIONS_TEST, function (err) {
      if (err) console.log(err);
    });

    port.on('data', function (data) {

      if (data.length == 2 && data[0] == ESC && data[1] == 'y'.charCodeAt(0)) {
        //port.write(RESET, callback(true));
        setTimeout(callback(true), 1000);
      }
    });
    //port.write(RESET);
    //setTimeout(callback(true), 1000);



  });

  port.on('error', function (err) {
    console.log('Error: ', err.message);
    callback(false);
  });
}

msr605.prototype.enumerateDivices = function () {
  var vm=this;
  SerialPort.list(function (err, ports) {
    ports.forEach(function (port) {
      console.log(port.comName);
      //console.log(port.pnpId);
      //console.log(port.manufacturer);
      vm.makelist(port.comName);
    });
  });
}

msr605.prototype.makelist = function(path){
  var vm=this;
  var port = new SerialPort(path, { baudRate: 9600, });
  this.s = port;
  var myport = port;
  this.connection = false;
  port.on('open', function () {
    // initialize (btw the programming manual has some of this stuff backwards)
    port.write(RESET, function (err) {
      if (err) console.log(err);
    });
    port.write(COMMUNICATIONS_TEST, function (err) {
      if (err) console.log(err);
    });

    port.on('data', function (data) {
      if (data.length == 2 && data[0] == ESC && data[1] == 'y'.charCodeAt(0)) {
        vm.com.push(path);
       setTimeout(myport.close(), 1000);
      }
    });
  });

  port.on('error', function (err) {
    this.close()
  });

}

msr605.prototype.readIso = function () {
  port = this.s;
  return new Promise(function (resolve) {
    port.write(RESET, function (err) {
      if (err) { console.log("1: " + err) };
      port.drain(function () {
        port.write(READ_ISO, function (err2) {
          if (err2) { console.log("2: " + err2) };
          port.drain(function () {
            port.on('data', function (data) {
              if (data[0] == ESC && data[1] == 0x73 && data[2] == ESC) {
                var cont = 0;
                var out = [[], [], []];
                for (var i = 5; i < data.length - 5; i++) {
                  if (data[i] == 0x3f && data[i + 1] == ESC) {
                    cont++;
                    i += 3;
                  }
                  else {
                    out[cont].push(String.fromCharCode(data[i]));//out[cont].push(data[i].toString(16)); 
                  }
                }
                //console.log(out);
                resolve(out);
              }
            });
          });
        });
      });
    });

  });
}

msr605.prototype.setHiCo = function (data) {
  port = this.s;
  t = this;
  var pass = false;
  var cont = 0;
  return new Promise(function (resolve) {
    //console.log(data);
    port.write([0x1B, 0x78], function (err) {
      port.on('data', function (a) {
        //console.log(a);
        if (a[0] != ESC && cont == 0) {
          console.log("expected byte mismatch1");
        }
        // check status
        if (a[1] != 0x30 && cont == 0) {
          console.log("expected byte mismatch2");
        }
        //console.log(data);
        if (a[0] == ESC && a[1] == 0x30 && cont == 0) {
          if (data[2][data[2].length - 1] != '?') {
            console.log("last char of track 3 not '?', fixing.");
          }


          // another quirk - the msr605 appends a % to the beginning of track one, so if you already have one, this deletes it (that way you wont end up with a bunch of duplicate % signs)
          if (data[0][0] == '%') {
            data[0].splice(0, 1);//data[0] = data[0][1:];
          }

          command = [ESC, 0x77, ESC, 0x73, ESC, 0x01];
          for (var i = 0; i < data[0].length; i++) {
            command.push(data[0][i].charCodeAt(0));
          }
          command.push(ESC, 0x02);
          for (var i = 0; i < data[1].length; i++) {
            command.push(data[1][i].charCodeAt(0));
          };
          command.push(ESC, 0x03);
          for (var i = 0; i < data[2].length; i++) {
            command.push(data[2][i].charCodeAt(0));
          };
          command.push(0x3F, FS);

          //console.log(command);
          port.write(command, function (err) {
            if (err) {
              console.log(err);
            }

          });

        }

        if (a[0] != ESC && cont == 1) {
          console.log("expected byte mismatc3");
        }

        // check status
        if (a[1] != 0x30 && cont == 1) {
          console.log("got bad status, something bad may have happened");
        }

        if (a[0] == ESC && a[1] == 0x30 && cont == 1) {
          console.log("Información gardada.")
          //port.close();
          resolve(true);
        }

        cont++;
      });

    });
  });

}

msr605.prototype.writeIsoHiCo = function (data) {
  this.setHiCo(data);
}

msr605.prototype.close = function () {
  this.s.close;
}

msr605.prototype.read = function (byte) {
  this.s.on('data', function (a) {
    //console.log(a[0], byte);
    if (a[0] != byte) {
      console.log("Expected [" + binascii.hexlify(byte) + "] got [" + binascii.hexlify(a) + "]");
      return 0;
    }

    return 1;
  });

}

msr605.prototype.getFirmwareVersion = function () {
  command = [ESC, 0x76];
  var port = this.s;
  var version = "";
  // port.on('open', function () {
  port.write(command);

  this.read(ESC);

  setTimeout(function () { }, 100);//time.sleep(.1);
  port.on('data', function (data) {
    data.forEach(function (item) {
      version += String.fromCharCode(item);
    }, this);

    console.log("Firmware Version: " + version);

  });

}

msr605.prototype.getDeviceModel = function () {
  command = [ESC, 0x74];
  var version = "";
  this.s.write(command);

  this.read(ESC);

  setTimeout(function () { }, 100);//time.sleep(.1);

  this.s.on('data', function (data) {
    data.forEach(function (item) {
      version += String.fromCharCode(item);
    }, this);

    if (version[version.length - 1] != 'S') {//if (version[-1:] != 'S'){
      console.log("got back bad response");
      //return 0;
    }
    console.log("Device Model: " + version);//return version[version.length - 1];//return version[:-1];
  });

}

msr605.prototype.eraseCard = function (trackOne, trackTwo, trackThree) {

  command = "";
  command += ESC;
  command += '\x63';

  if (trackOne && !trackTwo && !trackThree) {
    command += '\x00';
  }
  else if (!trackOne && trackTwo && !trackThree) {
    command += '\x02';
  }
  else if (!trackOne && !trackTwo && trackThree) {
    command += '\x04';
  }
  else if (trackOne && trackTwo && !trackThree) {
    command += '\x03';
  }
  else if (!trackOne && !trackTwo && trackThree) {
    command += '\x05';
  }
  else if (!trackOne && trackTwo && trackThree) {
    command += '\x06';
  }
  else if (trackOne && trackTwo && trackThree) {
    command += '\x07';
  }


  this.printHexToDebug(command);
  this.s.write(command);
  this.read(ESC);
  var isOK = this.s.read();


  if (isOK == '\x30') {
    return true;
  }

  return false;
}

module.exports = exports = msr605;