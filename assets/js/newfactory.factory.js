(function () {
    angular.module('app')
        .factory('newFactory', newfactory)

    newfactory.$inject = [];

    function newfactory() {
        vm = this;

        var SerialPort = require('serialport');
        var binascii = require('binascii');
        var Promise = require('bluebird');

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
        vm.s = null;

        var service = {
            enumerateDivices: enumerateDivices,
            init: init,
            readIso: readIso,
            writeIso: writeIso,
            close: close
        };

        return service;

        function enumerateDivices() {
            SerialPort.list(function (err, ports) {
                ports.forEach(function (port) {
                    makelist(port.comName);
                });
            });
        };

        function init(index, callback) {
            console.log(coms);
            if (coms.length > 0) {
                connection = new SerialPort(coms[index], { baudRate: 9600, });
                //connection = port;
                connection.on('open', function () {
                    // initialize (btw the programming manual has some of this stuff backwards)
                    connection.write(RESET, function (err) {
                        if (err) console.log(err);
                    });
                    connection.write(COMMUNICATIONS_TEST, function (err) {
                        if (err) console.log(err);
                    });

                    connection.on('data', function (data) {
                        if (data.length == 2 && data[0] == ESC && data[1] == 'y'.charCodeAt(0)) {
                            //connection.write(RESET);
                            console.log("reader card connected");
                            setTimeout(callback(true), 1000);
                        }
                    });
                });

                connection.on('error', function (err) {
                    console.log('Error: ', err.message);
                    callback(false);
                });
            }
            else {
                console.log("No se encuentran dispositivos");
                callback(false);
            }
        };

        function readIso() {
            return new Promise(function (resolve) {
                connection.write(RESET, function (err) {
                    if (err) { console.log("1: " + err) };
                    connection.drain(function () {
                        connection.write(READ_ISO, function (err2) {
                            if (err2) { console.log("2: " + err2) };
                            connection.drain(function () {
                                connection.on('data', function (data) {
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
                                        resolve(out);
                                    }
                                });
                            });
                        });
                    });
                });
            });
        };

        function writeIso(data) {
            //port = this.s;
            //t = this;
            var pass = false;
            var cont = 0;
            return new Promise(function (resolve) {
                //console.log(data);
                connection.write([0x1B, 0x78], function (err) {
                    connection.on('data', function (a) {
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
                            connection.write(command, function (err) {
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
                            resolve(false);
                        }

                        if (a[0] == ESC && a[1] == 0x30 && cont == 1) {
                            console.log("Información guardada.")
                            //connection.close();
                            resolve(true);
                        }

                        cont++;
                    });

                });
            });

        };

        function close() {
            return connection.close();
        }

        function makelist(path) {
            var port = new SerialPort(path, { baudRate: 9600, });
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
                        console.log(path)
                        coms.push(path);
                        setTimeout(port.close(), 1000);
                    }
                });
            });

            port.on('error', function (err) {
                this.close()
            });

        };

    }

})();