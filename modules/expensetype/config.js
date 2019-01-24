'use strict';
/* Account Module */
angular.module('expensetype', [])
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
            
            .when('/expensetype',
                {
                    templateUrl: 'modules/expensetype/partials/expensetype-list.html',
                    controller: 'expensetypeCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/expensetype/controllers/expensetype-list.js']
                            }]);
                        }]
                    }
                })

			.when('/expensetype/add',
                {
                    templateUrl: 'modules/expensetype/partials/expensetype-add.html',
                    controller: 'expensetypeAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/expensetype/controllers/expensetype-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/expensetype/edit/:etmId',
                {
                    templateUrl: 'modules/expensetype/partials/expensetype-edit.html',
                    controller: 'expensetypeEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/expensetype/controllers/expensetype-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);