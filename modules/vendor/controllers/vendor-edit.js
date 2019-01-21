// import admin
angular.module('vendor').controller('vendorEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#vendorindex').addClass("active");
  $('#vendorlistindex').addClass("active");
  
	$scope.vendorId = $routeParams.vendorId;
  $scope.apiURL = $rootScope.baseURL+'/vendor/edit/'+$scope.vendorId;

  $scope.getVendor = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/vendor/'+$scope.vendorId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(vendorObj)
	    {
	    	vendorObj.forEach(function (value, key) {
          value.old_opening_credit = value.vm_opening_credit;
          value.old_opening_debit = value.vm_opening_debit;
	      		$scope.vendor = value;
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


  $scope.updateVendor = function () {

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
      // else if(!nameRegex.test($('#cm_mobile').val())){
      //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
      // }
      // else if($('#cm_mobile').val().length < 10){
      //  var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
      // }
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
                    if(orderno.length == 1 && $scope.vendorId != orderno[0].vm_id){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Vendor Already Exits!</p>',
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
                            data: $scope.vendor,
                            headers: {'Content-Type': 'application/json',
                                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                          })
                          .success(function(login)
                          {     
                            var dialog = bootbox.dialog({
                                message: '<p class="text-center">Updated Successfully.</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-success");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                                $('#btnsave').text("Update");
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