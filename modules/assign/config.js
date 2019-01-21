'use strict';
/* Account Module */
angular.module('assign', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {

            }]

        };

        $routeProvider
                
             .when('/assign',
                {
                    templateUrl: 'modules/assign/partials/assign-list.html',
                    controller: 'assignCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assign/controllers/assign-list.js']
                            }]);
                        }]
                    }
                })
            .when('/assign/add',
                {
                    templateUrl: 'modules/assign/partials/assign-add.html',
                    controller: 'assignAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assign/controllers/assign-add.js']
                            }]);
                        }]
                    }
                })
            .when('/assign/edit/:assignId',
                {
                    templateUrl: 'modules/assign/partials/assign-edit.html',
                    controller: 'assignEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assign/controllers/assign-edit.js']
                            }]);
                        }]
                    }
                });
    }]);


