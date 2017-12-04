/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function () {
  angular.module('app').controller('configScheduleCtrl', configscheduleCtrl);

  configscheduleCtrl.$inject = ['$location', 'authenticateFactory', 'languageFactory', 'configurationFactory'];

  function configscheduleCtrl($location, authenticateFactory, languageFactory, configurationFactory) {
    var vm = this;
    var modal = document.getElementById("ConfigScheduleModal");
    vm.text = languageFactory.configSchedule();
    vm.schedule = configurationFactory.getSchedule();
    console.log(vm.schedule);
    vm.save = save;
    vm.updateMembership = updateMembership;
    vm.close = close;
    vm.go = go;
    vm.question = "¿Estas seguro que quieres actualizar los horarios?";
    vm.ok = "La infomación se actualizo con exito.";
    vm.err = "Hubo un problema al actualizar la infomación, intentelo más tarde.";
    vm.logo = "./assets/img/menu_int_conf_gral.png";
    vm.gold = "./assets/img/member_gold.png";
    vm.silver = "./assets/img/member_silver.png";
    vm.bronze = "./assets/img/member_bronze.png";

    function save() {
      vm.message = vm.question;
      modal.style.display = "block";
    };

    function updateMembership() {
      if (vm.schedule.beginWorkingDay instanceof Date) {
        var init = ("0" + vm.schedule.beginWorkingDay.getHours()).slice(-2) + ":" + ("0" + vm.schedule.beginWorkingDay.getMinutes()).slice(-2);
        vm.schedule.beginWorkingDay = init;
      }

      if (vm.schedule.endWorkingDay instanceof Date) {
        var end = ("0" + vm.schedule.endWorkingDay.getHours()).slice(-2) + ":" + ("0" + vm.schedule.endWorkingDay.getMinutes()).slice(-2);
        vm.schedule.endWorkingDay = end;
      }

      configurationFactory.editConfig(vm.schedule).then(function (x) {
        if (x.success) {
          vm.message = vm.ok;
          configurationFactory.getConfigData().then(function (y) {
            if (y.success) {
              modal.style.display = "none";
              vm.schedule = configurationFactory.getSchedule();
            }
          });
        }
        else {
          vm.message = vm.err;
          modal.style.display = "none";
          vm.schedule = configurationFactory.getSchedule();
        }
      });
    };

    function close() {
      modal.style.display = "none";
    };


    /**
	  * Go to the path of a view
	  * @param {string} Name Name of url path defined on confing.
    * @memberOf module:config#
	  */
    function go(path) {
      if (path == '/login') {
        authenticateFactory.logout()
          .then(function (response) {
            if (response.success) {
              $location.path(path);
            }
            else {
              console.log(response.message);
            }
          });
      }
      else { $location.path(path); }
    };
  }
})();