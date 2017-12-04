/**
 * @fileOverview This is config Controller definition
 * @module config
 */
(function() {
  angular.module('app').controller('editRoleCtrl', editrole);

  editrole.$inject = ['$location',  'authenticateFactory', 'roleFactory', 'languageFactory'];

  function editrole( $location,  authenticateFactory,  roleFactory, languageFactory) {
    var vm = this;
    var roleId;
    vm.text=languageFactory.editRole();
    vm.logo="./assets/img/menu_int_gestion_roles.png";
    vm.change=change;
    vm.updateRole=updateRole;
    vm.go=go;
    vm.roleName=null;

     
    vm.allPermissions=[];
    vm.permissions=[];
    getPermissions();
    
      
    function getPermissions(){
      roleFactory.getPermissions().then(function(x){
        if(x.success){
          x.data.forEach(function(permission){
            vm.allPermissions.push({id:permission.id, name:vm.text.permissions[permission.id], value:false});
          });
          showPermissions(roleFactory.getRole());
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

    function showPermissions(role){
      
      vm.permissions=[];
      vm.roleName=role.name;
      roleId=role.id;
      console.log(role);
      vm.allPermissions.forEach(function(item){
        var p={name:item.name, id:item.id, value:false};
        if(role['permissions'][item.id]) p.value=true;
        vm.permissions.push(p);
      });
      console.log(vm.permissions);
    };

    function updateRole(){
      //console.log(vm.permissions);
      var role={};
      for(var i=0; i<vm.permissions.length;i++){
        role[vm.permissions[i]['id']]=vm.permissions[i]['value'];
      }
      roleFactory.editRole({id:roleId, permissions:role}).then(function(x){
        if(x.success){
          roleFactory.setRole(null);
          go('/roleManager');
        }
        else{
          console.log(x.message);
        }
      });
    };

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