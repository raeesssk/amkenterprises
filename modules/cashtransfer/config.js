'use strict';
/* Account Module */
angular.module('cashtransfer', [])
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
            
            .when('/cashtransfer',
                {
                    templateUrl: 'modules/cashtransfer/partials/cashtransfer-list.html',
                    controller: 'cashtransferCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/cashtransfer/controllers/cashtransfer-list.js']
                            }]);
                        }]
                    }
                })

			.when('/cashtransfer/add',
                {
                    templateUrl: 'modules/cashtransfer/partials/cashtransfer-add.html',
                    controller: 'cashtransferAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/cashtransfer/controllers/cashtransfer-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/cashtransfer/edit/:empId',
                {
                    templateUrl: 'modules/cashtransfer/partials/cashtransfer-edit.html',
                    controller: 'cashtransferEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/cashtransfer/controllers/cashtransfer-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);