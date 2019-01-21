'use strict';
/* Account Module */
angular.module('paymentmode', [])
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
            
            .when('/paymentmode',
                {
                    templateUrl: 'modules/paymentmode/partials/paymentmode-list.html',
                    controller: 'paymentmodeCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/paymentmode/controllers/paymentmode-list.js']
                            }]);
                        }]
                    }
                })

			.when('/paymentmode/add',
                {
                    templateUrl: 'modules/paymentmode/partials/paymentmode-add.html',
                    controller: 'paymentmodeAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/paymentmode/controllers/paymentmode-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/paymentmode/edit/:empId',
                {
                    templateUrl: 'modules/paymentmode/partials/paymentmode-edit.html',
                    controller: 'paymentmodeEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/paymentmode/controllers/paymentmode-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);