// import admin
angular.module('product').controller('productAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#productindex').addClass("active");
  $('#productaddindex').addClass("active");
  
    $scope.product = {};

    $scope.product.pm_unit = "Litre";
    $scope.product.pm_cgst = 9;
    $scope.product.pm_sgst = 9;
    $scope.product.pm_igst = 0;

    $scope.parseFloat = parseFloat;

    $("#pm_name").focus();

	$scope.apiURL = $rootScope.baseURL+'/product/add';
    $scope.addProduct = function () {
		  var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
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
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

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
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                          }, 1500);

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
                                  dialog.modal('hide'); 
                                  $('#btnsave').text("Save");
                                  $('#btnsave').removeAttr('disabled');
                                  window.location.href = '#/product'; 
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