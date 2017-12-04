/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configCasinoCtrl', configcasinoctrl);

  configcasinoctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];

  function configcasinoctrl( $location,  authenticateFactory,  languageFactory) {
    var vm = this;
    vm.text=languageFactory.configCasino();
    vm.logo="./assets/img/menu_int_casino.png"; 
    vm.img="./assets/img/logo.png";
    
      
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