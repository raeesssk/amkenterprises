'use strict';

/* Account Module */
angular.module('report', [])
    .config(['$routeProvider', function config($routeProvider) {
        var resolve = {
            data: ["$q", "$location", function ($q, $location) {
            
            }]

        };

        $routeProvider
            
            .when('/invoicereport',
                {
                    templateUrl: 'modules/report/partials/invoice-report.html',
                    controller: 'invoiceReportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/invoice-report.js']
                            }]);
                        }]
                    }
                })
            .when('/purchasereport',
                {
                    templateUrl: 'modules/report/partials/purchase-report.html',
                    controller: 'purchaseReportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/purchase-report.js']
                            }]);
                        }]
                    }
                })
            .when('/salesreport',
                {
                    templateUrl: 'modules/report/partials/sales-report.html',
                    controller: 'salesReportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/sales-report.js']
                            }]);
                        }]
                    }
                })
            .when('/paymentmodereport',
                {
                    templateUrl: 'modules/report/partials/paymentmode-report.html',
                    controller: 'paymentmodereportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/paymentmode-report.js']
                            }]);
                        }]
                    }
                })
            .when('/summaryreport',
                {
                    templateUrl: 'modules/report/partials/summary-report.html',
                    controller: 'summaryreportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/summary-report.js']
                            }]);
                        }]
                    }
                })
            .when('/stockpricereport',
                {
                    templateUrl: 'modules/report/partials/stockprice-report.html',
                    controller: 'stockpricereportCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/report/controllers/stockprice-report.js']
                            }]);
                        }]
                    }
                });
    }]);