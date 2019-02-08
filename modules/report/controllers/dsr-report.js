// import admin
angular.module('report').controller('dsrreportCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#reportindex').addClass("active");
  $('#dsrreportindex').addClass("active");
  
  $('#alldata').hide();

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
    $scope.loading1 = 1;
    $scope.parseFloat = parseFloat;
    $scope.limit = {};

    $('#user-datepicker-from').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false
    });

    $('#user-datepicker-to').datepicker({
     timepicker:false,
      format: 'yyyy-mm-dd',
      autoclose: true,
     maxDate:'+1970/01/02',
     scrollInput:false

    });
$scope.apiURL = $rootScope.baseURL+'/dashboard/dsrreport/total';

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
      $scope.invoices = {};
    $scope.dsrListcount = 0;

      // if ($('#searchtext').val() == undefined || $('#searchtext').val() == "") {
      //       $scope.limit.search = "";
      //     }
      //     else{
      //       $scope.limit.search = $scope.searchtext;
      //     }

          $scope.limit.fDate = $('#user-datepicker-from').val();
          $scope.limit.tDate = $('#user-datepicker-to').val();
      $http({
        method: 'POST',
        url: $scope.apiURL,
        data: $scope.limit,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
        }
      })
      .success(function(sale)
      {
        sale.forEach(function (value, key) {
            $scope.totalvalue = value.totalvalue;
            $scope.dsrListcount = value.total;
            
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
                url: $rootScope.baseURL+'/dashboard/dsrreport/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(invoice)
              {
                $scope.filteredTodos = [];
                if (invoice.length > 0) {
                    invoice.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                }
                // $scope.obj_Main = $scope.purchaseList;
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


    $scope.getAllDetails = function(){
        $scope.allList = [];
          $http({
          method: 'POST',
          url: $rootScope.baseURL+'/dashboard/dsrreport',
          data: $scope.limit,
          headers: {'Content-Type':'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(login)
        {   
          $scope.allList = angular.copy(login);

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

    $scope.getSearch = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/product/tank/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };
    
    $scope.filter = function () {
    $scope.toDate = $("#user-datepicker-to").val();
    $scope.fromDate = $("#user-datepicker-from").val();

    if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.limit.pm_id.pm_id == undefined)
    {
      var dialog = bootbox.dialog({
          message: '<p class="text-center">please select product</p>',
              closeButton: false
          });
          dialog.find('.modal-body').addClass("btn-danger");
          setTimeout(function(){
              dialog.modal('hide'); 
          }, 1500);
        return;
    }
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
      $scope.getAll();

      $scope.getAllDetails();

      // $scope.draw();

    };

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
    //     $scope.getAll();
    // };
        

    $scope.printAllDetails = function(){
      var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
          var printchar = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/customer/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 landscape;" +  /* auto is the initial value */
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
                "  margin: 5mm 5mm 5mm 5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()'>" +
           "<table width='100%' height='98%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='3' style=' border-style: solid; border-width:0px;'>"+
                  "<table width='100%'>"+
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding-bottom: 10px; border-style: solid solid none solid; border-width:1px; font-size:12pt;' valign='center' width='100%'>" +
                          "<table width='100%'><tr>"+
                          "<td width='23%'><img src='./././resources/indianoil.jpg' class='user-image' alt='User Image' style='margin-left:10px'></td>"+
                          "<td width='54%' style='text-align:center;'><h3 style='font-size:16pt;margin-bottom: 0;'>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Dealer : "+localStorage.getItem("com_dealer")+"<br>" +
                          "Address : "+localStorage.getItem("com_address")+"<br>" +
                          "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          "Cont. No. : "+localStorage.getItem("com_contact")+"<br>"+
                          "GST No. : "+localStorage.getItem("com_gst")+"</td>"+
                          "<td width='23%'></td>"+
                          "</tr></table>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='100%' colspan='2' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>" +
                              "<td colspan='6' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:13pt;' valign='top'>" +
                                  "<strong>Daily Sales Report</strong>"+
                              "</td>" +
                            "</tr>" +
                            "<tr>"+
                              "<td width='10%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Product: "+
                              "</td>"+
                              "<td width='20%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+ $scope.limit.pm_id.pm_name +"</strong>"+
                              "</td>"+
                              "<td width='15%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "From Date: "+
                              "</td>"+
                              "<td width='20%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($('#user-datepicker-from').val(),'dd-MM-yyyy')+"</strong>"+
                              "</td>"+
                              "<td width='15%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "To Date: "+
                              "</td>"+
                              "<td width='20%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($('#user-datepicker-to').val(),'dd-MM-yyyy')+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            // "<tr>"+
                            //   "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "Amount: "+
                            //   "</td>"+
                            //   "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "<strong>"+$filter('number')($scope.totalvalue,'3')+"</strong>"+
                            //   "</td>"+
                            // "</tr>"+
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
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Date</th>" +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>DIP</th> " +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Water DIP</th>"+
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Opening Stock</th> " +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Receipt</th>"+
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Total Stock</th> " +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>One</th>"+
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Two</th> " +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Three</th>"+
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Four</th>"+
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Testing</th> " +
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Sales</th>"+
                        "<th style='padding:10px; border-style: none none solid none; border-width:1px;'>Cumulative Sales</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#contentall').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
              "<tr>"+
                "<td style=' border-style: none solid solid solid; border-width:1px;'>"+
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
    };

});