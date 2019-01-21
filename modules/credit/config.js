'use strict';
/* Account Module */
angular.module('credit', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {

            }]

        };

        $routeProvider
            
            .when('/credit',
                {
                    templateUrl: 'modules/credit/partials/credit-list.html',
                    controller: 'creditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/credit/controllers/credit-list.js']
                            }]);
                        }]
                    }
                })
            
            .when('/credit/add',
                {
                    templateUrl: 'modules/credit/partials/credit-add.html',
                    controller: 'creditAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/credit/controllers/credit-add.js']
                            }]);
                        }]
                    }
                })
            
            .when('/credit/edit/:smId',
                {
                    templateUrl: 'modules/credit/partials/credit-edit.html',
                    controller: 'creditEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/credit/controllers/credit-edit.js']
                            }]);
                        }]
                    }
                })
            
    }]);


