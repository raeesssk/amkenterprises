// import admin
angular.module('customer').controller('customerEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#customerlsitindex').addClass("active");

  $scope.selectedProductList = [];
  $scope.selectedProductListAdd = [];
  $scope.selectedProductListRemove = [];
  $scope.customer = {};
  $scope.productObj = {};
  
	$scope.customerId = $routeParams.customerId;
  $scope.apiURL = $rootScope.baseURL+'/customer/edit/'+$scope.customerId;

  $scope.getCustomer = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/customer/'+$scope.customerId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {          
            value.old_opening_credit = value.cm_opening_credit;
            value.old_opening_debit = value.cm_opening_debit;
	      		$scope.customer = value;

            $http({
              method: 'GET',
              url: $rootScope.baseURL+'/customer/vehicle/details/'+$scope.customerId,
              //data: $scope.data,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            })
            .success(function(selectedProductList)
            {
                selectedProductList.forEach(function(value, key) {
                    $scope.selectedProductList.push(value);
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
        });
      		  
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
            }, 1500);            
	    });
	};

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
            $scope.selectedProductListAdd.push($scope.productObj);
            $scope.productObj = null;
            $('#cvm_vehicle_no').focus();
        }
    };

    $scope.removeItem = function(index){
        $scope.selectedProductListRemove.push($scope.selectedProductList[index]);
        $scope.selectedProductList.splice(index,1);
           $('#cvm_vehicle_no').focus();
    };

    $scope.removeItemAdd = function(index){
        $scope.selectedProductListAdd.splice(index,1);
           $('#cvm_vehicle_no').focus();
    };


  $scope.updateCustomer = function () {

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
            message: '<p class="text-center">please enter Mobile no.</p>',
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
                  purchaseSingleData : $scope.customer,
                  purchaseMultipleData : $scope.selectedProductList,
                  purchaseadd : $scope.selectedProductListAdd,
                  purchaseremove : $scope.selectedProductListRemove
                };

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/customer/checkname',
                  data: $scope.customer,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 1 && $scope.customerId != orderno[0].cm_id){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Customer Already Exits!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-warning");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                    $('#btnsave').text("Update");
                                    $('#btnsave').removeAttr('disabled');
                                }, 1500);

                      }
                    else
                      {
                          $http({
                            method: 'POST',
                            url: $scope.apiURL,
                            data: $scope.pruchaseForm,
                            headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                          })
                          .success(function(login)
                          {
                              var dialog = bootbox.dialog({
                                message: '<p class="text-center">Customer Updated Successfully.</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                    $('#btnsave').text("Update");
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
                                  $('#btnsave').text("Update");
                                  $('#btnsave').removeAttr('disabled');
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
                    dialog.find('.modal-body').addClass("btn-danger");
                    setTimeout(function(){
                        dialog.modal('hide');  
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                    }, 1500);
                });
            }

	};

});
