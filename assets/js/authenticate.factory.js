(function () {
  angular.module('app')
    .factory('authenticateFactory', authenticatefactory)

  authenticatefactory.$inject = ['$http', 'store'];

  function authenticatefactory($http, store) {
    vm = this;
    var config = {
      headers:
      { 'Content-Type': 'application/json; charset=UTF-8' }
    };

    var sys = require('util')
    var exec = require('child_process').exec;
    var diviceID = null;


    var api = __env.apiUrl;

    var appType = __env.appType;
    var appId = __env.appId;

    var service = {
      password: password,
      fingerprint: fingerprint,
      authentificate: authentificate,
      logout: logout
    };

    return service;

    ////////////
    // Funciones para clientes
    function password(data) {
      deviceId=new Buffer(JSON.stringify(store.get('diviceId'))).toString('base64');
      data.deviceId=deviceId;
      data.appType = appType;
      data.appId = appId;
      return $http.post(api + "password_login", data, config).then(function success(response) {
        return response.data;
      }, function error(err) {
        console.log(err);
        var error = "Error no reconocido";
        console.log(err);
        if (err.data == null) return { success: false, message: "Error de comunicación" };
        if (err.data.error) error = err.data.error;
        return { success: false, message: error };
      });
    };

    function fingerprint(data) {
      deviceId=new Buffer(JSON.stringify(store.get('diviceId'))).toString('base64');
      data.deviceId=deviceId;
      data.appType = appType;
      data.appId = appId;
      return $http.post(api + "fingerprint_login", data, config).then(function success(response) {
        return response.data;
      }, function error(err) {
        console.log(err);
        var error = "Error no reconocido";
        if (err.data == null) return { success: false, message: "Error de comunicación" };
        if (err.data.error) error = err.data.error;
        return { success: false, message: error };
      });
    };
    // Funciones para listas de lecturas
    function authentificate(method, data) {
      var routhe = "password_authenticate";
      if (method == "fingerprint") routhe = "fingerprint_authenticate";
      data.appType = appType;
      data.appId = appId;
      return $http.post(api + routhe, data, config).then(function success(response) {
        if (response.status == 200) return { success: true, token: response.data.result.token };
        return response.data;
      }, function error(err) {
        var error = "Error no reconocido";
        if (err.data == null) return { success: false, message: "Error de comunicación" };
        if (err.data.error) error = err.data.error;
        return { success: false, message: error };
      });
    };

    function logout() {
      var outConfig = config;
      var data = {};
      data.appType = appType;
      data.appId = appId;
      outConfig.headers.token = store.get('token');
      return $http.post(api + "logout", data, outConfig).then(function success(response) {
        if (response.data.success) {
          store.remove('token');
          return response.data;
        }

      }, function error(err) {
        var error = "Error no reconocido";
        if (err.data == null) return { success: false, message: "Error de comunicación" };
        if (err.data.error) error = err.data.error;
        return { success: false, message: error };
      });
    };

  }

})();