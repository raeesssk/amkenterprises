'use strict';
/* Account Module */
angular.module('shift', [])
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
            
            .when('/shift',
                {
                    templateUrl: 'modules/shift/partials/shift-list.html',
                    controller: 'shiftCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/shift/controllers/shift-list.js']
                            }]);
                        }]
                    }
                })

			.when('/shift/add',
                {
                    templateUrl: 'modules/shift/partials/shift-add.html',
                    controller: 'shiftAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/shift/controllers/shift-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/shift/edit/:empId',
                {
                    templateUrl: 'modules/shift/partials/shift-edit.html',
                    controller: 'shiftEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/shift/controllers/shift-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);