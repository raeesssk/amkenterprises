'use strict';
/* Account Module */
angular.module('invoice', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {

            }]

        };

        $routeProvider
            
            .when('/invoice',
                {
                    templateUrl: 'modules/invoice/partials/invoice-list.html',
                    controller: 'invoiceCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/invoice/controllers/invoice-list.js']
                            }]);
                        }]
                    }
                })
            
            .when('/invoice/add',
                {
                    templateUrl: 'modules/invoice/partials/invoice-add.html',
                    controller: 'invoiceAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/invoice/controllers/invoice-add.js']
                            }]);
                        }]
                    }
                })
            
            .when('/invoice/edit/:smId',
                {
                    templateUrl: 'modules/invoice/partials/invoice-edit.html',
                    controller: 'invoiceEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/invoice/controllers/invoice-edit.js']
                            }]);
                        }]
                    }
                })
            
    }]);


