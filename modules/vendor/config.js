'use strict';
/* Account Module */
angular.module('vendor', [])
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
            
            .when('/vendor',
                {
                    templateUrl: 'modules/vendor/partials/vendor-list.html',
                    controller: 'vendorListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/vendor/controllers/vendor-list.js']
                            }]);
                        }]
                    }
                })
            .when('/vendor/add',
                {
                    templateUrl: 'modules/vendor/partials/vendor-add.html',
                    controller: 'vendorAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/vendor/controllers/vendor-add.js']
                            }]);
                        }]
                    }
                })
            .when('/vendor/edit/:vendorId',
                {
                    templateUrl: 'modules/vendor/partials/vendor-edit.html',
                    controller: 'vendorEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/vendor/controllers/vendor-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);