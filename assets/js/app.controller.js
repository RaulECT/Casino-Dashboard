(function () {
  angular.module('app').controller('appCtrl', appctrl);

  appctrl.$inject = ['$timeout', '$mdSidenav', '$scope'];

  function appctrl($timeout, $mdSidenav, $scope) {
    var vm = this;

    vm.showme = false;
    vm.toggleRight = buildToggler();
    vm.isOpenRight = function () {
      return vm.showme;
    };



    function buildToggler() {
      return function () {
        vm.showme = !vm.showme;
      };
    }

  }
})();