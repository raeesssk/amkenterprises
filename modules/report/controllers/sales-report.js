// import admin
angular.module('report').controller('salesReportCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#reportindex').addClass("active");
  $('#reportsalesindex').addClass("active");

  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.employeeList = [];
    $scope.employeeListcount =0;
    $scope.loading1 = 0;
    $scope.limit={}


$('#user-datepicker-from').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true
});

$('#user-datepicker-to').datepicker({
 timepicker:false,
 format:'yyyy-mm-dd',
 maxDate:'+1970/01/02',
 scrollInput:false,
  autoclose: true
});

    $('#user-datepicker-from-list').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false
    });

    $('#user-datepicker-to-list').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false

    });


$scope.apiURL = $rootScope.baseURL+'/dashboard/salesreport/total';
  $scope.getAll = function () {

      $scope.filteredTodos = [];
      $scope.currentPage = 1;
      $scope.maxSize = 5;
      $scope.entryLimit = 5;
      $scope.filterUser = 0;
      $scope.filterUserend = 1;
      $scope.numPerPage = 10;
      $scope.obj_Main = [];
      $scope.saleList = [];
      $scope.totalvalue = 0;
      // $scope.invoices = {};
    $scope.employeeListcount = 0;
    $scope.limit = {};

          if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
        $scope.limit.search = "";
      }
      else{
        $scope.limit.search = $scope.searchtext;
      }

          $scope.limit.fDate = $('#user-datepicker-from-list').val();
          $scope.limit.tDate = $('#user-datepicker-to-list').val();

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

            $scope.totalvalue = value.totalvalue;
            $scope.employeeListcount = value.total;
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

   

    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.employeeListcount)
            $scope.filterUser = $scope.employeeListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/dashboard/salesreport/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(employee)
              {
                $scope.filteredTodos = [];
                if (employee.length > 0) {
                 
                  employee.forEach(function (value, key) {
                      $scope.filteredTodos.push(value);
                  });
                }
                else{
                  
                }
                
                      // $scope.obj_Main = $scope.vendorList;
                      $scope.loading1 = 1;

                    
              $('#filter-user-btn').text("Filter");
              $('#filter-user-btn').removeAttr('disabled');
              $('#reset-user-btn').text("Reset");
              $('#reset-user-btn').removeAttr('disabled');
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

$scope.filter = function()
  {
    $scope.toDate = document.getElementById("user-datepicker-to").value;
    $scope.fromDate = document.getElementById("user-datepicker-from").value;
    if(angular.isUndefined($scope.fromDate) || $scope.fromDate === null || $scope.fromDate == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDate) || $scope.toDate === null || $scope.toDate == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilter = '&startTime='+ $scope.fromDate + '&endTime=' + $scope.toDate;

      $scope.fDate = new Date($scope.fromDate);
      $scope.fDate.setHours(0,0,0,0);
      $scope.tDate = new Date($scope.toDate);
      $scope.tDate.setHours(0,0,0,0);
      if($scope.fDate > $scope.tDate)
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
      $('#filter-user-btn').attr('disabled','true');
      $('#filter-user-btn').text("please wait...");
      $('#view-details').modal('show');
    $scope.viewEmployeeDetails($scope.ind);
      // $scope.getUser();

      // $scope.draw();

  };

$scope.filterList = function()
  {
    $scope.toDateList = document.getElementById("user-datepicker-to-list").value;
    $scope.fromDateList = document.getElementById("user-datepicker-from-list").value;
    if(angular.isUndefined($scope.fromDateList) || $scope.fromDateList === null || $scope.fromDateList == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      if(angular.isUndefined($scope.toDateList) || $scope.toDateList === null || $scope.toDateList == "")
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">please select to-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }

      $scope.dateFilterList = '&startTime='+ $scope.fromDateList + '&endTime=' + $scope.toDateList;

      $scope.fDateList = new Date($scope.fromDateList);
      $scope.fDateList.setHours(0,0,0,0);
      $scope.tDateList = new Date($scope.toDateList);
      $scope.tDateList.setHours(0,0,0,0);
      if($scope.fDateList > $scope.tDateList)
      {
        var dialog = bootbox.dialog({
          message: '<p class="text-center">oops!!! to-date greater than from-date.</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
      }
      $('#filter-user-btn-list').attr('disabled','true');
      $('#filter-user-btn-list').text("please wait...");
      $scope.getAll();
      // $scope.getUser();

      // $scope.draw();

  };

  Date.prototype.setFromDateList = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   // if(mm == 0){
   //  document.getElementById("user-datepicker-from-list").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
   // }
   // else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
   //  document.getElementById("user-datepicker-from-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
   // }
   // else{
   //  document.getElementById("user-datepicker-from-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
   // }

   document.getElementById("user-datepicker-from-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  };

  Date.prototype.setToDateList = function() {
    // console.log("in to date");
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   document.getElementById("user-datepicker-to-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  $scope.filterList();
  };

        dList = new Date();
        dList.setFromDateList();
        dList.setToDateList();

  Date.prototype.setFromDate = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   if(mm == 0){
    document.getElementById("user-datepicker-from").value = yyyy-1 +"-"+ ("12") +"-"+ (dd[1]?dd:"0"+dd[0]);
   }
   else if(mm==2||mm==4||mm==6||mm==7||mm==9||mm==11){
    document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd-1:"0"+dd[0]);
   }
   else{
    document.getElementById("user-datepicker-from").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
   }
  };

  Date.prototype.setToDate = function() {
    // console.log("in to date");
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   document.getElementById("user-datepicker-to").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
  // $scope.filter();
  };

        d = new Date();
        d.setFromDate();
        d.setToDate();


  // $scope.reset = function()
  // {
  //   $scope.toDate = "";
  //   $scope.fromDate = "";
  //   $('#user-datepicker-from').val("");
  //   $('#user-datepicker-to').val("");
  //   $scope.dateFilter = "";
  //     $('#reset-user-btn').attr('disabled','true');
  //     $('#reset-user-btn').text("please wait...");
  //     $('#view-details').modal('show');
  //   $scope.viewEmployeeDetails($scope.ind);
  // };

  $scope.viewEmployeeDetails1 = function (index) {
      $scope.ind = index;
    $('#user-datepicker-from').val("");
    $('#user-datepicker-to').val("");
    $scope.viewEmployeeDetails(index);
  };

  $scope.viewEmployeeDetails = function (index) {

      $scope.ind = index;

      $scope.categoryList = [];
      $scope.empname = $scope.filteredTodos[index].emp_name;
      $scope.empno = $scope.filteredTodos[index].emp_mobile;
      $scope.empadd = $scope.filteredTodos[index].emp_address;
      
      $scope.totalValue = 0;
      $scope.limit.fDate = $('#user-datepicker-from').val();
      $scope.limit.tDate = $('#user-datepicker-to').val();
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/employee/details/'+ $scope.filteredTodos[index].emp_id,
        data: $scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(categoryList)
      {
        categoryList.forEach(function (value, key) {
              $scope.totalValue = parseFloat($scope.totalValue + value.acm_amount);
              $scope.categoryList.push(value);

        });
          $('#filter-user-btn').text("Filter");
          $('#filter-user-btn').removeAttr('disabled');
          // $('#reset-user-btn').text("Reset");
          // $('#reset-user-btn').removeAttr('disabled');
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

    $scope.printDetails = function(){
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
                "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                "  margin: 5mm 10mm 0mm 7.5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
           "<table width='100%' height='95%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='3' style=' border-style: solid; border-width:0px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding-bottom: 10px; border-style: solid solid none solid; border-width:1px; font-size:12pt;' valign='center' width='100%'>" +
                          "<h3 style='font-size:16pt;margin-bottom: 0;'>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Address : "+localStorage.getItem("com_address")+"<br>" +
                          "Phone : "+localStorage.getItem("com_contact")+"<br>"+
                          "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          "GST No.: "+localStorage.getItem("com_gst")+"<br>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Employee Ledger</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.empname+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.empadd+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.empno+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Total Amount: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('number')($scope.totalValue ,'3')+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                                "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                  "From Date: "+
                                "</td>"+
                                "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                  "<strong>"+$('#user-datepicker-from').val()+"</strong>"+
                                "</td>"+
                              "</tr>"+
                              "<tr>"+
                                "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                  "To Date: "+
                                "</td>"+
                                "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                  "<strong>"+$('#user-datepicker-to').val()+"</strong>"+
                                "</td>"+
                              "</tr>"+ 
                            "</table>"+
                      "</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</thead>"+
            "<tbody>"+
              "<tr>"+
                "<td valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+      
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Assign Close No.</th>" +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Date & Time</th> " +
                        "<th style='padding:10px; border-style: none none solid none; border-width:1px;'>Amount</th>"+
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
              "<tr>"+
                "<td style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                        "<td valign='bottom' style='text-align:center; padding:6px; font-size:12pt;'>THANK YOU</td>" +
                    "</tr>" +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    }

});