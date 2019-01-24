// import admin
angular.module('expensetype').controller('expensetypeAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#expenseindex').addClass("active");
  $('#expensetypeaddindex').addClass("active");
  
	$scope.apiURL = $rootScope.baseURL+'/expensetype/add';
  	$scope.addExpensetype = function () {
	    
	    if($('#etm_type').val() === undefined || $('#etm_type').val() === ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter expense type.</p>',
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
		      data: $scope.expensetype,
		      headers: {'Content-Type': 'application/json',
	                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
		    })
		    .success(function(expensetype)
		    {
		    	var dialog = bootbox.dialog({
                message: '<p class="text-center">Expense Type Added Successfully!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){
                    dialog.modal('hide');  
                    $('#btnsave').text("Save");
                    $('#btnsave').removeAttr('disabled');
                    window.location.href = '#/expensetype'; 
                }, 1500);   
		    })
		    .error(function(data) 
		    {   
		      var dialog = bootbox.dialog({
	            message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
	                closeButton: false
	            });
	            setTimeout(function(){
                $('#btnsave').text("Save");
                $('#btnsave').removeAttr('disabled');
	                dialog.modal('hide'); 
	            }, 1500);                 
		    });
	    }
	};

});