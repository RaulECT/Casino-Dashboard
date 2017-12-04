var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

(function () {
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngMaterial', 'ngAnimate', 'angular-jwt', 'angular-storage', 'chart.js'])
        .constant('__env', env)
        .run(onrun)

    onrun.$inject = ['$rootScope', 'jwtHelper', 'store', '$location', 'configurationFactory', 'fingerFactory', 'newFactory'];

    function onrun($rootScope, jwtHelper, store, $location, configurationFactory, fingerFactory, newFactory) {

        //storeProvider.setStore('sessionStorage');
        fingerFactory.init();
        newFactory.enumerateDivices();
        
        var sys = require('util')
        var exec = require('child_process').exec;
        var deviceId = {};

        $rootScope.$on('$routeChangeStart', function (event, next) {
            var token = store.get('token') || false;
            if ('$$route' in next) {
                if (!token && next.$$route.originalPath != "/first_config" && next.$$route.originalPath != "/first_config/login") $location.path('/login');
                else {
                    var bool = jwtHelper.isTokenExpired(token);
                    if (bool === true) $location.path('/login');
                }
            }
            else{
                if (!token) $location.path('/login');
                else {
                    var bool = jwtHelper.isTokenExpired(token);
                    if (bool === true) $location.path('/login');
                }
            }
        });

        configurationFactory.getConfigData().then(function (response) {
            console.log(response);
            if (response.success) {

            }
            else {
                console.log(response.message);
            }
        });

        exec("wmic CPU get ProcessorId", (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            deviceId.ProcessorId = stdout.split("  \r\r\n")[1];
            exec("wmic baseboard get serialnumber", (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                deviceId.MotherBoardId = stdout.split("  \r\r\n")[1];
                exec("wmic DISKDRIVE get SerialNumber", (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    deviceId.HDDId = "WD-WXD1EA1UXJC3";//stdout.split("  \r\r\n")[1];
                    store.set("diviceId", deviceId);
                    console.log(deviceId);
                });
            });
        });

    }

})();