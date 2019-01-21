//angular.module('business',['ngRoute','ui.bootstrap']);
angular.module('purchase').controller('purchaseAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $timeout, $filter) { 	
	

  $('.index').removeClass("active");
  $('#vendorindex').addClass("active");
  $('#purchaseaddindex').addClass("active");
    $scope.productList = [];
    $scope.vendorList = [];
    $scope.selectedProductList = [];
    $scope.purchase = {};
    $scope.productObj = [];
    $scope.vendor = {};
    $scope.product = {};
    $scope.purchase.prm_credit = "Credit";
    $scope.purchase.amount = 0;
    $scope.purchase.cgst = 0;
    $scope.purchase.sgst = 0;
    $scope.purchase.igst = 0;
    $scope.purchase.discount = 0;
    $scope.purchase.prm_inward_no = 'N/A';
    $scope.purchase.prm_comment = 'N/A';
    // $scope.airline.am_total_amount = 0;
    $scope.parseFloat = parseFloat;
    $scope.limit = {};

    $("#prm_vm_id").focus();

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
     $('#prm_date').val(yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd);
    // $scope.purchase.prm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;
    $scope.purchase.prm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

     $('#prm_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        // minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        // maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar
        onChangeDateTime: function (dp, $input) {
            $scope.purchase.prm_date = $('#prm_date').val();
        }
    });
     
    $scope.getSerialNo = function() {
        const fin = localStorage.getItem("amkenterprises_admin_financial_year");
        const finyr = fin.split('-');
        const finyr1 = finyr[0].toString().substring(2);
        const finyr2 = finyr[1].toString().substring(2);

        $scope.limit.fin_year = "%/"+finyr1+"-"+finyr2+"%";
        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/purchase/serial/no',
          data: $scope.limit,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {   
            if(orderno.length >0){
                var pom = orderno[0].prm_invoice_no;
                var arrinvo = pom.split('/');
                $scope.purchase.prm_invoice_no = parseInt(parseInt(arrinvo[0])+parseInt(1))+"/"+finyr1+"-"+finyr2;                
            }
            else
                $scope.purchase.prm_invoice_no = 1+"/"+finyr1+"-"+finyr2;
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
    $scope.getSearchVen = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/vendor/typeahead/search', searchTerms, httpOptions).then((result) => {
          
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
//end type a head

    $scope.setProductData = function() {
        $scope.productObj.pm_qty = 1;
        $scope.productObj.price = $scope.productObj.pm_price;
        // $scope.productObj.sellprice = $scope.productObj.pm_sell_price;
    }

    $scope.openVendorForm = function(){
        $scope.getCode();
        $scope.vendor.vm_mobile = "N/A";
        $scope.vendor.vm_address = "N/A";
        $scope.vendor.vm_email_id = "N/A";
        $scope.vendor.vm_gst_no = "N/A";
        $scope.vendor.vm_opening_credit = 0;
        $scope.vendor.vm_opening_debit = 0;
        $('#addVendor').modal('show');
    };

    $scope.openProductForm = function(){
        $scope.product.pm_unit = "Litre";
        $scope.product.pm_cgst = 9;
        $scope.product.pm_sgst = 9;
        $scope.product.pm_igst = 0;
        $('#addProduct').modal('show');
    };

    $scope.getCode = function() {
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/vendor/code/no',
          //data: $scope.data,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
            if (orderno.length > 0) {
            $scope.vendor.vm_code = parseInt(orderno[0].vm_code)+1;
          }  
          else{
            $scope.vendor.vm_code = 1;
          }
        })
        .error(function(data) 
        {   
            var dialog = bootbox.dialog({
            message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                closeButton: false
            });
            setTimeout(function(){
                dialog.modal('hide');  
                $('#addVendor').modal('hide');
                //$scope.vendor = null;
            }, 1500);
        });
    };

    $scope.saveVendor = function(){
        $scope.apiURL = $rootScope.baseURL+'/vendor/add';
        
        if($('#vm_firm_name').val() == undefined || $('#vm_firm_name').val() == ""){
            var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter Vendor name.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');                 
              $("#vm_firm_name").focus();
              }, 1500);
          }
          else if($('#vm_mobile').val() == undefined || $('#vm_mobile').val() == ""){
            var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter Mobile no.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $("#vm_mobile").focus();
              }, 1500);
        }
        else if($('#vm_email_id').val() == undefined || $('#vm_email_id').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter email id.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide'); 
              $("#vm_email_id").focus();
              }, 1500);
        }
        else if($('#vm_address').val() == undefined || $('#vm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#vm_address").focus();
            }, 1500);
        }
        else if($('#vm_gst_no').val() == undefined || $('#vm_gst_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter GSTIN.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#vm_gst_no").focus();
            }, 1500);
        }
        else if($('#vm_opening_credit').val() == undefined || $('#vm_opening_credit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening credit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#vm_opening_credit").focus();
            }, 1500);
        }
        else if($('#vm_opening_debit').val() == undefined || $('#vm_opening_debit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening debit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#vm_opening_debit").focus();
            }, 1500);
        }
        else{

                $('#addVend').attr('disabled','true');
                $('#addVend').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/vendor/checkname',
                  data: $scope.vendor,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                        $http({
                          method: 'POST',
                          url: $scope.apiURL,
                          data: $scope.vendor,
                          headers: {'Content-Type': 'application/json',
                                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                        })
                        .success(function(login)
                        { 
                          var dialog = bootbox.dialog({
                            message: '<p class="text-center">Vendor Added Successfully.</p>',
                                closeButton: false
                            });
                            dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                $('#addVend').text("Save");
                                $('#addVend').removeAttr('disabled');
                                    //do something special
                                    dialog.modal('hide');  
                                    $('#addVendor').modal('hide');
                                    $scope.vendor = {};
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
                            $('#addVend').text("SAVE");
                            $('#addVend').removeAttr('disabled');
                                dialog.modal('hide'); 
                            }, 1500);            
                        });
                    }
                    else{
                          var dialog = bootbox.dialog({
                              message: '<p class="text-center">Vendor Already Exist!</p>',
                                  closeButton: false
                              });
                            dialog.find('.modal-body').addClass("btn-warning");
                              setTimeout(function(){
                                  $('#addVend').text("SAVE");
                                  $('#addVend').removeAttr('disabled');
                                  dialog.modal('hide');  
                              }, 1500);

                        $scope.vendor.vm_debit = 0;
                        $scope.vendor.vm_balance = 0;
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
                        $('#addVend').text("SAVE");
                        $('#addVend').removeAttr('disabled');
                        dialog.modal('hide');  
                    }, 1500);
                });
            }
    };

    $scope.addProduct = function () {
        $scope.apiURL = $rootScope.baseURL+'/product/add';

        if($('#pm_name').val() == undefined || $('#pm_name').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter product name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#pm_name").focus();
            }, 1500);
        }
        else if($('#pm_unit').val() == undefined || $('#pm_unit').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter unit.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $("#pm_unit").focus();
                }, 1500);
        }
        else if($('#pm_hsn').val() == undefined || $('#pm_hsn').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter HSN.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $("#pm_hsn").focus();
                }, 1500);
        }
        else if($('#pm_price').val() == undefined || $('#pm_price').val() == ""){
                var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter price.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $("#pm_price").focus();
                }, 1500);
        }
        else if($('#pm_cgst').val() == undefined || $('#pm_cgst').val() == ""){
                var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter CGST.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide');
                    $("#pm_cgst").focus(); 
                }, 1500);
        }
        else if($('#pm_sgst').val() == undefined || $('#pm_sgst').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter SGST.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $("#pm_sgst").focus();
                }, 1500);
        }
      else if($('#pm_igst').val() == undefined || $('#pm_igst').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter IGST.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#pm_sgst").focus();
            }, 1500);
      }
      else if($('#pm_sell_price').val() == undefined || $('#pm_sell_price').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter selling price.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#pm_sgst").focus();
            }, 1500);
      }
        else if($('#pm_opening_quantity').val() == undefined || $('#pm_opening_quantity').val() == ""){
            var dialog = bootbox.dialog({
                message: '<p class="text-center">please enter opening quantity.</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-danger");
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $("#pm_opening_quantity").focus();
                }, 1500);
        }
        else{
                $('#addProd').attr('disabled','true');
                $('#addProd').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/product/checkname',
                  data: $scope.product,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length > 0){
                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">Product Already Exits!</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-warning");
                          setTimeout(function(){
                              dialog.modal('hide'); 
                          }, 1500);

                        $('#addProd').text("Save");
                        $('#addProd').removeAttr('disabled');
                    }
                    else
                    {
                        $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: $scope.product,
                            headers: {'Content-Type': 'application/json',
                                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                          })
                          .success(function(login)
                          {
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Product Added Successfully.</p>',
                                  closeButton: false
                              });
                            dialog.find('.modal-body').addClass("btn-success"); 
                              setTimeout(function(){
                                $('#addProd').text("Save changes");
                                $('#addProd').removeAttr('disabled');
                                    //do something special
                                    // $scope.productList = [];
                                    // $scope.getProductList();
                                    dialog.modal('hide');  
                                    $('#addProduct').modal('hide');
                                    $scope.product = {};
                                }, 1500);
                               
                          })
                          .error(function(data) 
                          {   
                            var dialog = bootbox.dialog({
                              message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                                  closeButton: false
                              });
                              setTimeout(function(){
                              $('#addProd').text("Save");
                              $('#addProd').removeAttr('disabled');
                                  dialog.modal('hide'); 
                              }, 1500);            
                          });
                    }
                    
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    setTimeout(function(){
                        $('#addProd').text("Save");
                        $('#addProd').removeAttr('disabled');
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
        // else if($('#sellprice').val() == undefined || $('#sellprice').val() == ""){
        //     var dialog = bootbox.dialog({
        //     message: '<p class="text-center">please enter selling price.</p>',
        //         closeButton: false
        //     });
        //     dialog.find('.modal-body').addClass("btn-danger");
        //     setTimeout(function(){
        //         dialog.modal('hide'); 
        //         $('#price').focus();
        //     }, 1500);
        // }
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
        $scope.purchase.amount = 0;
        $scope.purchase.totaltax=0;
        $scope.purchase.totalamount=0;
        $scope.purchase.cgst=0;
        $scope.purchase.sgst=0;
        $scope.purchase.igst=0;

        angular.forEach($scope.selectedProductList, function(value, key) {
            
            value.srno = i++;
            $scope.purchase.amount = parseFloat($scope.purchase.amount) + parseFloat(value.pm_qty)*parseFloat(value.price)*1000;
            $scope.purchase.cgst = parseFloat(parseFloat($scope.purchase.cgst) + parseFloat((value.pm_cgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)*1000))).toFixed(3);
            $scope.purchase.sgst = parseFloat(parseFloat($scope.purchase.sgst) + parseFloat((value.pm_sgst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)*1000))).toFixed(3);
            $scope.purchase.igst = parseFloat(parseFloat($scope.purchase.igst) + parseFloat((value.pm_igst/100) * (parseFloat(value.pm_qty)*parseFloat(value.price)*1000))).toFixed(3);
                    
        });
            $scope.purchase.totaltax=parseFloat(parseFloat($scope.purchase.totaltax)+parseFloat($scope.purchase.cgst)+parseFloat($scope.purchase.sgst));
            $scope.purchase.totalamount=parseFloat(parseFloat($scope.purchase.amount)+parseFloat($scope.purchase.totaltax));
        $scope.convertNumberToWords($scope.purchase.totalamount);
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

    $scope.savePurchase = function(){


        if($('#prm_vm_id').val() == undefined || $('#prm_vm_id').val() == "" || $scope.purchase.prm_vm_id.vm_id == undefined ){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>vendor in valid</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#prm_vm_id').focus();
            }, 1500);
        }
        else if($scope.purchase.prm_credit == undefined || $scope.purchase.prm_credit == ""){
          var dialog = bootbox.dialog({
            message: "<p class='text-center'>please select cash / credit</p>",
                closeButton: false
            }); 
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $('#prm_credit').focus();
            }, 1500);
        }
        else if($('#prm_inward_no').val() == undefined || $('#prm_inward_no').val() == "")
        {
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter inward no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
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

                    $scope.purchase.prm_date = $('#prm_date').val();

                    // if($scope.purchase.prm_payment_date != null){
                    //         var pom = $('#prm_payment_date').val();
                    //         var arrinvo = pom.split('-');
                    //         $scope.purchase.prm_payment_date = arrinvo[2]+"-"+arrinvo[1]+"-"+arrinvo[0];                
                    //     }
                    // var pomd = $('#prm_date').val();
                    //         var arrinvon = pomd.split('-');
                    //         $scope.purchase.prm_date = arrinvon[2]+"-"+arrinvon[1]+"-"+arrinvon[0]; 

                    $scope.pruchaseForm = {
                        purchaseSingleData : $scope.purchase,
                        purchaseMultipleData : $scope.selectedProductList
                    };
                    $http({
                      method: 'POST',
                      url: $rootScope.baseURL+'/purchase/add',
                      data: $scope.pruchaseForm,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                    })
                    .success(function(response)
                    {   
                        var dialog = bootbox.dialog({
                        message: '<p class="text-center">Purchase Added Successfully!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-success");
                        setTimeout(function(){
                            dialog.modal('hide');  
                                $('#btnsave').text("Save");
                                $('#btnsave').removeAttr('disabled');
                                // $scope.printDetails();
                                window.location.href = '#/purchase'; 
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
                "zoom:75%;"+
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
                          "<strong>Purchase Tax Invoice</strong>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>" +
                      "<td width='60%' style='text-align:left; padding: 4px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td  colspan='2' style='text-align:center; padding: 4px; border-style: none none solid none; border-width:1px; font-size:10pt;'>"+
                                "<strong>Bill To Party</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Name: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_vm_id.vm_firm_name+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Address: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_vm_id.vm_address+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "Contact No.: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_vm_id.vm_mobile+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='30%' style='text-align:left; padding: 4px; border-style: none solid none none; border-width:1px; font-size:10pt;'>"+
                                "GSTIN: "+
                              "</td>"+
                              "<td width='70%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_vm_id.vm_gst_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                          "</table>"+
                      "</td>" +
                      "<td width='40%' style='text-align:left; padding: 4px; border-style: solid solid none none; border-width:1px; font-size:10pt;' valign='top'>" +
                          "<table width='100%'>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice No.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_invoice_no+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Invoice Date: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$filter('date')($scope.purchase.prm_date, "mediumDate")+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Cash / Credit.: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_credit+"</strong>"+
                              "</td>"+
                            "</tr>"+
                            "<tr>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "Inward no: "+
                              "</td>"+
                              "<td width='50%' style='text-align:left; padding: 4px; border-style: none none none none; border-width:1px; font-size:10pt;'>"+
                                "<strong>"+$scope.purchase.prm_inward_no+"</strong>"+
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
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Sr.No.</th>" +
                        "<th width='20%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Product Description</th> " +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>HSN Code</th>" +
                        "<th width='5%' rowspan='2' style='text-align:center; padding: 4px; font-size: 10pt; border-style: none solid solid none; border-width:1px;'>Qty (in Thousand)</th>"+
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
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.purchase.amount, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.purchase.cgst, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.purchase.sgst, "3")+"</td>"+
              "<td width='15%' colspan='2' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.purchase.igst, "3")+"</td>"+
              "<td width='10%' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid none; border-width:1px;'>"+$filter('number')($scope.purchase.totalamount, "3")+"</td>"+
            "</tr>"+
            "<tr>" +
                  "<td colspan='7' rowspan='2' width='60%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Amount in words : "+$scope.amountinwords+"</td>" +
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: none solid solid solid; border-width:1px;'>Total Amount Before Tax</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: none solid none none; border-width:1px;'><strong>"+$filter('number')($scope.purchase.amount, "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='4' width='30%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'>Add: CGST + SGST + IGST</td>" +
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')(parseFloat(parseFloat($scope.purchase.cgst) + parseFloat($scope.purchase.sgst) + parseFloat($scope.purchase.igst)), "3")+"</strong></td>" +
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
                  "<td width='10%' style='padding:4px; font-size:10pt; border-style: solid; border-width:1px;'><strong>"+$filter('number')($scope.purchase.totalamount, "3")+"</strong></td>" +
              "</tr>"+
              "<tr>"+
                  "<td colspan='5' width='40%' colspan='2' valign='bottom' style='text-align:center; padding:4px; font-size:10pt; border-style: solid solid solid solid; border-width:1px;'><span style='font-size:7pt;'>Ceritified that the particulars given above are true and correct</span><br><strong>for "+ localStorage.getItem("com_name") +"</strong><br><br><br><br><br><br><br><br><br><strong>Authorized Signatory</strong></td>" +
              "</tr>" +
            "</tfoot>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(page1);
        popupWin.document.close();
    }

});