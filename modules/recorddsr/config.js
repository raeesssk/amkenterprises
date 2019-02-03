'use strict';
/* Account Module */
angular.module('recorddsr', [])
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
            
            .when('/recorddsr',
                {
                    templateUrl: 'modules/recorddsr/partials/recorddsr-list.html',
                    controller: 'recorddsrCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recorddsr/controllers/recorddsr-list.js']
                            }]);
                        }]
                    }
                })

			.when('/recorddsr/add',
                {
                    templateUrl: 'modules/recorddsr/partials/recorddsr-add.html',
                    controller: 'recorddsrAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recorddsr/controllers/recorddsr-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/recorddsr/edit/:empId',
                {
                    templateUrl: 'modules/recorddsr/partials/recorddsr-edit.html',
                    controller: 'recorddsrEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/recorddsr/controllers/recorddsr-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);