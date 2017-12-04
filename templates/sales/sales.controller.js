/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('salesCtrl',salesctrl);
  
   salesctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function salesctrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.sales();
      vm.logo='./assets/img/menu_int_promociones.png';
  
      vm.sales=[{name:"Promo1", max:10000, min:1000, date:"10-01-2017", status:true}]
  
      
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