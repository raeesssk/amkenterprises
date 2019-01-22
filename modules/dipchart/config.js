'use strict';
/* Account Module */
angular.module('dipchart', [])
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
            
            .when('/dipchart',
                {
                    templateUrl: 'modules/dipchart/partials/dipchart-list.html',
                    controller: 'dipchartCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dipchart/controllers/dipchart-list.js']
                            }]);
                        }]
                    }
                })

			.when('/dipchart/add',
                {
                    templateUrl: 'modules/dipchart/partials/dipchart-add.html',
                    controller: 'dipchartAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dipchart/controllers/dipchart-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/dipchart/edit/:empId',
                {
                    templateUrl: 'modules/dipchart/partials/dipchart-edit.html',
                    controller: 'dipchartEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/dipchart/controllers/dipchart-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);