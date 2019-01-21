'use strict';
/* Account Module */
angular.module('ledger', [])
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
            
            .when('/ledger',
                {
                    templateUrl: 'modules/ledger/partials/ledger-list.html',
                    controller: 'ledgerCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/ledger/controllers/ledger-list.js']
                            }]);
                        }]
                    }
                })
            
            .when('/ledger/add',
                {
                    templateUrl: 'modules/ledger/partials/ledger-add.html',
                    controller: 'ledgerAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/ledger/controllers/ledger-add.js']
                            }]);
                        }]
                    }
                })
            
            .when('/ledger/edit/:emId',
                {
                    templateUrl: 'modules/ledger/partials/ledger-edit.html',
                    controller: 'ledgerEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/ledger/controllers/ledger-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);