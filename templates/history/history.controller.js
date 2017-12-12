/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('historyCtrl', historyCtrl);
  
    historyCtrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];
  
    function historyCtrl( $location,  authenticateFactory,  languageFactory) {
      var vm = this;
      vm.text=languageFactory.history();
      vm.img='./assets/img/menu_int_estadisticas.png';
      vm.icon1='./assets/img/menu_envio.png';
      vm.icon2='./assets/img/menu_visualizar_esta.png';
      vm.go=go;
  
      vm.tiles={
        till:{
          view:true,
          icon: "./assets/img/menu_denominaciones.png",
          class: "green",
          footer: vm.text.label.menu1,
          action: go,
          go:"/history/till"
        },
        score:{
          view:false,
          icon: "./assets/img/menu_gestion_roles.png",
          class: "green",
          footer: vm.text.label.menu2,
          action: go,
          go: "/roleManager"
        },
        today:{
          view:false,
          icon: "./assets/img/menu_conf_usuarios.png",
          class: "red",
          footer: vm.text.label.menu3,
          action: go,
          go: "/employeeManager"
        }
      };
    
      
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