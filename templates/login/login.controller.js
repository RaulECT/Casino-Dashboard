(function () {
    angular.module('app').controller('loginCtrl', loginctrl);

    loginctrl.$inject = ['authenticateFactory', 'jwtHelper', 'store', '$location', 'fingerFactory', '$scope', 'languageFactory'];

    function loginctrl(authenticateFactory, jwtHelper, store, $location, fingerFactory, $scope, languageFactory) {
        var vm = this;
        var modal = document.getElementById('myModalLogin');
        vm.user = {
            username: null,
            password: null
        };
        vm.fingerUser = {
            fingerprint: null
        };
        vm.message = "";
        vm.typelogin = false;
        vm.fingerprint = "./assets/img/huella.png";
        vm.text = languageFactory.login();
        vm.close=close;
        vm.login = login;
        vm.change=change;
        vm.reader=false;
        var interval;

        /*Busca los dispostivos conectados */
        fingerFactory.enumerateDevices().then(function (response) {
            if (response.success) {
                console.log(response.data);
                fingerFactory.getDeviceInfo(response.data[0]).then(function (x) {
                    console.log(x);
                    vm.typelogin = false;
                    vm.reader=true;
                    readFinger();
                });

            }
            else {
                vm.typelogin = true;
                $scope.$apply();
                console.log(response.error);
            }
        });

        /**
         * Inciamos la lectura de dedos por 5 segundos luego la detenemos, si falla lo reintamos
         **/
        function readFinger() {
            fingerFactory.setFormat("Compressed");
            fingerFactory.startCapture().then(function (response) {
                if (response.success) {
                    interval = setInterval(checkFinger, 1000);
                }
            });

        };

        function checkFinger() {
            var data = fingerFactory.getData();
            //console.log(data);
            if (data != false) {
                clearInterval(interval);
                fingerFactory.stopCapture();
                console.log(data);
                vm.fingerUser.fingerprint=data.samples;
                fingerLogin();
            }
            else {
                //console.log("por favor reintentlo");
            }
        }

        function login() {
            if (vm.user.username && vm.user.password) {
                authenticateFactory.password(vm.user).then(function (response) {
                    if (response.success) {
                        store.set('token', response.result.token);
                        $location.path("/inicio");
                    }
                    else {
                        console.log(response.message);
                        if (response.message == "InvalidCredentials") vm.message = "El usuario o contraseña son incorrectos.";
                        else if (response.message == "SomethingWrongInServer" || response.message == "Error no reconocido") vm.message = "Hubo un error al comunicarse con el servidor.";
                        else if(response.message=="WrongAppType") vm.message="Este usuario no tiene los permisos para usar esta aplicación.";
                        else vm.message="Error no conocido."
                        modal.style.display = "block";
                    }
                });
            }
            else {
                vm.message = "Los campos de usuario y contraseña son obligatorios";
                modal.style.display = "block";
            }
        };

        function fingerLogin() {
            authenticateFactory.fingerprint(vm.fingerUser).then(function (response) {
                if (response.success) {
                    store.set('token', response.result.token);
                    $location.path("/inicio");
                }
                else {
                    console.log(response.message);
                    if(response.message=="InvalidCredentials" || response.message=="FingerprintNotFound") vm.message="No se encontraron coincidencias.";
                    else if(response.message=="SomethingWrongInServer") vm.message="Hubo un error al comunicarse con el servidor.";
                    else if(response.message=="WrongAppType") vm.message="Este usuario no tiene los permisos para usar esta aplicación.";
                    else vm.message="Error no conocido."
                    modal.style.display = "block";
                    if(vm.reader) readFinger();
                }
            });
        };

         function close() {
            modal.style.display = "none";
        };

        function change() {
            if (vm.reader) {
                if (vm.typelogin) readFinger();
                else fingerFactory.stopCapture();
            }
            vm.typelogin = !vm.typelogin;
        }


    }
})();