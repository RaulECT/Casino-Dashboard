/**
 * @fileOverview This is New Member Controller definition
 * @module NewMember
 */
(function () {
  angular.module('app').controller('newUserCtrl', newuserctrl);

  newuserctrl.$inject = ['$location', '$mdDialog', '$scope', 'fingerFactory', 'employeeFactory', 'roleFactory', '$scope'];

  function newuserctrl($location, $mdDialog, $scope, fingerFactory, employeeFactory, roleFactory, $scope) {

    var vm = this;
    var modal = document.getElementById('myModal');
    vm.logo='./assets/img/menu_int_adm_usuarios.png';

    vm.id;
    vm.message;
    vm.user = {};
    vm.checkpassword = "";
    vm.saved = { status: null, data: null, type: null };
    vm.before = '/';
    vm.saveuser = saveuser;
    vm.readFinger = readFinger;
    vm.go = go;
    vm.continuar = continuar;
    vm.cancelar = cancelar;
    vm.close=close;
    vm.img1 = "./assets/img/rcp_menu_int_registrar_miembro.png";
    vm.page1 = true;
    vm.reintentar=0;
    vm.addFinger=addFinger;
    vm.temp={hand:"",index:""};
    vm.finger = {
      rigth: {
        1: {
          status: false,
          print: null,
          message: "OK"
        },
        2: {
          status: false,
          print: null,
          message: "OK"
        },
        3: {
          status: false,
          print: null,
          message: "OK"
        },
        4: {
          status: false,
          print: null,
          message: "OK"
        }
      },
      lefth: {
        1: {
          status: false,
          print: null,
          message: "OK"
        },
        2: {
          status: false,
          print: null,
          message: "OK"
        },
        3: {
          status: false,
          print: null,
          message: "OK"
        },
        4: {
          status: false,
          print: null,
          message: "OK"
        }
      }
    }
    vm.roles = [];
    
        roleFactory.getRoles().then(function(x){
          if(x.success){
            vm.roles=x.data;
          }
          else{
            console.log(x.message);
          }
        });

    /*Inicializa el lector de huellas */
    fingerFactory.init();

    /*Busca los dispostivos conectados */
    fingerFactory.enumerateDevices().then(function (response) {
      if (response.success) {
        console.log(response.data);
        fingerFactory.getDeviceInfo(response.data[0]).then(function (x) {
          console.log(x);
          //readFinger();
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
    function readFinger(hand, index) {
      fingerFactory.setFormat("Compressed");
      //vm.finger[hand][index]['status'] = false;
      fingerFactory.startCapture().then(function (response) {
        if (response.success) {
          vm.temp.hand=hand;
          vm.temp.index=index;
          interval = setInterval(checkFinger, 1000);
        }
      });

    };

    function checkFinger() {
      var data = fingerFactory.getData();
      console.log(data);
      if (data != false) {
        clearInterval(interval);
        fingerFactory.stopCapture();
        vm.finger[vm.temp.hand][vm.temp.index]['message'] = "OK";
        vm.finger[vm.temp.hand][vm.temp.index]['status'] = true;
        vm.finger[vm.temp.hand][vm.temp.index]['print'] = data.samples;
        console.log(data);

      }
      else {
        vm.finger[vm.temp.hand][vm.temp.index]['message'] = "Escaneando";
        vm.finger[vm.temp.hand][vm.temp.index]['status'] = true;
        //console.log("por favor reintentlo");
        //fingerFactory.stopCapture();
      }
      $scope.$apply();
    }


    function go(path) {
      $location.path(path);
    };


    function saveuser(ev) {
      //console.log(vm.user);
      if (vm.user.name && vm.user.username && vm.user.password && vm.user.email && vm.user.birthday && vm.user.roleId && vm.user.gender && vm.user.fingerprints) {
        if (vm.user.password == vm.checkpassword) {

        }
      }
    };

    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat);
      return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('/');
    };


    function showSaveModal(msj=false) {
      console.log("showModal");
      if (vm.saved.status) vm.message = "Miembro añadido con exito.";
      if (!vm.saved.status) vm.message = "Ocurrio un error añadir el usuario.";
      if(msj=="FingerprintsEnrollmentError")  vm.message="Hubo un error al crear el enrolamiento con las huellas. Por favor capture de nuevo todas las huellas.";

      modal.style.display = "block";

    };


    function continuar(page1) {
      console.log("here");
      if (page1) {
        if (vm.user.names && vm.user.firstSurname && vm.user.secondSurname && vm.user.username && vm.user.password && vm.user.email && vm.user.birthday && vm.user.roleId && vm.user.gender) {
          if (vm.user.password == vm.checkpassword) {
            vm.page1 = false;
          }
        }
      }
      else {
        var cont = 0;
        vm.user.fingerprints = { RINDEX: [], LINDEX: [] };
        for (var i in vm.finger.rigth) {
          if (vm.finger.rigth[i]['status']) {
            vm.user.fingerprints.RINDEX.push(vm.finger.rigth[i]['print']);
            cont++;
          }
        }
        for (var i in vm.finger.lefth) {
          if (vm.finger.lefth[i]['status']) {
            vm.user.fingerprints.LINDEX.push(vm.finger.lefth[i]['print']);
            cont++;
          }
        }
        if (cont == 8) {
          vm.user.birthday = convertDate(vm.user.birthday);
          console.log(vm.user);
          employeeFactory.newUser(vm.user).then(function(response){
            console.log(response);
            if(response.success){
              vm.saved.status=true;
              showSaveModal();
            }
            else{
              vm.saved.status=false;
              showSaveModal(response.message);
            }
          });
        }
      }
    };

    function cancelar(page1) {
      if (page1) {
        vm.user = {};
        go('/employeeManager');
      }
      else {
        vm.finger = {
          rigth: {
            1: {
              status: false,
              print: null
            },
            2: {
              status: false,
              print: null
            },
            3: {
              status: false,
              print: null
            },
            4: {
              status: false,
              print: null
            }
          },
          lefth: {
            1: {
              status: false,
              print: null
            },
            2: {
              status: false,
              print: null
            },
            3: {
              status: false,
              print: null
            },
            4: {
              status: false,
              print: null
            }
          }
        };
        vm.page1 = true;
      }
    };

    function close(){
      modal.style.display = "none";
      if(vm.saved.status) cancelar(vm.page1);
    };

    function addFinger(){
      console.log("addFinger");
    }

  }

})();