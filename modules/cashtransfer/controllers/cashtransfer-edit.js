// import admin
angular.module('cashtransfer').controller('cashtransferEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#cashtransferlistindex').addClass("active");
	$scope.empId = $routeParams.empId;
  $scope.apiURL = $rootScope.baseURL+'/cashtransfer/edit/'+$scope.empId;

    $('#ctm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });

  $scope.getCashtransfer = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/cashtransfer/'+$scope.empId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {

	      		value.ctm_date = $filter('date')(value.ctm_date, 'yyyy-MM-dd hh:mm a','+0000');
            value.old_ctm_amount = value.ctm_amount;

            $http({
              method: 'GET',
              url: $rootScope.baseURL+'/bank/'+value.bkm_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            })
            .success(function(bank)
            {
              bank.forEach(function (value1, key1) {
                value.ctm_bkm = value1;
                value.old_ctm_bkm_id = value1;
              });

              $scope.cashtransfer = value;
                  
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


  $scope.editCashtransfer = function () {

  	var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#ctm_bkm_id').val() === undefined || $('#ctm_bkm_id').val() === "" || $scope.cashtransfer.ctm_bkm.bkm_id == undefined){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please select bank.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
      }
      else if($('#ctm_amount').val() == undefined || $('#ctm_amount').val() == ""){
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
					      data: $scope.cashtransfer,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
					    })
					    .success(function(login)
					    {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Deposit Entry Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/cashtransfer'; 
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