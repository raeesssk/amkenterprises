'use strict';
/* Account Module */
angular.module('requisition', [])
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
            
            .when('/requisition',
                {
                    templateUrl: 'modules/requisition/partials/requisition-list.html',
                    controller: 'requisitionCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/requisition/controllers/requisition-list.js']
                            }]);
                        }]
                    }
                })
            
            .when('/requisition/add',
                {
                    templateUrl: 'modules/requisition/partials/requisition-add.html',
                    controller: 'requisitionAddCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/requisition/controllers/requisition-add.js']
                            }]);
                        }]
                    }
                })
            
            .when('/requisition/edit/:emId',
                {
                    templateUrl: 'modules/requisition/partials/requisition-edit.html',
                    controller: 'requisitionEditCtrl',
                    resolve: {
                        lazy: ['$ocLazyLoad',"$q", "$location","$rootScope", function ($ocLazyLoad, $q, $location, $rootScope) {
                            return $ocLazyLoad.load([{
                                name: 'myApp',
                                files: ['modules/requisition/controllers/requisition-edit.js']
                            }]);
                        }]
                    }
                });
				
        }]);