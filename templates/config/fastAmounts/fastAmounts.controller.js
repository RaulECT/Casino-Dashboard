/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function () {
  angular.module('app').controller('configFastAmountCtrl', configfastamountctrl);

  configfastamountctrl.$inject = ['$location', 'authenticateFactory', 'languageFactory', 'configurationFactory'];

  function configfastamountctrl($location, authenticateFactory, languageFactory, configurationFactory) {
    var vm = this;
    var modal = document.getElementById('ConfigAmountModal');
    vm.text = languageFactory.configFastAmounts();
    vm.logo = "./assets/img/menu_int_monto.png";
    vm.amounts = configurationFactory.getAmounts();
    vm.save = save;
    vm.deleteAmount = deleteAmount;
    vm.addAmount = addAmount;
    vm.inputAmount = inputAmount;
    vm.updateAmounts = updateAmounts;
    vm.close=close;
    vm.go = go;
    vm.newAmount = true;
    vm.newVal = null;
    vm.inVal = "Ingrese el valor del monto";
    vm.question = "¿Estas seguro que quieres actualizar el valor de los montos rápidos?";
    vm.ok = "La infomación se actualizo con exito.";
    vm.err = "Hubo un problema al actualizar la infomación, intentelo más tarde.";

    function save() {
      vm.newAmount = false;
      vm.message = vm.question;
      modal.style.display = "block";
    };

    function deleteAmount(amount) {
      for (var i = 0; i < vm.amounts.length; i++) {
        if (vm.amounts[i] == amount) vm.amounts.splice(i, i + 1);
      }
    };

    function addAmount() {
      if (vm.newAmount) {
        vm.amounts.push(vm.newVal * 100);
        modal.style.display = "none";
      }
      else{
        updateAmounts();
      }
    };

    function inputAmount() {
      vm.newAmount = true;
      vm.newVal = null;
      vm.message = vm.inVal;
      modal.style.display = "block";
    };

    function updateAmounts() {
      configurationFactory.editConfig({ fastAmounts: vm.amounts }).then(function (x) {
        if (x.success) {
          vm.message = vm.ok;
          configurationFactory.getConfigData().then(function (y) {
            if (y.success) {
              modal.style.display = "none";
              vm.amounts = configurationFactory.getAmounts();
            }
          });
        }
        else {
          vm.message = vm.err;
          modal.style.display = "none";
          vm.amounts = configurationFactory.getAmounts();
        }
      });
    };

    function close(){
      modal.style.display="none";
    };

    function go(path) {
      console.log(path);
      $location.path(path);
    };
  }
})();