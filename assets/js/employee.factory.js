(function () {
    angular.module('app')
        .factory('employeeFactory', employeefactory)

    employeefactory.$inject = ['$http', 'store'];

    function employeefactory($http, store) {
        vm = this;
        var config = {
            headers:
                {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'token': store.get('token')
                }
        };

        var api = __env.apiUrl + 'admin/';
        var appType = __env.appType;
        var appId = __env.appId;
        var userToEdit=null;

        var configData;

        var service = {
            userByName: userByName,
            newUser: newUser,
            editUser: editUser,
            setUser: setUser,
            getUser: getUser
        };

        return service;

        function userByName(name) {
            var data="?partName="+name;
            return $http.get(api + "users_by_name" + data, config).then(function (response) {
                return { success: true, data: response.data.result.usersArray };
            }, function (err) {
                if (err.data == null) return { success: false, message: "Error de comunicación" };
                return err.data;
            });
        };

        function newUser(data) {
            data.appId=appId;
            return $http.post(api + "create_user_tmp", data, config).then(function (response) {
                return { success: true };
            }, function (err) {
                console.log(err);
                return { success: false, message: err.data.error };
            });
        };

        function editUser(data){
            data.appId=appId;
            return $http.post(api + "edit_user", data, config).then(function (response) {
                return { success: true };
            }, function (err) {
                console.log(err);
                return { success: false, message: err.data.error };
            });
        };

        function setUser(user){
            userToEdit=user;
        };

        function getUser(){
            return userToEdit;
        }

    }

})();