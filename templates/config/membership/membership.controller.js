/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('configMembershipCtrl', configmembershipctrl);

  configmembershipctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory', 'configurationFactory'];

  function configmembershipctrl( $location,  authenticateFactory,  languageFactory, configurationFactory) {
    var vm = this;
    var modal= document.getElementById("ConfigMembershipModal");
    vm.text=languageFactory.configMembership();
    vm.payment=configurationFactory.getMemberships();
    vm.save=save;
    vm.updateMembership=updateMembership;
    vm.close=close;
    vm.go=go;
    vm.question = "¿Estas seguro que quieres actualizar los precios de la membresia y reposición?";
    vm.ok = "La infomación se actualizo con exito.";
    vm.err = "Hubo un problema al actualizar la infomación, intentelo más tarde.";
    vm.logo="./assets/img/menu_int_costo_member.png"; 
    vm.gold="./assets/img/member_gold.png";
    vm.silver="./assets/img/member_silver.png";
    vm.bronze="./assets/img/member_bronze.png";

    function save() {
      vm.message = vm.question;
      modal.style.display = "block";
    };

    function updateMembership() {
      vm.payment.membershipPayment=vm.payment.membershipPayment*100.0;
      vm.payment.cardReposition=vm.payment.cardReposition*100.0;
      configurationFactory.editConfig(vm.payment).then(function (x) {
        if (x.success) {
          vm.message = vm.ok;
          configurationFactory.getConfigData().then(function (y) {
            if (y.success) {
              modal.style.display = "none";
              vm.payment = configurationFactory.getMemberships();
            }
          });
        }
        else {
          vm.message = vm.err;
          modal.style.display = "none";
          vm.payment = configurationFactory.getMemberships();
        }
      });
    };

    function close(){
      modal.style.display="none";
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