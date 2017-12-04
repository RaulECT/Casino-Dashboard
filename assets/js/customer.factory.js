(function () {
    angular.module('app')
      .factory('customerFactory', customerfactory)
  
    customerfactory.$inject = ['$http', 'store'];
  
    function customerfactory($http, store) {
      vm = this;
      var config = {
        headers:
        { 'Content-Type': 'application/json; charset=UTF-8' }
      };
  
      var api = __env.apiUrl+"admin/";///"http://50.21.179.234:3000/api/";
  
      var appType = __env.appType;
      var appId = __env.appId;
  
      var oldPath;
      var status=false;

      var service = {
        start: start,
        stop: stop,
        setPath: setPath,
        getPath: getPath,
        getStatus: getStatus
      };
  
      return service;
  
      ////////////
     function createUser(data){
        data.appId = appId;
        return $http.post(api + "create_user", data, config).then(function success(response) {
          //console.log(response.data);
          if (response.status == 200) return {success:true};
          //return response.data;
  
        }, function error(err) {
          var error = "Error no reconocido";
          if(err.data==null) return {success:false, message:"Error de comunicación"};
          if (err.data.error) error = err.data.error;
          return { success: false, message: error };
        });
     }

  
    }
  
  })();