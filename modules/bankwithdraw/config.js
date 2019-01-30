'use strict';
/* Account Module */
angular.module('bankwithdraw', [])
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
            
            .when('/bankwithdraw',
                {
                    templateUrl: 'modules/bankwithdraw/partials/bankwithdraw-list.html',
                    controller: 'bankwithdrawCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bankwithdraw/controllers/bankwithdraw-list.js']
                            }]);
                        }]
                    }
                })

			.when('/bankwithdraw/add',
                {
                    templateUrl: 'modules/bankwithdraw/partials/bankwithdraw-add.html',
                    controller: 'bankwithdrawAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bankwithdraw/controllers/bankwithdraw-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/bankwithdraw/edit/:empId',
                {
                    templateUrl: 'modules/bankwithdraw/partials/bankwithdraw-edit.html',
                    controller: 'bankwithdrawEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bankwithdraw/controllers/bankwithdraw-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);