/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configCtrl', configctrl);

  configctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory'];

  function configctrl( $location,  authenticateFactory,  languageFactory) {
    var vm = this;
    vm.text=languageFactory.config();
    vm.logo="./assets/img/menu_int_conf_gral.png";
    vm.go=go;
    vm.tiles={
      chips:{
        view:true,
        icon: "./assets/img/menu_pago_fichas.png",
        class: "green",
        footer: vm.text.label.chips,
        action: go,
        go:"/config/chips"
      },
      fastAmounts:{
        view:true,
        icon: "./assets/img/menu_monto_rapido.png",
        class: "green",
        footer: vm.text.label.fastAmounts,
        action: go,
        go: "/config/fastAmounts"
      },
      /*denominations:{
        view:true,
        icon: "./assets/img/menu_denominaciones.png",
        class: "red",
        footer: vm.text.label.denominations,
        action: go,
        go: "/config/denominations"
      },
      */
      level:{
        view:false,
        icon: "./assets/img/menu_pago_membresia.png",
        class: "yellow",
        footer:  vm.text.label.level,
        action: go,
        go: "/config/level"
      },
      levelManager:{
        view:false,
        icon: "./assets/img/menu_gestion_niveles.png",
        class: "yellow",
        footer:  vm.text.label.levelManager,
        action: go,
        go: "/config/levelManager"
      },
      change:{
        view:true,
        icon: "./assets/img/menu_tipo_cambio.png",
        class: "blue",
        footer:  vm.text.label.change,
        action: go,
        go: "/config/change"
      },
      memberships:{
        view:true,
        icon: "./assets/img/menu_costo_member.png",
        class: "blue",
        footer:  vm.text.label.memberships,
        action: go,
        go: "/config/memberships"
      },
      schedules:{
        view:true,
        icon: "./assets/img/menu_configuracion.png",
        class: "green",
        footer: vm.text.label.schedule,
        action: go,
        go:"/config/schedule"
      },
      casino:{
        view:false,
        icon: "./assets/img/menu_casino.png",
        class: "blue",
        footer:  vm.text.label.casino,
        action: go,
        go: "/config/casino"
      }/*,
      others:{
        view:true,
        icon: "./assets/img/menu_otras_opciones.png",
        class: "blue",
        footer:  vm.text.label.others,
        action: go,
        go: "/config/others"
      }
      */
    };

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