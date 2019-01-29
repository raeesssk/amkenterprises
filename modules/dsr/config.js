'use strict';
/* Account Module */
angular.module('dsr', [])
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
            
            .when('/dsr',
                {
                    templateUrl: 'modules/dsr/partials/dsr-list.html',
                    controller: 'dsrCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dsr/controllers/dsr-list.js']
                            }]);
                        }]
                    }
                })

			.when('/dsr/add',
                {
                    templateUrl: 'modules/dsr/partials/dsr-add.html',
                    controller: 'dsrAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dsr/controllers/dsr-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/dsr/edit/:empId',
                {
                    templateUrl: 'modules/dsr/partials/dsr-edit.html',
                    controller: 'dsrEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dsr/controllers/dsr-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);