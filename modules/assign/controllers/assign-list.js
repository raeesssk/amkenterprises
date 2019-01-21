// import admin
angular.module('assign').controller('assignCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#assignindex').addClass("active");
  $('#assignlistindex').addClass("active");
  $scope.filteredTodos = [];
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.entryLimit = 5;
    $scope.filterUser = 0;
    $scope.filterUserend = 1;
    $scope.numPerPage = 10;
    $scope.obj_Main = [];
    $scope.assignListcount = 0;
    $scope.loading1 = 0;
    $scope.parseFloat = parseFloat;
    $scope.limit = {};

 $scope.apiURL = $rootScope.baseURL+'/assign/assign/total';
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
                $scope.assignListcount=value.total;
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
    $scope.resetpagination = function () {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage);
        var end = begin + $scope.numPerPage;
        $scope.filterUserend = begin + 1;
        $scope.filterUser = end;
        if ($scope.filterUser >= $scope.assignListcount)
            $scope.filterUser = $scope.assignListcount;

              $scope.filteredTodos = [];
              $scope.limit.number = $scope.numPerPage;
              $scope.limit.begin = begin;
              $scope.limit.end = end;
              $http({
                method: 'POST',
                url: $rootScope.baseURL+'/assign/assign/limit',
                data: $scope.limit,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(purchase)
              {
                $scope.filteredTodos = [];
                if (purchase.length > 0) {
                    purchase.forEach(function (value, key) {
                        $scope.filteredTodos.push(value);
                    });
                }
                // $scope.obj_Main = $scope.purchaseList;
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

    $scope.deleteAssign = function (am_id) {
      $scope.am_id=am_id;
    }  

    $scope.deleteConfirm = function () {
        $('#del').attr('disabled','true');
        $('#del').text("please wait...");
	     $http({
	      method: 'POST',
	      url: $rootScope.baseURL+'/assign/delete/'+$scope.am_id,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(saleObj)
	    {
                $('#del').text("Cancel Assign");
                $('#del').removeAttr('disabled');
                $scope.purchaseList = [];
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
                $('#del').text("Cancel Assign");
                $('#del').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
	    });
	};

    $scope.reopenAssign = function (am_id) {
      
      $('#repoen-confirm').modal('show');
      $scope.am_id=am_id;
    }  

    $scope.reopenConfirm = function () {
                $('#reopen').attr('disabled','true');
                $('#reopen').text("please wait...");
       $http({
        method: 'POST',
        url: $rootScope.baseURL+'/assign/reopen/'+$scope.am_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(saleObj)
      {
                $('#reopen').text("Reopen");
                $('#reopen').removeAttr('disabled');
                $scope.getAll();
                $('#repoen-confirm').modal('hide');
            
      })
      .error(function(data) 
      {   
        var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                closeButton: false
            });
            setTimeout(function(){
                $('#reopen').text("Reopen");
                $('#reopen').removeAttr('disabled');
                dialog.modal('hide'); 
            }, 1500);            
      });
  };

  $scope.viewQuatationDetails = function (index) {
   
      $scope.saleNozzleList = [];
      $scope.salePurchaseList = [];
      $scope.assigns = $scope.filteredTodos[index];
      
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/assign/details/'+$scope.filteredTodos[index].am_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(salePurchaseList)
      {
         var i = 1;
          salePurchaseList.forEach(function (value, key) {
              value.srno = i++;
              $scope.salePurchaseList.push(value);
            });
          // $scope.convertNumberToWords($scope.assigns.am_amount);
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
      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/assign/nozzle/details/'+$scope.filteredTodos[index].am_id,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(saleNozzleList)
      {
         var i = 1;
          saleNozzleList.forEach(function (value, key) {
              value.srno = i++;
              $scope.saleNozzleList.push(value);
            });
          // $scope.convertNumberToWords($scope.assigns.am_amount);
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

    $scope.convertNumberToWords = function (amount) {
        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++, j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        $scope.amountinwords = words_string;
    }

    $scope.printDetails = function(){

      if($scope.assigns.am_status == 1){
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
        var page1 = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "<style>@media print {.watermark {display: inline;position: fixed !important;opacity: 0.50;font-size: 100px;width: 100%;text-align: center;z-index: 1000;top:270px;right:5px;}}</style>" +
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
            "<div class='watermark'>cancelled</p></div>" +
           "<table width='100%' height='98%'>" +
            "<thead>"+
              "<tr>"+
                "<td colspan='12' style=' border-style: solid; border-width:0px;'>"+
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
                    // "<tr>" +
                    //   "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                    //       "<strong>Assign</strong>"+
                    //   "</td>" +
                    // "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Employee Details</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Assign</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='40%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Assign No.: "+
                              "</td>"+
                              "<td width='60%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.am_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='40%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Date & Time: "+
                              "</td>"+
                              "<td width='60%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.assigns.am_date, "dd-MM-yyyy hh:mm a")+"</strong>"+
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
                "<td colspan='12' valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+ 
                      "<tr>"+
                      "  <th colspan='5' style='text-align: center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Nozzle Details</th>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Nozzle</th> " +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product</th>"+
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Opening Bal.</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#contentNozzle').html()+" " +
                  "</table>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+
                      "  <th colspan='5' style='text-align: center; padding: 4px; font-size: 10pt; border-style: solid none solid none; border-width:1px;'>Product Details</th>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Qty</th>"+
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Unit</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid none solid none; border-width:1px;'>Price</th>" +
                      "</tr>"+
                    "</thead>";
                    if ($scope.salePurchaseList.length == 0) {
                      page1 = page1 + "<tbody><tr><td colspan='7' style='text-align : center; padding: 10px; font-size: 12pt; '>No Records Available</td></tr></tbody>";
                    }
                    else{
                      page1 = page1 + " "+$('#content').html()+" " ;
                    }
                  page1 = page1 + "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            // "<tr>" +
            //       "<td colspan='4' rowspan='2' width='65%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
            //       "<td width='15%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount</td>" +
            //       "<td width='20%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.assigns.am_amount, "3")+"</strong></td>" +
            //   "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='65%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>N/A</td>" +
                  "<td colspan='2' width='35%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for "+ localStorage.getItem("com_name") +"</strong><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
      }
      else{
        var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
        var page1 = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/vendor/bootstrap/css/bootstrap.min.css' />" +
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
                "<td colspan='12' style=' border-style: solid; border-width:0px;'>"+
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
                    // "<tr>" +
                    //   "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                    //       "<strong>Assign</strong>"+
                    //   "</td>" +
                    // "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Employee Details</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.emp_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Assign</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='40%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Assign No.: "+
                              "</td>"+
                              "<td width='60%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assigns.am_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='40%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Date & Time: "+
                              "</td>"+
                              "<td width='60%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.assigns.am_date, "dd-MM-yyyy hh:mm a")+"</strong>"+
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
                "<td colspan='12' valign='top' style=' border-style: solid; border-width:1px;'>"+
                  "<table width='100%'>" +
                    "<thead>"+ 
                      "<tr>"+
                      "  <th colspan='5' style='text-align: center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Nozzle Details</th>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Nozzle</th> " +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product</th>"+
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Opening Bal.</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#contentNozzle').html()+" " +
                  "</table>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+
                      "  <th colspan='5' style='text-align: center; padding: 4px; font-size: 10pt; border-style: solid none solid none; border-width:1px;'>Product Details</th>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Qty</th>"+
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid solid solid none; border-width:1px;'>Unit</th>" +
                        "<th style='text-align:center; padding: 4px; font-size: 10pt; border-style: solid none solid none; border-width:1px;'>Price</th>" +
                      "</tr>"+
                    "</thead>";
                    if ($scope.salePurchaseList.length == 0) {
                      page1 = page1 + "<tbody><tr><td colspan='7' style='text-align : center; padding: 10px; font-size: 12pt; '>No Records Available</td></tr></tbody>";
                    }
                    else{
                      page1 = page1 + " "+$('#content').html()+" " ;
                    }
                  page1 = page1 + "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            // "<tr>" +
            //       "<td colspan='4' rowspan='2' width='65%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
            //       "<td width='15%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount</td>" +
            //       "<td width='20%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.assigns.am_amount, "3")+"</strong></td>" +
            //   "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='65%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>N/A</td>" +
                  "<td colspan='2' width='35%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for "+ localStorage.getItem("com_name") +"</strong><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
      }
    }
});