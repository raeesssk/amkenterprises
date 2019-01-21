'use strict';
/* Account Module */
angular.module('amounttoken', [])
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
            
            .when('/amounttoken',
                {
                    templateUrl: 'modules/amounttoken/partials/amounttoken-list.html',
                    controller: 'amounttokenCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/amounttoken/controllers/amounttoken-list.js']
                            }]);
                        }]
                    }
                })

			.when('/amounttoken/add',
                {
                    templateUrl: 'modules/amounttoken/partials/amounttoken-add.html',
                    controller: 'amounttokenAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/amounttoken/controllers/amounttoken-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/amounttoken/edit/:empId',
                {
                    templateUrl: 'modules/amounttoken/partials/amounttoken-edit.html',
                    controller: 'amounttokenEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/amounttoken/controllers/amounttoken-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);