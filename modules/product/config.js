'use strict';
/* Account Module */
angular.module('product', [])
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
            
            .when('/product',
                {
                    templateUrl: 'modules/product/partials/product-list.html',
                    controller: 'productListCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/product/controllers/product-list.js']
                            }]);
                        }]
                    }
                })
			.when('/product/add',
                {
                    templateUrl: 'modules/product/partials/product-add.html',
                    controller: 'productAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/product/controllers/product-add.js']
                            }]);
                        }]
                    }
                })
			.when('/product/edit/:productId',
                {
                    templateUrl: 'modules/product/partials/product-edit.html',
                    controller: 'productEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/product/controllers/product-edit.js']
                            }]);
                        }]
                    }
                });
                
        }]);