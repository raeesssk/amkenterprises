// import admin
angular.module('report').controller('paymentmodereportCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#reportindex').addClass("active");
  $('#paymentmodereportindex').addClass("active");

  $('#alldata').hide();
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.paymentmodeList = [];
    $scope.paymentmodeListcount =0;
    $scope.loading1 = 0;
    $scope.limit={}

    // $('#user-datepicker-from-list').datepicker({
    //  timepicker:false,
    //   format: 'yyyy-mm-dd',
    //   autoclose: true,
    //  maxDate:'+1970/01/02',
    //  scrollInput:false
    // });

    $('#user-datepicker-from-list').datetimepicker({
      autoclose: true,
      todayBtn: true,
      showMeridian: true,
      minuteStep: 5,
      format: 'yyyy-mm-dd HH:ii P'
    });

    // $('#user-datepicker-to-list').datepicker({
    //  timepicker:false,
    //   format: 'yyyy-mm-dd',
    //   autoclose: true,
    //  maxDate:'+1970/01/02',
    //  scrollInput:false

    // });

    $('#user-datepicker-to-list').datetimepicker({
      autoclose: true,
      todayBtn: true,
      showMeridian: true,
      minuteStep: 5,
      format: 'yyyy-mm-dd HH:ii P'
    });


$scope.apiURL = $rootScope.baseURL+'/dashboard/paymentmodereport/total';
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
    $scope.paymentmodeListcount = 0;
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
            $scope.paymentmodeListcount = value.total;
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
        if ($scope.filterUser >= $scope.paymentmodeListcount)
            $scope.filterUser = $scope.paymentmodeListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/dashboard/paymentmodereport/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(paymentmode)
              {
                $scope.filteredTodos = [];
                if (paymentmode.length > 0) {
                 
                  paymentmode.forEach(function (value, key) {
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


    $scope.getAllDetails = function(){
        $scope.allList = [];
          $http({
          method: 'POST',
          url: $rootScope.baseURL+'/dashboard/paymentmodereport',
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
            $('#btnsave').text("SAVE");
            $('#btnsave').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
        }); 
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
      // $scope.fDateList.setHours(0,0,0,0);
      $scope.tDateList = new Date($scope.toDateList);
      // $scope.tDateList.setHours(0,0,0,0);
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
      $scope.getAllDetails();

      // $scope.draw();

  };

  Date.prototype.setFromDateList = function() {
    var hours = this.getHours() - 6;
    var minutes = this.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
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

   document.getElementById("user-datepicker-from-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0])+" "+strTime;
  };

  Date.prototype.setToDateList = function() {
    // console.log("in to date");
    var hours = this.getHours();
    var minutes = this.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   document.getElementById("user-datepicker-to-list").value = yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0])+" "+strTime;
  $scope.filterList();
  };

        dList = new Date();
        dList.setFromDateList();
        dList.setToDateList();
        

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
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Payment Details</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='50%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "From Date: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$('#user-datepicker-from-list').val()+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "To Date: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$('#user-datepicker-to-list').val()+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='50%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Amount: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('number')($scope.totalvalue,'3')+"</strong>"+
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
                        "<th style='padding:10px; border-style: none solid solid none; border-width:1px;'>Payment Mode</th>" +
                        "<th style='padding:10px; border-style: none none solid none; border-width:1px;'>Amount</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#contentPayment').html()+" " +
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
    }

});