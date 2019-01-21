// import admin
angular.module('expense').controller('expenseCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#cashbooklistindex').addClass("active");
  
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.purexpenseListcount = 0;
    $scope.loading1 = 0;
    $scope.limit = {};
    
$scope.apiURL = $rootScope.baseURL+'/expense/expense/total';
   $scope.getAll = function () {
          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
            $scope.limit.search = "";
          }
          else{
            $scope.limit.search = $scope.searchtext;
          }
          $http({
            method: 'POST',
            url: $scope.apiURL,
            data:$scope.limit,
            headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
          })
          .success(function(category)
          {
            category.forEach(function (value, key) {
                $scope.purexpenseListcount=value.total;
            });
            $scope.$watch("currentPage + numPerPage",
                function () {
                    $scope.resetpagination();

                });
                // $scope.$apply(); 
          })
          .error(function(data) 
          {   
              $scope.loading1 = 1;
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">No Record Found!</p>',
                    closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              }, 1500);             
          });
      };

    //Pagination Function
    // $scope.resetpagination = function () {
    //     var begin = (($scope.currentPage - 1) * $scope.numPerPage);
    //     var end = begin + $scope.numPerPage;
    //     $scope.filterUserend = begin + 1;  
    //     $scope.filterUser = end;
    //     if ($scope.filterUser >= $scope.customerList.length)
    //         $scope.filterUser = $scope.customerList.length;
    //     $scope.filteredTodos = $scope.customerList.slice(begin, end);
    // };
     $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.purexpenseListcount)
            $scope.filterUser = $scope.purexpenseListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/expense/expense/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(customer)
              {
                $scope.filteredTodos = [];
                if (customer.length > 0) {
                    customer.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                }
                // $scope.obj_Main = $scope.customerList;
                    $scope.loading1 = 1;
                    // $scope.$apply(); 
              })
              .error(function(data) 
              {   
                  $scope.loading1 = 1;
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        dialog.modal('hide'); 
                    }, 1500);             
              });
    };

    //search Data
    $scope.getSearch = function () {
      $scope.getAll();
    };

    $scope.deleteExpense = function (em_id) {
      $scope.em_id=em_id;
    }  

    $scope.deleteConfirm = function () {
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/expense/delete/'+$scope.em_id.em_id,
        data: $scope.em_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                $scope.expenseList = [];
                $scope.getAll();
                $('#confirm-delete').modal('hide');
	    })
	    .error(function(data) 
	    {   
	      var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};

});