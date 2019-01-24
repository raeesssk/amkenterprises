'use strict';
/* Account Module */
angular.module('dailyexpense', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
              /*  if (!localStorageService.get('kayre_access_token')) {
                    alert("Your session has been expired");
                    window.location = 'login.html';
                    return $q.defer.promise;
                }*/

            }]

        };

        $routeProvider
            
            .when('/dailyexpense',
                {
                    templateUrl: 'modules/dailyexpense/partials/dailyexpense-list.html',
                    controller: 'dailyexpenseCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dailyexpense/controllers/dailyexpense-list.js']
                            }]);
                        }]
                    }
                })

			.when('/dailyexpense/add',
                {
                    templateUrl: 'modules/dailyexpense/partials/dailyexpense-add.html',
                    controller: 'dailyexpenseAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dailyexpense/controllers/dailyexpense-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/dailyexpense/edit/:emId',
                {
                    templateUrl: 'modules/dailyexpense/partials/dailyexpense-edit.html',
                    controller: 'dailyexpenseEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dailyexpense/controllers/dailyexpense-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);