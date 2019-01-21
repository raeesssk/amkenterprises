// import admin
angular.module('customer').controller('customerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#customeraddindex').addClass("active");
  
    $scope.customer = {};
    $scope.customerlist = [];
    $scope.productObj = {};

    $scope.customer.cm_mobile = "N/A";
    $scope.customer.cm_address = "N/A";
    $scope.customer.cm_email = "N/A";
    $scope.customer.cm_gst = "N/A";    
    $scope.customer.cm_opening_credit = 0;
    $scope.customer.cm_opening_debit = 0;
    $("#cm_name").focus();

    // Auto Generate Serial Number for Vendor
    $scope.getSerial = function(){
          $http({
          method: 'GET',
          url:  $rootScope.baseURL+'/customer/code/no',
          headers: {'Content-Type':'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(login)
        {   
          if (login.length > 0) {
            $scope.customer.cm_code = parseInt(login[0].cm_code)+1;
          }  
          else{
            $scope.customer.cm_code = 1;
          }
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
    $scope.getSerial();

    $scope.addToCart = function(){
        if($('#cvm_vehicle_no').val() == undefined || $('#cvm_vehicle_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter vehicle no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#cvm_vehicle_no').focus();
            }, 1500);
        }
        else{
            $scope.productObj.test = "test";
            $scope.customerlist.push($scope.productObj);
            $scope.productObj = null;
            $('#cvm_vehicle_no').focus();
        }
    };

    $scope.removeItem = function(index){
        $scope.customerlist.splice(index,1);
           $('#cvm_vehicle_no').focus();
    };

	$scope.apiURL = $rootScope.baseURL+'/customer/add';
    $scope.addCustomer = function () {
      
        if($('#cm_name').val() == undefined || $('#cm_name').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter customer name.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');  
              $("#cm_name").focus();
              }, 1500);
        }    
        else if($('#cm_division').val() == undefined || $('#cm_division').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter customer division.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');  
              $("#cm_division").focus();
              }, 1500);
        }    
        else if($('#cm_mobile').val() == undefined || $('#cm_mobile').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter mobile no.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');  
              $("#cm_mobile").focus();
              }, 1500);
        }
        else if($('#cm_email').val() == undefined || $('#cm_email').val() == ""){
          var dialog = bootbox.dialog({
              message: '<p class="text-center">please enter email id.</p>',
                  closeButton: false
              });
              dialog.find('.modal-body').addClass("btn-danger");
              setTimeout(function(){
                  dialog.modal('hide');  
              $("#cm_email").focus();
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
            $("#cm_address").focus();
            }, 1500);
        }
        else if($('#cm_gst').val() == undefined || $('#cm_gst').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter GSTIN.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
            $("#cm_gst").focus(); 
            }, 1500);
        }
        else if($('#cm_opening_credit').val() == undefined || $('#cm_opening_credit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening credit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#cm_opening_credit").focus();
            }, 1500);
        }
        else if($('#cm_opening_debit').val() == undefined || $('#cm_opening_debit').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening debit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            $("#cm_opening_debit").focus();
            }, 1500);
        }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $scope.pruchaseForm = {
                    customer : $scope.customer,
                    customerlist : $scope.customerlist
                };

                console.log($scope.pruchaseForm);
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
                            url: $rootScope.baseURL+'/customer/add',
                            data: $scope.pruchaseForm,
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
                                  dialog.modal('hide'); 
                                  $('#btnsave').text("Save");
                                  $('#btnsave').removeAttr('disabled');
                                  window.location.href = '#/customer';
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
                                  dialog.modal('hide'); 
                              $('#btnsave').text("Save");
                              $('#btnsave').removeAttr('disabled');
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
                                  dialog.modal('hide');  
                                  $('#btnsave').text("Save");
                                  $('#btnsave').removeAttr('disabled');
                              }, 1500);
                          $scope.customer.cm_debit = 0;
                          $scope.customer.cm_balance = 0;
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
                        dialog.modal('hide');  
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                    }, 1500);
                });
		      }
	};

});