'use strict';
/* Account Module */
angular.module('purexpense', [])
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
            
            .when('/purexpense',
                {
                    templateUrl: 'modules/purexpense/partials/purexpense-list.html',
                    controller: 'purexpenseListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purexpense/controllers/purexpense-list.js']
                            }]);
                        }]
                    }
                })
            .when('/purexpense/add',
                {
                    templateUrl: 'modules/purexpense/partials/purexpense-add.html',
                    controller: 'purexpenseAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purexpense/controllers/purexpense-add.js']
                            }]);
                        }]
                    }
                })
            .when('/purexpense/edit/:emId',
                {
                    templateUrl: 'modules/purexpense/partials/purexpense-edit.html',
                    controller: 'purexpenseEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/purexpense/controllers/purexpense-edit.js']
                            }]);
                        }]
                    }
                });
                
        }]);