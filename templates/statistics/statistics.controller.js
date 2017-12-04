/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('statisticsCtrl', statisticsctrl);
  
    statisticsctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function statisticsctrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.statistics();
      vm.img='./assets/img/menu_int_estadisticas.png';
      vm.icon1='./assets/img/menu_envio.png';
      vm.icon2='./assets/img/menu_visualizar_esta.png';
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