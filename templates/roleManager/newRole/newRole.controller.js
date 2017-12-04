/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('roleManagerNewRoleCtrl', rolemanagernewrole);

  rolemanagernewrole.$inject = ['$location',  'authenticateFactory', 'roleFactory', 'languageFactory'];

  function rolemanagernewrole( $location,  authenticateFactory,  roleFactory, languageFactory) {
    var vm = this;
    vm.text=languageFactory.roleManagerNewRole();
    vm.logo="./assets/img/menu_int_gestion_roles.png";
    vm.change=change;
    vm.newRole=newRole;
    vm.roleName=null;
    vm.go=go;
     
    vm.permissions=[];
    
    getPermissions()
      
    function getPermissions(){
      roleFactory.getPermissions().then(function(x){
        if(x.success){
          x.data.forEach(function(permission){
            vm.permissions.push({id:permission.id, name:vm.text.permissions[permission.id], value:false});
          });
        }
      });
    };

    function change(id){
      for(var i=0; i<vm.permissions.length;i++){
        if(vm.permissions[i]['id']==id){
          vm.permissions[i]['value']=!vm.permissions[i]['value'];
          break;
        }
      }
    };

    function newRole(){
      var role={};
      for(var i=0; i<vm.permissions.length;i++){
        role[vm.permissions[i]['id']]=vm.permissions[i]['value'];
      }
      roleFactory.newRole({id:vm.roleName, permissions: role}).then(function(x){
        if(x.success){
          go('/roleManager');
        }
        else{
          console.log(x.message);
        }
      });
    }

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