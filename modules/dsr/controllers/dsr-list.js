// import admin
angular.module('dsr').controller('dsrCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#dsrlistindex').addClass("active");
  $('#content').hide();
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.dsrListcount =0;
    $scope.loading1 = 0;
    $scope.limit={}


$scope.apiURL = $rootScope.baseURL+'/dsr/dsr/total';
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
                  $scope.dsrListcount=value.total;
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
        // toastr.error('Oops, Something Went Wrong.', 'Error', {
        //       closeButton: true,
        //       progressBar: true,
        //     positionClass: "toast-top-center",
        //     timeOut: "500",
        //     extendedTimeOut: "500",
        //   });             
      });
    };

   

    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.dsrListcount)
            $scope.filterUser = $scope.dsrListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/dsr/dsr/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(dipchart)
              {
                $scope.filteredTodos = [];
                if (dipchart.length > 0) {
                 
                  dipchart.forEach(function (value, key) {

                        $http({
                          method: 'GET',
                          url: $rootScope.baseURL+'/dsr/nozzle/details/'+value.dsr_id,
                          headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                        })
                        .success(function(customerObj)
                        {
                            value.nozzleList = angular.copy(customerObj);
                            $scope.filteredTodos.push(value);
                              
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

                  });
                }
                else{
                  
                }
                
                      // $scope.obj_Main = $scope.vendorList;
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

    // $scope.deleteNozzle = function (nm_id) {
    //   $scope.nm_id=nm_id;
    // }  

    // $scope.deleteConfirm = function () {
    //             $('#del').attr('disabled','true');
    //             $('#del').text("please wait...");
	   //   $http({
	   //    method: 'POST',
	   //    url: $rootScope.baseURL+'/nozzle/delete/'+$scope.nm_id,
	   //    headers: {'Content-Type': 'application/json',
    //               'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	   //  })
	   //  .success(function(customerObj)
	   //  {
    //             $('#del').text("Delete");
    //             $('#del').removeAttr('disabled');
    //             $scope.getAll();
    //             $('#confirm-delete').modal('hide');
      		  
	   //  })
	   //  .error(function(data) 
	   //  {   
	   //    var dialog = bootbox.dialog({
    //         message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
    //             closeButton: false
    //         });
    //         setTimeout(function(){
    //             $('#del').text("Delete");
    //             $('#del').removeAttr('disabled');
    //             dialog.modal('hide'); 
    //         }, 1500);            
	   //  });
	// };

});