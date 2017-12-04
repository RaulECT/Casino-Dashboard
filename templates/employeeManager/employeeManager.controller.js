/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('employeeManagerCtrl', employeemanagerctrl);
  
    employeemanagerctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function employeemanagerctrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.employeeManager();
      vm.logo='./assets/img/menu_int_adm_usuarios.png';
  
      vm.users=[{name:"Admin"},{name:"Hostes"}]
  
      
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