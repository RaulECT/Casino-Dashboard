(function () {
    angular.module('app')
        .factory('configurationFactory', configurationfactory)

    configurationfactory.$inject = ['$http', 'store'];

    function configurationfactory($http, store) {
        vm = this;
        var config = {
            headers:
            { 'Content-Type': 'application/json; charset=UTF-8' }
        };

        var api = __env.apiUrl;
        var appType= __env.appType;
        var appId= __env.appId;

        var configData;

        var service = {
            getConfigData: getConfigData,
            getDenominations: getDenominations,
            getChips: getChips,
            getAmounts: getAmounts,
            getChange: getChange,
            getMemberships: getMemberships,
            getSchedule: getSchedule,
            editConfig: editConfig
        };

        return service;

        /*------------------------
        Descripción: Consulta los datos de configuración, como son denominaciones, fichas, etc.
        Varibles de entrada
        appType(string): tipo de aplicación, por ejemplo: caja.
        Variables de salida
        json con success(boolean) y message(string).
        ------------------------*/
        function getConfigData() {
            return $http.get(api + "config/:" + appType, config).then(function (response) {
                if (response.data.success) {
                    configData = response.data.result;
                    return { success: true, message: "Config Saved" };
                }
                else {
                    return response.data;
                }
            },function(err){
                if(err.data==null) return {success:false, message:"Error de comunicación"};
                return err.data;
            });
        }

        /*------------------------
        Descripción: Retorna una array con las denominaciones obtenidas en getConfigData()
        Variables de salida
        array de denominaciones
        ------------------------*/
        function getDenominations() {
            return configData.denominations;
        }

        /*------------------------
        Descripción: Retorna una json con las fichas obtenidas en getConfigData()
        Variables de salida
        json de fichas {valor(string):color(string)}
            ejemplo:
                {"10":"rojo", "20":"azul"}
        ------------------------*/
        function getChips() {
            return configData.chips;
        }

        function getChange() {
            return {exchangeRate:configData.exchangeRate, valueUnitChip: configData.valueUnitChip};
        }

        /*------------------------
        Descripción: Retorna una array con los montos rapidos obtenidas en getConfigData()
        Variables de salida
        json de fichas {valor(string):color(string)}
            ejemplo:
                {"10":"rojo", "20":"azul"}
        ------------------------*/
        function getAmounts() {
            //console.log(configData.fastAmounts);
            var fast=configData.fastAmounts;
            return fast.slice(0);
        };

        function getMemberships(){
            return {cardReposition:configData.cardReposition/100, membershipPayment: configData.membershipPayment/100};
        };

        function getSchedule(){
            return {
                beginWorkingDay :configData.beginWorkingDay,
                endWorkingDay : configData.endWorkingDay,
                intervalMinutesSchedules : configData.intervalMinutesSchedules,
                intervalMinutesScores : configData.intervalMinutesScores
            };
        };

        function editConfig(data) {
            data.appId = appId;
            var myconfig=config;
            myconfig.headers.token=store.get('token');
            return $http.post(api + "admin/edit_config", data, config).then(function success(response) {
                console.log(response);
              return {success:true ,data:response.data.result};
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