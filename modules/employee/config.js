'use strict';
/* Account Module */
angular.module('employee', [])
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
            
            .when('/employee',
                {
                    templateUrl: 'modules/employee/partials/employee-list.html',
                    controller: 'employeeCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/employee/controllers/employee-list.js']
                            }]);
                        }]
                    }
                })

			.when('/employee/add',
                {
                    templateUrl: 'modules/employee/partials/employee-add.html',
                    controller: 'employeeAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/employee/controllers/employee-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/employee/edit/:empId',
                {
                    templateUrl: 'modules/employee/partials/employee-edit.html',
                    controller: 'employeeEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/employee/controllers/employee-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);