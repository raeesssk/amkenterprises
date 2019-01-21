//angular.module('business',['ngRoute','ui.bootstrap']);
angular.module('credit').controller('creditAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $timeout, $filter) { 	
	

  $('.index').removeClass("active");
  $('#creditindex').addClass("active");
  $('#creditaddindex').addClass("active");
    $scope.productList = [];
    $scope.customerList = [];
    $scope.selectedProductList = [];
    $scope.credit = {};
    $scope.productObj = [];
    $scope.customer = {};
    $scope.product = {};
    $scope.credit.amount = 0;
    $scope.credit.cgst = 0;
    $scope.credit.sgst = 0;
    $scope.credit.igst = 0;
    $scope.credit.discount = 0;
    $scope.credit.crm_comment = 'N/A';
    // $scope.airline.am_total_amount = 0;
    $scope.parseFloat = parseFloat;
    $scope.limit = {};

    $("#crm_cm_id").focus();
    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.credit.crm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#pDate').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.credit.crm_date = $('#pDate').val();
        }
    });
    $('#im_payment_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        // onChangeDateTime: function (dp, $input) {
        //     $scope.purchase.crm_date = $('#prm_payment_date').val();
        // }
    });


    // $scope.creditShow = function(){
    //     if($scope.credit.im_credit == 'Cash'){
    //         $('#dateofpayment').hide();
    //         $scope.credit.im_payment_date = null;
    //     }
    //     else{
    //         $scope.credit.im_payment_date = undefined;
    //         $('#dateofpayment').show();
    //     }
    // }
/*
    $('#apm_travel_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
        onChangeDateTime: function (dp, $input) {
            $scope.productObj.apm_travel_date = $('#apm_travel_date').val();
        }
    });*/

    $scope.getSerialNo = function() {

        const fin = localStorage.getItem("amkenterprises_admin_financial_year");
        const finyr = fin.split('-');
        const finyr1 = finyr[0].toString().substring(2);
        const finyr2 = finyr[1].toString().substring(2);
        const fy = "%/"+finyr1+"-"+finyr2+"%";
        
        $scope.limit.fin_year = fy;
        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/credit/serial/no',
          data: $scope.limit,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
          
            if(orderno.length >0){
                var pom = orderno[0].crm_invoice_no;
                var arrinvo = pom.split('/');
                $scope.credit.crm_invoice_no = parseInt(parseInt(arrinvo[0])+parseInt(1))+"/"+finyr1+"-"+finyr2;                
            }
            else
                $scope.credit.crm_invoice_no = 1+"/"+finyr1+"-"+finyr2;
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

    $scope.getSearchCust = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/customer/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

     $scope.getSearchProd = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/product/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.setProductData = function() {
        $scope.productObj.pm_qty = 1;
        $scope.productObj.price = $scope.productObj.pm_sell_price;
    }

    $scope.openCustomerForm = function(){
        $scope.getCode();
        $scope.customer.cm_mobile = "N/A";
        $scope.customer.cm_email = "N/A";
        $scope.customer.cm_address = "N/A";
        $scope.customer.cm_gst = "N/A";
        $scope.customer.cm_opening_credit = 0;
        $scope.customer.cm_opening_debit = 0;
        $('#addCustomer').modal('show');
    };

    $scope.getCode = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/customer/code/no',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
            if(orderno.length >0)
                $scope.customer.cm_code = parseInt(orderno[0].cm_code) + 1;
            else
                $scope.customer.cm_code = 1;
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
                $('#addCustomer').modal('hide');
                //$scope.vendor = null;
            }, 1500);
        });
    };

    $scope.saveCustomer = function(){
        $scope.apiURL = $rootScope.baseURL+'/customer/add';
        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        // else if(!nameRegex.test($('#cm_mobile').val())){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter Mobile no. in digits</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
        // else if($('#cm_mobile').val().length < 10){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter a valid Mobile no.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
      else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter email id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
        else if($('#cm_address').val() == undefined || $('#cm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_gst').val() == undefined || $('#cm_gst').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter GST.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            $('#addCust').attr('disabled','true');
            $('#addCust').text("please wait...");

            $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/customer/checkname',
                  data: $scope.customer,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                          $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: $scope.customer,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                          })
                          .success(function(login)
                          {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Customer Added Successfully.</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-success");
                              setTimeout(function(){
                                  $('#addCust').text("Save");
                                    $('#addCust').removeAttr('disabled');
                                    //do something special
                                    // $scope.productList = [];
                                    // $scope.getProductList();
                                    dialog.modal('hide');  
                                    $('#addCustomer').modal('hide');
                                    $scope.customer = {};
                              }, 1500);  
                          })
                          .error(function(data) 
                          {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-danger");
                              setTimeout(function(){
                              $('#addCust').text("SAVE");
                              $('#addCust').removeAttr('disabled');
                                  dialog.modal('hide'); 
                              }, 1500);            
                          });
                    }
                    else{
                        var dialog = bootbox.dialog({
                              message: '<p class="text-center">Customer Already Exist!</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-warning");
                              setTimeout(function(){
                                  $('#addCust').text("SAVE");
                                  $('#addCust').removeAttr('disabled');
                                  dialog.modal('hide');  
                              }, 1500);
                    }
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-danger");
                    setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
        }
    };

    $scope.addToCart = function(){

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.productObj.pm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select Product</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pm_id').focus();
            }, 1500);
        }
        else if($('#pm_qty').val() == undefined || $('#pm_qty').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter quantity.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pm_qty').focus();
            }, 1500);
        }
        else if($('#price').val() == undefined || $('#price').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter price.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#price').focus();
            }, 1500);
        }
        else
        {
            $scope.selectedProductList.push($scope.productObj);
            $scope.productObj = null;
            $scope.calculateTotal();
           $('#pm_id').focus();
          }
    };

    $scope.removeItem = function(index){
        $scope.selectedProductList.splice(index,1);
        $scope.calculateTotal();
           $('#pm_id').focus();
    };

    $scope.calculateTotal = function(){
        var i = 1;
        $scope.credit.amount = 0;
        $scope.credit.totaltax=0;
        $scope.credit.totalamount=0;
        $scope.credit.cgst=0;
        $scope.credit.sgst=0;
        $scope.credit.igst=0;

        angular.forEach($scope.selectedProductList, function(value, key) {
            
            value.srno = i++;
            $scope.credit.amount = parseFloat($scope.credit.amount) + parseFloat(value.pm_qty)*parseFloat(value.price);
            $scope.credit.cgst = parseFloat(parseFloat($scope.credit.cgst) + parseFloat((value.pm_cgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)))).toFixed(3);
            $scope.credit.sgst = parseFloat(parseFloat($scope.credit.sgst) + parseFloat((value.pm_sgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)))).toFixed(3);
            $scope.credit.igst = parseFloat(parseFloat($scope.credit.igst) + parseFloat((value.pm_igst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)))).toFixed(3);
                    
        });
            $scope.credit.totaltax=parseFloat(parseFloat($scope.credit.totaltax)+parseFloat($scope.credit.cgst)+parseFloat($scope.credit.sgst));
            $scope.credit.totalamount=parseFloat(parseFloat($scope.credit.amount)+parseFloat($scope.credit.totaltax));
        $scope.convertNumberToWords($scope.credit.totalamount);
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

    $scope.saveData = function(){


        if($('#crm_cm_id').val() == undefined || $('#crm_cm_id').val() == "" || $scope.credit.crm_cm_id.cm_id == undefined ){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>Customer in valid</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#crm_cm_id').focus();
            }, 1500);
        }
        // else if($scope.invoice.im_credit == undefined || $scope.invoice.im_credit == ""){
        //   var dialog = bootbox.dialog({
        //     message: "<p class='text-center'>please select cash / credit</p>",
        //         closeButton: false
        //     }); 
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     $('#im_credit').focus();
        //     }, 1500);
        // }
        // else if($scope.invoice.im_credit == 'Credit' && ($('#im_payment_date').val() == undefined || $('#im_payment_date').val() == ""))
        // {
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please select payment date.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //     }, 1500);
        // }
        else if($('#crm_vehicle').val() == undefined || $('#crm_vehicle').val() == ""){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>please enter vehicle</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#im_credit').focus();
            }, 1500);
        }
        else if($('#crm_vehicle_no').val() == undefined || $('#crm_vehicle_no').val() == ""){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>please enter vehicle no</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#im_credit').focus();
            }, 1500);
        }
        else if($scope.selectedProductList.length == 0)
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please add product to list.</p>',
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

                
                    $scope.credit.crm_date = $('#pDate').val();
                    // $scope.invoice.im_payment_date = $('#im_payment_date').val(); 

                    $scope.pruchaseForm = {
                        purchaseSingleData : $scope.credit,
                        purchaseMultipleData : $scope.selectedProductList
                    };
                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/credit/add',
                      data: $scope.pruchaseForm,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                    })
                    .success(function(response)
                    {
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Credit Added Successfully!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-success");
                        setTimeout(function(){
                            dialog.modal('hide');  
                                
                            $('#btnsave').text("SAVE");
                            $('#btnsave').removeAttr('disabled');
                            $scope.printDetails();
                            window.location.href = '#/credit'; 
                        }, 1500);
                    })
                    .error(function(data) 
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Oops, Something Went Wrong! Please try again!</p>',
                            closeButton: false
                        });
                        setTimeout(function(){
                        $('#btnsave').text("SAVE");
                        $('#btnsave').removeAttr('disabled');
                            dialog.modal('hide');  
                            $('#addCustomer').modal('hide');
                        }, 1500);
                    });
            }

        };

    $scope.printDetails = function(){

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
           "<table width='100%' height='100%'>" +
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
                          "<strong>Credit</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Customer</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_cm_id.cm_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_cm_id.cm_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_cm_id.cm_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "GSTIN: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_cm_id.cm_gst+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Credit No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Credit Date: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.credit.crm_date, "mediumDate")+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Vehicle & Vehicle no.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.credit.crm_vehicle+" & "+ $scope.credit.crm_vehicle_no +"</strong>"+
                              "</td>"+
                            "</tr>"+
                            // "<tr>"+
                            //   "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "Cash / Credit.: "+
                            //   "</td>"+
                            //   "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "<strong>"+$scope.credit.im_credit+"</strong>"+
                            //   "</td>"+
                            // "</tr>"+
                            // "<tr>"+
                            //   "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "Payment Date: "+
                            //   "</td>";
                            //   if($scope.credit.im_payment_date == null){
                            //     page1 = page1 + "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "<strong></strong>"+
                            //   "</td>";
                            //   }
                            //   else{
                            //     page1 = page1 + "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                            //     "<strong>"+$filter('date')($scope.credit.im_payment_date, "mediumDate")+"</strong>"+
                            //   "</td>";
                            //   }
                            // page1 = page1 + "</tr>"+
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
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='20%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>HSN Code</th>" +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty</th>"+
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Unit</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='10%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>SGST</th>" +
                        "<th width='10%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>CGST</th>" +
                        "<th width='10%' colspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>IGST</th>" +
                        "<th width='10%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none none solid none; border-width:1px;'>Total</th>" +
                      "</tr>"+
                      "<tr>"+      
                        "<th width='4%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='6%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='4%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='6%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                        "<th width='4%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Rate</th>" +
                        "<th width='6%' style='padding: 4px; text-align:center; font-size: 9pt; border-style: none solid solid none; border-width:1px;'>Amount</th>" +
                      "</tr>"+
                    "</thead>"+
                    " "+$('#content').html()+" " +
                  "</table>"+
                "</td>"+
              "</tr>"+
            "</tbody>"+
            "<tfoot>"+
            "<tr>"+
              "<td width='50%' colspan='4' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><strong>Total</strong></td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.credit.amount, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.credit.cgst, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.credit.sgst, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.credit.igst, "3")+"</td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.credit.totalamount, "3")+"</td>"+
            "</tr>"+
            "<tr>" +
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount Before Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.credit.amount, "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Add: CGST + SGST + IGST</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')(parseFloat(parseFloat($scope.credit.cgst) + parseFloat($scope.credit.sgst) + parseFloat($scope.credit.igst)), "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:9pt; border-style: none none solid solid; border-width:1px;'>"+
                  "Company's Bank Details<br>"+
                  "Bank Name : <strong>"+localStorage.getItem("bkm_name")+"</strong><br>"+
                  "A/C No &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: <strong>"+localStorage.getItem("bkm_account_no")+"</strong><br>"+
                  "Branch &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: <strong>"+localStorage.getItem("bkm_branch")+"</strong><br>"+
                  "IFS Code &nbsp&nbsp&nbsp&nbsp: <strong>"+localStorage.getItem("bkm_ifsc")+"</strong><br>"+
                  "<strong>Terms & Conditions</strong><br>"+
                  "1. Goods once sold shall not be taken back.<br>"+
                  "2. Our responsibility ceases once the goods leave our premises.<br>"+
                  "3. Subject to Pune jurisdiction Only.<br>"+
                  "4. GST No : <strong></strong>"+
                  "</td>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Total Amount After Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.credit.totalamount, "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='5' width='40%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for AMK Enterprises</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
    }

});