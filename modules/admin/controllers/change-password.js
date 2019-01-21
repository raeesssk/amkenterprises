// import admin
angular.module('admin').controller('changePasswordCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {
	

  $('.index').removeClass("active");
  $('#dashboardindex').addClass("active");
  
  $scope.changePassword = function () {


	    if($('#curpassword').val() === undefined || $('#curpassword').val() === ""){
	        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter current password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#password').val() === undefined || $('#password').val() === ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#conpassword').val() == undefined || $('#conpassword').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter confirm password.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#conpassword').val() != $('#password').val()){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">the password and confirm password do not match.</p>',
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
            $scope.user.username = $rootScope.userid;
    		$http({
		      method: 'POST',
		      url: $rootScope.baseURL+'/login/changepassword',
		      data: $scope.user,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
		    })
		    .success(function(login)
		    {
                if(login.length == 0){
		            var dialog = bootbox.dialog({
	                message: '<p class="text-center">current password do not match.</p>',
	                    closeButton: false
	                });
	                dialog.find('.modal-body').addClass("btn-danger");
	                setTimeout(function(){
	                    dialog.modal('hide'); 
		                $('#btnsave').text("Change Password");
		                $('#btnsave').removeAttr('disabled');
	                }, 1500);
		        }
		        else{

		        	var dialog = bootbox.dialog({
                        message: '<p class="text-center">Password Updated Successfully!</p>',
                            closeButton: false
                        });
                        dialog.find('.modal-body').addClass("btn-success");
                        setTimeout(function(){
                            dialog.modal('hide');  
                                $('#btnsave').text("Change Password");
                                $('#btnsave').removeAttr('disabled');
                                window.location.href = '#/'; 
                        }, 1500);
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
                $('#btnsave').text("Change Password");
                $('#btnsave').removeAttr('disabled');
	            }, 1500);             
		    });
		}
	    
	};

});