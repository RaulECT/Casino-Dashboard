import SerialPort from 'serialport'
import binascii from 'binascii'

class CardReader {
 constructor() {
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

    var connection = false;
    var coms = [];
 }

 enumerateDivices() {
     SerialPort.list( (err, ports) =>{

     }  )
 }
}

module.exports = CardReader