// import admin
angular.module('expensetype').controller('expensetypeEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#expenseindex').addClass("active");
  $('#expensetypelistindex').addClass("active");
  
	$scope.etmId = $routeParams.etmId;
  $scope.apiURL = $rootScope.baseURL+'/expensetype/edit/'+$scope.etmId;

  $scope.getExpensetype = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/expensetype/'+$scope.etmId,
	      // data: $scope.employee,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(expensetype)
	    {
	    	expensetype.forEach(function (value, key) {
	      		$scope.expensetype = value;
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


  $scope.editExpensetype = function () {

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
		    .success(function(login)
		    {
		    	var dialog = bootbox.dialog({
                message: '<p class="text-center">Expense Type Updated Successfully!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){
                    dialog.modal('hide');  
                    $('#btnsave').text("Update");
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
                $('#btnsave').text("Update");
                $('#btnsave').removeAttr('disabled');
	                dialog.modal('hide'); 
	            }, 1500);             
		    });
		}
	};

});