// import admin
angular.module('requisition').controller('requisitionEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#requisitionlistindex').addClass("active");
  
    // $("#vehicle").hide();

    $scope.emId = $routeParams.emId;

    $('#rcm_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.requisition.rcm_date = $('#rcm_date').val();
            // $('#end-date-picker').val(endDate); 
            $scope.getSerialNo();
        }
    });

    $scope.checkBox = function(index){ 

        if($scope.requisition.rcm_check){
            $scope.requisition.rcm_pm = undefined;
           $("#pm_id").hide();
            $("#p_id").show();
        }
        else{
            $scope.requisition.rcm_p_id = undefined;
            $("#p_id").hide();
           $("#pm_id").show();
        } 

    };

    $scope.getSerialNo = function() {
        

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/requisition/serial/no',
          data: $scope.requisition,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
          
            if(orderno.length >0){
                $scope.requisition.rcm_token = parseInt(parseInt(orderno[0].rcm_token)+parseInt(1));                
            }
            else
                $scope.requisition.rcm_token = 1;
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

    $scope.getSearchVen = function(vals) {

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

    $scope.setgetVehicle = function(){
        if($('#cm_id').val() == undefined || $('#cm_id').val() == "" || $scope.requisition.rcm_cm.cm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else{
            $("#vehicle").show();
        }
    }

    $scope.getCustVehicle = function(vals) {

      var searchTerms = {search: vals, cm_id:$scope.requisition.rcm_cm_id.cm_id};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/customer/vehicle/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getSearchPro = function(vals) {

      var searchTerms = {search: vals, pdate: $scope.requisition.rcm_date};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/productprice/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
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
        return $http.post($rootScope.baseURL+'/product/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.changeDate = function(){
      if($scope.requisition.old_rcm_date != $('#rcm_date').val()){
        $('#pm_id').val("");
        $scope.requisition.rcm_pm = "";
      }
      
    }

    $scope.getExpenseList = function() {
        
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/requisition/'+$scope.emId,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(expense)
        {
            expense.forEach(function (value, key) {
                value.old_rcm_date = $filter('date')(value.rcm_date, "yyyy-MM-dd");
                value.rcm_date = $filter('date')(value.rcm_date, "yyyy-MM-dd");
                
                value.old_rcm_amount = value.rcm_amount;

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/customer/'+value.cm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.old_rcm_cm_id = value1;
                        value.rcm_cm = value1;
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

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/customer/vehicle/'+value.cvm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.rcm_cvm = value1;
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

                if(value.prprm_id != null)
                {

                  value.rcm_check = false;
                  $('#p_id').hide();
                  $('#pm_id').show();
                  $http({
                    method: 'GET',
                    url: $rootScope.baseURL+'/productprice/'+value.prprm_id,
                    //data: $scope.data,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                  })
                  .success(function(selectedProductList)
                  {
                      selectedProductList.forEach(function(value1, key1) {
                          value.rcm_pm = value1;
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
                }
                else
                {
                  value.rcm_check = true;
                  $('#pm_id').hide();
                  $('#p_id').show();
                  $http({
                    method: 'GET',
                    url: $rootScope.baseURL+'/product/'+value.rcm_pm_id,
                    //data: $scope.data,
                    headers: {'Content-Type': 'application/json',
                            'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                  })
                  .success(function(selectedProductList)
                  {
                      selectedProductList.forEach(function(value1, key1) {
                          value.rcm_p_id = value1;
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
                }

                $scope.requisition = value;
              });
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
    $scope.getExpenseList();

    $scope.addRequisition = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        if($('#rcm_date').val() == undefined || $('#rcm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_id').val() == undefined || $('#cm_id').val() == "" || $scope.requisition.rcm_cm.cm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select customer name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($('#rcm_bill_no').val() == undefined || $('#rcm_bill_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter req. no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cvm_id').val() == undefined || $('#cvm_id').val() == "" || $scope.requisition.rcm_cvm.cvm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select vehicle no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if(($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.requisition.rcm_pm.pm_id == undefined) && ($('#p_id').val() == undefined || $('#p_id').val() == "" || $scope.requisition.rcm_p_id.pm_id == undefined)){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select product or other product.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($('#rcm_qty').val() == undefined || $('#rcm_qty').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter quantity.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else{
            // $scope.expenseForm = {
            //     expenseSingleData : $scope.expense,
            //     expenseMultipleData : $scope.selectedPurchaseList,
            //     expenseMultipleDataSale : $scope.selectedSalesList
            // };
            
            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");

            if($scope.requisition.rcm_pm != undefined)
            {
                $scope.requisition.rcm_pm.price = $scope.requisition.rcm_pm.prprm_price;
                $scope.requisition.rcm_p = $scope.requisition.rcm_pm;
            }
            else
            {
                $scope.requisition.rcm_p_id.price = $scope.requisition.rcm_p_id.pm_sell_price;
                $scope.requisition.rcm_p = $scope.requisition.rcm_p_id;
            }
    	    
            $scope.apiURL = $rootScope.baseURL+'/requisition/edit/'+$scope.emId;
    	    $http({
    	      method: 'POST',
    	      url: $scope.apiURL,
    	      data: $scope.requisition,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
    	    })
    	    .success(function(login)
    	    {
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Entry Updated Successfully.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                    $scope.printDetails();
                    window.location.href = '#/requisition';
                  }, 1500);      
    	    })
    	    .error(function(data) 
    	    {   
    	      var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
                });
                setTimeout(function(){
                    dialog.modal('hide'); 
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                }, 1500);            
    	    });
        }
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
                    "<td style='font-size:36pt; border-style: solid solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>token</div><div>"+$scope.requisition.rcm_token+"</div></td>"+
                    "<td style='font-size:36pt; border-style: solid solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Req. no.</div><div>"+$scope.requisition.rcm_bill_no+"</div></td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td style='font-size:8pt; border-style: none solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Product</div><div>"+$scope.requisition.rcm_p.pm_name+"</div></td>"+
                    "<td style='font-size:8pt; border-style: none solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Quantity</div><div>"+$filter('number')($scope.requisition.rcm_qty,'3')+"</div></td>"+
                    "</tr>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    }

});