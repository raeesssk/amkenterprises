'use strict';
/* Account Module */
angular.module('productprice', [])
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
            
            .when('/productprice',
                {
                    templateUrl: 'modules/productprice/partials/productprice-list.html',
                    controller: 'productpriceCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/productprice/controllers/productprice-list.js']
                            }]);
                        }]
                    }
                })

			.when('/productprice/add',
                {
                    templateUrl: 'modules/productprice/partials/productprice-add.html',
                    controller: 'productpriceAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/productprice/controllers/productprice-add.js']
                            }]);
                        }]
                    }
                })
				
			.when('/productprice/edit/:empId',
                {
                    templateUrl: 'modules/productprice/partials/productprice-edit.html',
                    controller: 'productpriceEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/productprice/controllers/productprice-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);