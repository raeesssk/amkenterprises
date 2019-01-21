'use strict';
/* Account Module */
angular.module('nozzle', [])
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
            
            .when('/nozzle',
                {
                    templateUrl: 'modules/nozzle/partials/nozzle-list.html',
                    controller: 'nozzleCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/nozzle/controllers/nozzle-list.js']
                            }]);
                        }]
                    }
                })

			.when('/nozzle/add',
                {
                    templateUrl: 'modules/nozzle/partials/nozzle-add.html',
                    controller: 'nozzleAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/nozzle/controllers/nozzle-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/nozzle/edit/:empId',
                {
                    templateUrl: 'modules/nozzle/partials/nozzle-edit.html',
                    controller: 'nozzleEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/nozzle/controllers/nozzle-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);