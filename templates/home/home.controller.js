/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
  angular.module('app').controller('homeCtrl', homectrl);

  homectrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];

  function homectrl( $location,  authenticateFactory,  languageFactory) {
    var vm = this;
    vm.text=languageFactory.home();
    vm.tiles={
      config:{
        view:true,
        icon: "./assets/img/menu_configuracion.png",
        class: "green",
        footer: vm.text.label.config,
        action: go,
        go:"/config"
      },
      roleManager:{
        view:true,
        icon: "./assets/img/menu_gestion_roles.png",
        class: "green",
        footer: vm.text.label.roleManager,
        action: go,
        go: "/roleManager"
      },
      employeeManager:{
        view:true,
        icon: "./assets/img/menu_conf_usuarios.png",
        class: "red",
        footer: vm.text.label.employeeManager,
        action: go,
        go: "/employeeManager"
      },
      clientManager:{
        view:true,
        icon: "./assets/img/menu_conf_clientes.png",
        class: "red",
        footer: vm.text.label.clientManager,
        action: go,
        go: "/clientManager"
      },
      sales:{
        view:true,
        icon: "./assets/img/menu_promociones.png",
        class: "yellow",
        footer:  vm.text.label.sales,
        action: go,
        go: "/sales"
      },
      stadistics:{
        view:true,
        icon: "./assets/img/menu_visualizar_esta.png",
        class: "yellow",
        footer:  vm.text.label.stadistics,
        action: go,
        go: "/statistics"
      },
      history:{
        view:true,
        icon: "./assets/img/menu_visualizar_esta.png",
        class: "yellow",
        footer:  vm.text.label.history,
        action: go,
        go: "/history"
      },
      logout:{
        view:true,
        icon: "./assets/img/rcp_menu_log_out.png",
        class: "blue",
        footer:  vm.text.label.logout,
        action: go,
        go: "/login"
      }
    };

    /**
	  * Go to the path of a view
	  * @param {string} Name Name of url path defined on confing.
    * @memberOf module:Home#
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