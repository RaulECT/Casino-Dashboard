/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configlevelManagerCtrl', configlevelmanagerctrl);

  configlevelmanagerctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];

  function configlevelmanagerctrl( $location,  authenticateFactory,  languageFactory) {
    var vm = this;
    vm.text=languageFactory.configLevelManager();
    vm.logo="./assets/img/menu_int_gestion_niveles.png"; 
    vm.users=[{
      name:"Andrés Castro",
      dept:1000,
      credit:10000,
      level:"gold",
      id:"user01"
    },
    {
      name:"Ramiro Pat",
      dept:0.00,
      credit:5000,
      level:"gold",
      id:"user02"
    }
  ];

    
      
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