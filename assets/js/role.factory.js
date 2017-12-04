(function () {
    angular.module('app')
        .factory('roleFactory', rolefactory)

    rolefactory.$inject = ['$http', 'store'];

    function rolefactory($http, store) {
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
        var roleToEdit=null;

        var configData;

        var service = {
            getRoles: getRoles,
            getPermissions: getPermissions,
            setRole: setRole,
            getRole: getRole,
            editRole: editRole,
            newRole: newRole

        };

        return service;

        function getRoles() {
            return $http.get(api + "get_roles", config).then(function (response) {
                return { success: true, data: response.data.result.rolesArray };
            }, function (err) {
                if (err.data == null) return { success: false, message: "Error de comunicación" };
                return err.data;
            });
        };

        function getPermissions() {
            return $http.get(api + "get_permissions", config).then(function (response) {
                return { success: true, data: response.data.result.permissionsArray };
            }, function (err) {
                if (err.data == null) return { success: false, message: "Error de comunicación" };
                return err.data;
            });
        };

        function setRole(myrole){
            roleToEdit=myrole;
        };

        function getRole(){
            return roleToEdit;
        };

        function editRole(data) {
            /*data.appId = appId;*/
            console.log(data);
            return $http.post(api + "edit_rol", data, config).then(function success(response) {
                console.log(response);
                return { success: true, data: response.data.result };
            }, function error(err) {
                console.log(err);
                var error = "Error no reconocido";
                console.log(err);
                if (err.data == null) return { success: false, message: "Error de comunicación" };
                if (err.data.error) error = err.data.error;
                return { success: false, message: error };
            });
        };

        function newRole(data) {
            /*data.appId = appId;*/
            console.log(data);
            return $http.post(api + "create_rol", data, config).then(function success(response) {
                console.log(response);
                return { success: true, data: response.data.result };
            }, function error(err) {
                console.log(err);
                var error = "Error no reconocido";
                console.log(err);
                if (err.data == null) return { success: false, message: "Error de comunicación" };
                if (err.data.error) error = err.data.error;
                return { success: false, message: error };
            });
        };

    }

})();