/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configLevelCtrl', configlevelctrl);

  configlevelctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];

  function configlevelctrl( $location,  authenticateFactory,  languageFactory) {
    var vm = this;
    vm.text=languageFactory.configLevel();
    vm.logo="./assets/img/menu_int_pago_membresia.png" ;
    vm.gold="./assets/img/member_gold.png";
    vm.silver="./assets/img/member_silver.png";
    vm.bronze="./assets/img/member_bronze.png";
    
      
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