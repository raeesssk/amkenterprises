'use strict';
/* Account Module */
angular.module('assignclose', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {

            }]

        };

        $routeProvider
                
             .when('/assignclose',
                {
                    templateUrl: 'modules/assignclose/partials/assignclose-list.html',
                    controller: 'assigncloseCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assignclose/controllers/assignclose-list.js']
                            }]);
                        }]
                    }
                })
            .when('/assignclose/add',
                {
                    templateUrl: 'modules/assignclose/partials/assignclose-add.html',
                    controller: 'assigncloseAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assignclose/controllers/assignclose-add.js']
                            }]);
                        }]
                    }
                })
            .when('/assignclose/edit/:assigncloseId',
                {
                    templateUrl: 'modules/assignclose/partials/assignclose-edit.html',
                    controller: 'assigncloseEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/assignclose/controllers/assignclose-edit.js']
                            }]);
                        }]
                    }
                });
    }]);


