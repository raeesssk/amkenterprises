'use strict';
/* Account Module */
angular.module('bank', [])
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
            
            .when('/bank',
                {
                    templateUrl: 'modules/bank/partials/bank-list.html',
                    controller: 'bankCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bank/controllers/bank-list.js']
                            }]);
                        }]
                    }
                })

			.when('/bank/add',
                {
                    templateUrl: 'modules/bank/partials/bank-add.html',
                    controller: 'bankAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bank/controllers/bank-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/bank/edit/:bankId',
                {
                    templateUrl: 'modules/bank/partials/bank-edit.html',
                    controller: 'bankEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/bank/controllers/bank-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);