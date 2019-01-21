// import admin
angular.module('requisition').controller('requisitionCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#requisitionlistindex').addClass("active");
  
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.requisitionListcount = 0;
    $scope.loading1 = 0;
    $scope.limit = {};
    
$scope.apiURL = $rootScope.baseURL+'/requisition/requisition/total';
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
                $scope.requisitionListcount=value.total;
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
                    message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                        closeButton: false
                    });
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
        if ($scope.filterUser >= $scope.requisitionListcount)
            $scope.filterUser = $scope.requisitionListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/requisition/requisition/limit',
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

    $scope.deleteRequisition = function (rcm_id) {
      $scope.rcm_id=rcm_id;
    }  

    $scope.deleteConfirm = function () {
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/requisition/delete/'+$scope.rcm_id.rcm_id,
        data: $scope.rcm_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
                // $scope.expenseList = [];
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

    $scope.printDetails = function(requisit){
      var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
          var printchar = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/customer/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                // "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                // "  margin: 5mm 5mm 5mm 5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()' style='width:74mm;height:105mm'>" +
           "<table width='100%' height='100%'>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding-bottom: 10px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' width='100%'>" +
                          "<img src='./././resources/indianoil.jpg' class='user-image' alt='User Image' style='margin-left:10px;'><br>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Dealer : "+localStorage.getItem("com_dealer")+"" +
                          // "Address : "+localStorage.getItem("com_address")+"<br>" +
                          // "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          // "Cont. No. : "+localStorage.getItem("com_contact")+"<br>"+
                          // "GST No. : "+localStorage.getItem("com_gst")+"</td>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td style='font-size:36pt; border-style: solid solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>token</div><div>"+requisit.rcm_token+"</div></td>"+
                    "<td style='font-size:36pt; border-style: solid solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Req. no.</div><div>"+requisit.rcm_bill_no+"</div></td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td style='font-size:8pt; border-style: none solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Product</div><div>"+requisit.pm_name+"</div></td>"+
                    "<td style='font-size:8pt; border-style: none solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Quantity</div><div>"+$filter('number')(requisit.rcm_qty,'3')+"</div></td>"+
                    "</tr>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    }

});