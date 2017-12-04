/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
  angular.module('app').controller('roleManagerCtrl', roleManagerctrl);

  roleManagerctrl.$inject = ['$location',  'authenticateFactory', 'roleFactory', 'languageFactory'];

  function roleManagerctrl( $location,  authenticateFactory, roleFactory, languageFactory) {
    var vm = this;
    var modal = document.getElementById("myModalRole");
    vm.text=languageFactory.roleManager();
    vm.allPermissions=[];
    vm.roles=[];
    vm.roleName=null;
    vm.img='./assets/img/menu_int_gestion_roles.png';
    vm.showPermissions=showPermissions;
    vm.getName=getName;
    vm.updateRole=updateRole;
    vm.close=close;
    vm.go=go;

    getPermissions();
    getRoles();
    vm.permissions=[];

    function getRoles(){
      roleFactory.getRoles().then(function(x){
        if(x.success){
          x.data.forEach(function(item){
            /*console.log(item);
            item.name=vm.text.role[item.id];*/
            vm.roles.push(item);
          });
        }
      });
    };

    function showPermissions(role){
      console.log(role);
      roleFactory.setRole(role);
      go('/roleManager/editRole');
      /*
      vm.permissions=[];
      vm.roleName=role.name;
      console.log(vm.allPermissions);
      vm.allPermissions.forEach(function(item){
        var p={name:vm.text.permissions[item], id:item, value:false};
        if(item in role.permissions) p.value=true;
        vm.permissions.push(p);
      });
      console.log(vm.permissions);
      modal.style.display="block";
      */
    };

    function getPermissions(){
      roleFactory.getPermissions().then(function(x){
        if(x.success){
          x.data.forEach(function(permission){
            vm.allPermissions.push(permission.id);
          });
        }
      });
    };
    
    function getName(p){
      console.log(p);
      return "hola";
    };

    function updateRole(){
      console.log(vm.permissions);
    };

    function close(){
      modal.style.display="none";
    }

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