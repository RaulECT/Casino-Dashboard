(function () {
    angular.module('app')
      .factory('logFactory', logfactory)
  
      logfactory.$inject = ['$http', 'store'];
  
    function logfactory($http, store) {
      vm = this;
      var config = {
        headers:
        { 'Content-Type': 'application/json; charset=UTF-8',
            'token':store.get('token') }
      };
  
      var api = __env.apiUrl+"admin/";///"http://50.21.179.234:3000/api/";
  
      var appType = __env.appType;
      var appId = __env.appId;
  
      var oldPath;
      var status=false;

      var service = {
        till: till
      };
  
      return service;
  
      ////////////
     function till(data){
         var filter="?pageNumber="+data.pageNumber+"&pageSize="+data.pageSize;
         if(data.tillId) filter+="&tillId="+data.tillId
        return $http.get(api + "get_till_log"+filter, config).then(ok_callback,err_callback);
     };

     function ok_callback(response){
         console.log(response.data.result);
        return {success:true, data:response.data.result };
     };

     function err_callback(err){
         console.log(err);
        var error = "Error no reconocido";
        if(err.data==null) return {success:false, message:"Error de comunicación"};
        if (err.data.error) error = err.data.error;
        return { success: false, message: error };
     }

  
    }
  
  })();