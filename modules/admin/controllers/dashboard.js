// import admin
angular.module('admin').controller('dashboardCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#dashboardindex').addClass("active");
  
	$scope.invoicereport = 0;
  $scope.purchasereport = 0;
  $scope.salesreport =0;

    $scope.getCountReport = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/dashboard/dashadmin',
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(dashboardadmin)
        {
            dashboardadmin.forEach(function (value, key) {
              if(value.type == "invoicereport")
              {
                $scope.invoicereport = value.id;
              }
              else if(value.type == "purchasereport")
              {
                $scope.purchasereport = value.id;
              }
              else if(value.type == "salesreport")
              {
                $scope.salesreport = value.id;
              }
            });
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');
            }, 1500);
        });
    };

});