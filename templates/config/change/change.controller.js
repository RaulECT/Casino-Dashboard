/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configChangeCtrl', configchangectrl);

  configchangectrl.$inject = ['$location',  'authenticateFactory',  'languageFactory', 'configurationFactory'];

  function configchangectrl( $location,  authenticateFactory,  languageFactory, configurationFactory) {
    var vm = this;
    var modal = document.getElementById('ConfigChangeModal');
    vm.text=languageFactory.configChange();
    vm.change=configurationFactory.getChange();
    vm.change.valueUnitChip=vm.change.valueUnitChip/100.0;
    vm.save=save;
    vm.updateExchange=updateExchange;
    vm.close=close;
    vm.go=go;
    vm.logo="./assets/img/menu_int_tipo_cambio.png"; 
    vm.dollar="./assets/img/dollar.png";
    vm.chips="./assets/img/ficha.png";
    vm.question = "¿Estas seguro que quieres actualizar los valores de cambio y ficha?";
    vm.ok = "La infomación se actualizo con exito.";
    vm.err = "Hubo un problema al actualizar la infomación, intentelo más tarde.";

    function save() {
      vm.message = vm.question;
      modal.style.display = "block";
    };

    function updateExchange() {
      vm.change.valueUnitChip=vm.change.valueUnitChip*100.0;
      configurationFactory.editConfig(vm.change).then(function (x) {
        if (x.success) {
          vm.message = vm.ok;
          configurationFactory.getConfigData().then(function (y) {
            if (y.success) {
              modal.style.display = "none";
              vm.amounts = configurationFactory.getChange();
              vm.change.valueUnitChip=vm.change.valueUnitChip/100.0;
            }
          });
        }
        else {
          vm.message = vm.err;
          modal.style.display = "none";
          vm.amounts = configurationFactory.getChange();
          vm.change.valueUnitChip=vm.change.valueUnitChip/100.0;
        }
      });
    };

    function close(){
      modal.style.display="none";
    };
      
    /**
	  * Go to the path of a view
	  * @param {string} Name Name of url path defined on confing.
    * @memberOf module:config#
	  */
    function go( path ) {
      if(path=='/login'){
        authenticateFactory.logout()
        .then(function(response){
          if(response.success){
            $location.path( path );
          }
          else{
            console.log(response.message);
          }
        });
      }
      else{ $location.path( path );}
    };    
  }
})();