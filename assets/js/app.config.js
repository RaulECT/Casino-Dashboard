(function () {
    'use strict';

    var _templateBase = './templates';

    angular.module('app').config(routers);

    routers.$inject = ['$routeProvider', "$httpProvider", 'jwtInterceptorProvider', 'jwtOptionsProvider', 'storeProvider'];

    function routers($routeProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider, storeProvider) {

        storeProvider.setStore('sessionStorage');
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.defaults.timeout = 5000;
        
        jwtOptionsProvider.config({
            tokenGetter: function () {
                return localStorage.getItem('token');
            },
            whiteListedDomains: [__env.apiUrl, 'http://127.0.0.1:5000','localhost']

        });
        $httpProvider.interceptors.push('jwtInterceptor');
        //$httpProvider.interceptors.push(config.headers['Token']);


        $routeProvider
            .when('/login', {
                templateUrl: _templateBase + '/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/inicio', {
                templateUrl: _templateBase + '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/config', {
                templateUrl: _templateBase + '/config/config.view.html',
                controller: 'configCtrl',
                controllerAs: 'vm'
            })
            .when('/config/chips', {
                templateUrl: _templateBase + '/config/chips/chips.view.html',
                controller: 'configChipsCtrl',
                controllerAs: 'vm'
            })
            .when('/config/fastAmounts', {
                templateUrl: _templateBase + '/config/fastAmounts/fastAmounts.view.html',
                controller: 'configFastAmountCtrl',
                controllerAs: 'vm'
            })
            .when('/config/level', {
                templateUrl: _templateBase + '/config/level/level.view.html',
                controller: 'configLevelCtrl',
                controllerAs: 'vm'
            })
            .when('/config/memberships', {
                templateUrl: _templateBase + '/config/membership/membership.view.html',
                controller: 'configMembershipCtrl',
                controllerAs: 'vm'
            })
            .when('/config/change', {
                templateUrl: _templateBase + '/config/change/change.view.html',
                controller: 'configChangeCtrl',
                controllerAs: 'vm'
            })
            .when('/config/casino', {
                templateUrl: _templateBase + '/config/casino/casino.view.html',
                controller: 'configCasinoCtrl',
                controllerAs: 'vm'
            })
            .when('/config/levelManager', {
                templateUrl: _templateBase + '/config/levelManager/levelManager.view.html',
                controller: 'configlevelManagerCtrl',
                controllerAs: 'vm'
            })
            .when('/config/schedule', {
                templateUrl: _templateBase + '/config/schedule/schedule.view.html',
                controller: 'configScheduleCtrl',
                controllerAs: 'vm'
            })
            .when('/roleManager', {
                templateUrl: _templateBase + '/roleManager/roleManager.view.html',
                controller: 'roleManagerCtrl',
                controllerAs: 'vm'
            })
            .when('/roleManager/newRole', {
                templateUrl: _templateBase + '/roleManager/newRole/newRole.view.html',
                controller: 'roleManagerNewRoleCtrl',
                controllerAs: 'vm'
            })
            .when('/roleManager/editRole', {
                templateUrl: _templateBase + '/roleManager/editRole/editRole.view.html',
                controller: 'editRoleCtrl',
                controllerAs: 'vm'
            })
            .when('/employeeManager', {
                templateUrl: _templateBase + '/employeeManager/employeeManager.view.html',
                controller: 'employeeManagerCtrl',
                controllerAs: 'vm'
            })
            .when('/employeeManager/newUser', {
                templateUrl: _templateBase + '/employeeManager/newUser/newUser.view.html',
                controller: 'newUserCtrl',
                controllerAs: 'vm'
            })
            .when('/employeeManager/editUser', {
                templateUrl: _templateBase + '/employeeManager/editUser/editUser.view.html',
                controller: 'editUserCtrl',
                controllerAs: 'vm'
            })
            .when('/clientManager', {
                templateUrl: _templateBase + '/clientManager/clientManager.view.html',
                controller: 'clientManagerCtrl',
                controllerAs: 'vm'
            })
            .when('/sales', {
                templateUrl: _templateBase + '/sales/sales.view.html',
                controller: 'salesCtrl',
                controllerAs: 'vm'
            })
            .when('/statistics', {
                templateUrl: _templateBase + '/statistics/statistics.view.html',
                controller: 'statisticsCtrl',
                controllerAs: 'vm'
            })
            .when('/statistics/emailmanager', {
                templateUrl: _templateBase + '/statistics/emailmanager/emailmanager.view.html',
                controller: 'emailManagerCtrl',
                controllerAs: 'vm'
            })
            .when('/statistics/showStatistics', {
                templateUrl: _templateBase + '/statistics/showStatistics/showStatistics.view.html',
                controller: 'showStatisticsCtrl',
                controllerAs: 'vm'
            })
            

        $routeProvider.otherwise({ redirectTo: '/inicio' });
    }
})();