/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('clientManagerCtrl', clientmanagerctrl);
  
    clientmanagerctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function clientmanagerctrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.clientManager();
      vm.logo='./assets/img/menu_int_adm_usuarios.png';
  
      vm.clients=[{name:"Admin",level:"gold",date:"01/01/1990",register:"01/01/2017",value:false },
      {name:"Hostes",level:"silver",date:"01/01/1990",register:"01/01/2017", value:true}]
  
      
      function go( path ) {
        console.log(path);
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