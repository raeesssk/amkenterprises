// import admin
angular.module('vendor').controller('vendorAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#vendorindex').addClass("active");
  $('#vendoraddindex').addClass("active");
  
    $scope.vendor = {};

    $scope.vendor.vm_mobile = "N/A";
    $scope.vendor.vm_address = "N/A";
    $scope.vendor.vm_email_id = "N/A";
    $scope.vendor.vm_gst_no = "N/A";
    $scope.vendor.vm_opening_credit = 0;
    $scope.vendor.vm_opening_debit = 0;

    $("#vm_firm_name").focus();

    // Auto Generate Serial Number for Vendor
    $scope.getSerial = function(){
          $http({
          method: 'GET',
          url:  $rootScope.baseURL+'/vendor/code/no',
          headers: {'Content-Type':'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(login)
        {   
          if (login.length > 0) {
            $scope.vendor.vm_code = parseInt(login[0].vm_code)+1;
          }  
          else{
            $scope.vendor.vm_code = 1;
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

    
  	$scope.apiURL = $rootScope.baseURL+'/vendor/add';
    $scope.addVendor = function () {
  		  var nameRegex = /^\d+$/;
    		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
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

                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

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
                                dialog.modal('hide'); 
                                $('#btnsave').text("Save");
                                $('#btnsave').removeAttr('disabled');
                                window.location.href = '#/vendor'; 
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
                              message: '<p class="text-center">Vendor Already Exist!</p>',
                                  closeButton: false
                              });
                            dialog.find('.modal-body').addClass("btn-warning");
                              setTimeout(function(){
                                  dialog.modal('hide');  
                                  $('#btnsave').text("Save");
                                  $('#btnsave').removeAttr('disabled');
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
                        dialog.modal('hide');  
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                    }, 1500);
                });
		    }
	  };

});