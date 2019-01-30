// import admin
angular.module('cash').controller('cashEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#cashlistindex').addClass("active");

	$scope.cashId = $routeParams.cashId;
  $scope.apiURL = $rootScope.baseURL+'/cash/edit/'+$scope.cashId;
    $("#chm_opening_amount").focus();

  $scope.getCash = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/cash/'+$scope.cashId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(cash)
	    {
	    	cash.forEach(function (value, key) {
            value.old_chm_opening_amount = value.chm_opening_amount;
	      		$scope.cash = value;
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


  $scope.editCash = function () {

  	
	    if($('#chm_opening_amount').val() === undefined || $('#chm_opening_amount').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening cash.</p>',
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
                data: $scope.cash,
                headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(login)
              {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Opening Cash Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/cash'; 
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

});