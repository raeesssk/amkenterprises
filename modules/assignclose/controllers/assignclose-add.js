//angular.module('business',['ngRoute','ui.bootstrap']);
angular.module('assignclose').controller('assigncloseAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $timeout, $filter) { 	
	

  $('.index').removeClass("active");
  $('#assignindex').addClass("active");
  $('#assigncloseaddindex').addClass("active");

    $scope.selectedProductList = [];
    $scope.selectedPaymentList = [];
    $scope.selectedNozzleList = [];
    $scope.assignclose = {};
    // $scope.airline.am_total_amount = 0;
    $scope.parseFloat = parseFloat;
    $scope.limit = {};

    $("#acm_am_id").focus();

    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.assignclose.acm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd +" "+strTime;

    
    $('#acm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });



    $scope.getSerialNo = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/assignclose/serial/no',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
            if(orderno.length >0)
                $scope.assignclose.acm_invoice_no = parseInt(orderno[0].acm_invoice_no) + 1;
            else
                $scope.assignclose.acm_invoice_no = 1;

        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide'); 
                //$scope.vendor = null;
            }, 1500);
        });
    };
    $scope.getSerialNo();

//type a head
    $scope.getSearchAssign = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/assign/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getAssignDetails = function() {

      $scope.selectedProductList = [];
      $scope.selectedNozzleList = [];
      $scope.selectedPaymentList = [];

      $http({
        method: 'GET',
        url: $rootScope.baseURL+'/assign/details/'+$scope.assignclose.acm_am_id.am_id,
        //data: $scope.data,
        headers: {'Content-Type': 'application/json',
                'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(selectedProductList)
      {
          selectedProductList.forEach(function(value, key) {

              $scope.selectedProductList.push(value);
          });

          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/assign/nozzle/details/'+$scope.assignclose.acm_am_id.am_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
          })
          .success(function(selectedNozzleList)
          {
              selectedNozzleList.forEach(function(value, key) {

                  $scope.selectedNozzleList.push(value);
              });

              $scope.calculateTotal();
          })
          .error(function(data) 
          {   
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                  closeButton: false
              });
              setTimeout(function(){
                  dialog.modal('hide');  
                  //$scope.vendor = null;
              }, 1500);
          });

          $http({
            method: 'GET',
            url: $rootScope.baseURL+'/amounttoken/assign/employee/'+$scope.assignclose.acm_am_id.am_id,
            //data: $scope.data,
            headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
          })
          .success(function(selectedNozzleList)
          {
              if(selectedNozzleList[0].tamount > 0){

                  $scope.selectedPaymentList.push({pmm_id:14,pmm_name:'Token',pmm_amount: selectedNozzleList[0].tamount});
              }
              
            $scope.calculatePayTotal();
          })
          .error(function(data) 
          {   
              var dialog = bootbox.dialog({
              message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                  closeButton: false
              });
              setTimeout(function(){
                  dialog.modal('hide');  
                  //$scope.vendor = null;
              }, 1500);
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
              //$scope.vendor = null;
          }, 1500);
      });

    };

    $scope.calculateTotal = function(){
        
        $scope.assignclose.totalamount=0;

        angular.forEach($scope.selectedProductList, function(value, key) {
            value.apm_total_consumption = parseFloat(value.apm_quantity - value.apm_closing_quantity).toFixed(3);
            value.apm_total_amount = parseFloat(value.apm_total_consumption * value.apm_price).toFixed(3);
            $scope.assignclose.totalamount = parseFloat(parseFloat($scope.assignclose.totalamount) + parseFloat(value.apm_total_amount)).toFixed(3);
                    
        });

        angular.forEach($scope.selectedNozzleList, function(value, key) {
            value.anm_total_consumption = parseFloat(value.anm_closing_bal - value.anm_opening_bal - value.anm_testing).toFixed(3);
            value.anm_total_amount = parseFloat(value.anm_total_consumption * value.anm_rate).toFixed(3);
            $scope.assignclose.totalamount = parseFloat(parseFloat($scope.assignclose.totalamount) + parseFloat(value.anm_total_amount)).toFixed(3);
                    
        });
        
        $scope.convertNumberToWords($scope.assignclose.totalamount);
    };

     $scope.getSearchPay = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/paymentmode/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.addToPay = function(){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#pmm_id').val() == undefined || $('#pmm_id').val() == "" || $scope.paymentmodeObj.pmm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select payment mode</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pmm_id').focus();
            }, 1500);
        }
        else if($('#pmm_amount').val() == undefined || $('#pmm_amount').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pmm_amount').focus();
            }, 1500);
        }
        else
        {
            $scope.selectedPaymentList.push($scope.paymentmodeObj);
            $scope.paymentmodeObj = null;
            $scope.calculatePayTotal();
           $('#pmm_id').focus();
          }
    };

    $scope.removeItemPay = function(index){
        $scope.selectedPaymentList.splice(index,1);
            $scope.calculatePayTotal();
           $('#pmm_id').focus();
    };

    $scope.calculatePayTotal = function(){
        var i = 1;
        $scope.assignclose.totalremainamount=0;

        angular.forEach($scope.selectedPaymentList, function(value, key) {
            
            value.srno = i++;
            $scope.assignclose.totalremainamount = parseFloat(parseFloat($scope.assignclose.totalremainamount) + parseFloat(value.pmm_amount)).toFixed(3);
                    
        });
        // $scope.convertNumberToWords($scope.assignclose.totalremainamount);
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

    $scope.saveAssignclose = function(){


        if($('#acm_am_id').val() == undefined || $('#acm_am_id').val() == "" || $scope.assignclose.acm_am_id.am_id == undefined ){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>select assign number</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#acm_am_id').focus();
            }, 1500);
        }
        else if(isNaN($scope.assignclose.totalamount))
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter closing bal in nozzle and product details.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.selectedPaymentList.length == 0)
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please add payment mode to list.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.assignclose.totalamount != $scope.assignclose.totalremainamount)
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">amount do not match.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                    $scope.pruchaseForm = {
                        purchaseSingleData : $scope.assignclose,
                        purchaseMultipleData : $scope.selectedProductList,
                        purchaseNozzleData : $scope.selectedNozzleList,
                        purchaseMultiplePayData : $scope.selectedPaymentList
                    };
                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/assignclose/add',
                      data: $scope.pruchaseForm,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                    })
                    .success(function(response)
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Assign Close Added Successfully!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-success");
                        setTimeout(function(){
                            dialog.modal('hide');  
                                $('#btnsave').text("Save");
                                $('#btnsave').removeAttr('disabled');
                                // $scope.printDetails(response[0]);
                                window.location.href = '#/assignclose'; 
                        }, 1500);
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please try again!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-danger");
                        setTimeout(function(){
                            dialog.modal('hide');  
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                        }, 1500);
                    });
            }

        };

    $scope.printDetails = function(obj){

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
                "  margin: 3mm 3mm 3mm 3mm;" + /* margin you want for the content */
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
                          "<h3 style='font-size:16pt;margin-bottom: 0;'>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Address : "+localStorage.getItem("com_address")+"<br>" +
                          "Phone : "+localStorage.getItem("com_contact")+"<br>"+
                          "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          "GST No.: "+localStorage.getItem("com_gst")+"<br>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:13pt;' valign='top'>" +
                          "<strong>Assign Close</strong>"+
                      "</td>" +
                    "</tr>" +
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
                                "<strong>"+$scope.assignclose.acm_am_id.emp_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assignclose.acm_am_id.emp_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assignclose.acm_am_id.emp_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Assign No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.assignclose.acm_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Date & Time: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.assignclose.acm_date, "dd-MM-yyyy hh:mm a", "+0000")+"</strong>"+
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
                        "<td colspan='6' style='text-align:center; border-style: none none solid none; border-width:1px;'>Assign Details</td>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th width='5%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='40%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='10%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty</th>"+
                        "<th width='10%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Unit</th>" +
                        "<th width='15%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Price</th>" +
                        "<th width='20%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Total</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                  "<table width='100%'>" +
                    "<thead>"+
                      "<tr>"+
                        "<td colspan='6' style='text-align:center; border-style: solid none solid none; border-width:1px;'>Payment Mode Details</td>"+
                      "</tr>"+
                      "<tr>"+      
                        "<th width='5%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='65%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Payment Mode</th> " +
                        "<th width='30%' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Amount</th>"+
                      "</tr>"+
                    "</thead>"+
                    " "+$('#contentPay').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            "<tr>" +
                  "<td colspan='4' rowspan='2' width='65%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td width='15%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount</td>" +
                  "<td width='20%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.assignclose.totalamount, "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='2' width='35%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for "+ localStorage.getItem("com_name") +"</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
    }

});