// import admin
angular.module('employee').controller('employeeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#employeeindex').addClass("active");
  $('#employeeaddindex').addClass("active");
	$scope.employee = {};

    $scope.employee.emp_mobile = "N/A";
    $scope.employee.emp_address = "N/A";
    $("#emp_name").focus();

	$scope.apiURL = $rootScope.baseURL+'/employee/add';
  $scope.addEmployee = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#emp_name').val() === undefined || $('#emp_name').val() === ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter employee name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    else if($('#emp_mobile').val() == undefined || $('#emp_mobile').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
	    }
	    // else if(!nameRegex.test($('#emp_mobile').val())){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter Mobile no. in digits</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
	    // else if($('#emp_mobile').val().length < 10){
	    // 	var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter a valid Mobile no.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //        }, 1500);
	    // }
	    else if($('#emp_address').val() == undefined || $('#emp_address').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
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
		    $http({
		      method: 'POST',
		      url: $scope.apiURL,
		      data: $scope.employee,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
		    })
		    .success(function(login)
		    {
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Employee Added Successfully!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){
                    dialog.modal('hide');  
                    $('#btnsave').text("Save");
                    $('#btnsave').removeAttr('disabled');
                    window.location.href = '#/employee'; 
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
                $('#btnsave').text("Save");
                $('#btnsave').removeAttr('disabled');
	            }, 1500);            
		    });
		}
	};

});