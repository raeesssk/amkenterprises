// import admin
angular.module('bankwithdraw').controller('bankwithdrawEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route,$filter) {

    
  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#bankwithdrawlistindex').addClass("active");
	$scope.empId = $routeParams.empId;
  $scope.apiURL = $rootScope.baseURL+'/bankwithdraw/edit/'+$scope.empId;

    
    $('#bwm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });

  $scope.getBankwithdraw = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/bankwithdraw/'+$scope.empId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {

            value.bwm_date = $filter('date')(value.bwm_date, 'yyyy-MM-dd hh:mm a','+0000');
            value.old_bwm_amount = value.bwm_amount;

            $http({
              method: 'GET',
              url: $rootScope.baseURL+'/bank/'+value.bkm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            })
            .success(function(bank)
            {
              bank.forEach(function (value1, key1) {
                value.bwm_bkm = value1;
                value.old_bwm_bkm_id = value1;
              });

              $scope.bankwithdraw = value;
                  
            })
            .error(function(data) 
            {   
              var dialog = bootbox.dialog({
                  message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                      closeButton: false
                  });
                  setTimeout(function(){
                      dialog.modal('hide'); 
                  }, 3001);            
            });

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

    $scope.getSearch = function(vals) {

      var searchTerms = {search: vals};
      

        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/bank/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
  };


  $scope.editBankwithdraw = function () {

  	var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#bwm_bkm_id').val() === undefined || $('#bwm_bkm_id').val() === "" || $scope.bankwithdraw.bwm_bkm.bkm_id == undefined){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please select bank.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#bwm_amount').val() == undefined || $('#bwm_amount').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter cash amount.</p>',
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
					      data: $scope.bankwithdraw,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
					    })
					    .success(function(login)
					    {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Withdraw Entry Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/bankwithdraw'; 
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