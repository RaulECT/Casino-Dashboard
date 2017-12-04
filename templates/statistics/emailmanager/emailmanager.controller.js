/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('emailManagerCtrl', emailmanagerctrl);
  
    emailmanagerctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function emailmanagerctrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.statisticsEmailManager();
      vm.img='./assets/img/menu_int_esta_envio.png';
      vm.go=go;
  
    
      
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