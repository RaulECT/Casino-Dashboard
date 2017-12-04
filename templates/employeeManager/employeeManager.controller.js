/**
 * @fileOverview This is Home Controller definition
 * @module Home
 */
(function() {
    angular.module('app').controller('employeeManagerCtrl', employeemanagerctrl);
  
    employeemanagerctrl.$inject = ['$location',  'authenticateFactory',  'languageFactory', 'employeeFactory'];
  
    function employeemanagerctrl( $location,  authenticateFactory,  languageFactory, employeeFactory) {
      var vm = this;
      vm.text=languageFactory.employeeManager();
      vm.logo='./assets/img/menu_int_adm_usuarios.png';
      vm.seachByName=seachByName;
      vm.edit=edit;
      vm.users=[];
      vm.change=change;
      vm.go=go;
  
      function seachByName(name){
        if(name.length>2){
          employeeFactory.userByName(name).then(function(x){
            if(x.success){
              vm.users=[];
              x.data.forEach(function(item){
                item.checked=false;
                vm.users.push(item);
              });
              //vm.users=x.data;
            }
            else{
              console.log(x.message);
            }
          });
        }
        else vm.users=[];
      };

      function edit(user){
        employeeFactory.setUser(user);
        go('employeeManager/editUser');
      };

      function change(checked){
        console.log(checked);
        return !checked;
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