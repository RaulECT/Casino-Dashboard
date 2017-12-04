/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configChipsCtrl', configchipsctrl);

  configchipsctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory', 'configurationFactory'];

  function configchipsctrl( $location,  authenticateFactory,  languageFactory, configurationFactory) {
    var vm = this;
    var modal= document.getElementById('ConfigChipsModal');
    vm.text=languageFactory.config();
    vm.logo="./assets/img/menu_int_pago_fichas.png";
    vm.chips=configurationFactory.getChips();
    vm.save=save;
    vm.updateChips=updateChips;
    vm.close=close;
    vm.go=go;
    vm.question="¿Estas seguro que quieres actualizar el valor de las fichas?";
    vm.ok="La infomación se actualizo con exito.";
    vm.err="Hubo un problema al actualizar la infomación, intentelo más tarde."

    function save(){
      vm.message=vm.question;
      modal.style.display="block";      
    };
    function updateChips(){
      configurationFactory.editConfig({chips:vm.chips}).then(function(x){
        if(x.success){
          vm.message=vm.ok;
          configurationFactory.getConfigData().then(function(y){
            if(y.success){
              modal.style.display="none";
              vm.chips=configurationFactory.getChips();
            }
          });
        }
        else{
          vm.message=vm.err;
          modal.style.display="none";
          vm.chips=configurationFactory.getChips();
        } 
      });
  
    };
    function close(){
      modal.style.display="none";
    };

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