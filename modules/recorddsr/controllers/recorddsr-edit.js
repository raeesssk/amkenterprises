// import admin
angular.module('recorddsr').controller('recorddsrEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#recorddsrlistindex').addClass("active");
	$scope.empId = $routeParams.empId;
  $scope.apiURL = $rootScope.baseURL+'/dsr/edit/'+$scope.empId;

  $scope.getPaymentmode = function () {
    $scope.nozzleList = [];
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/dsr/'+$scope.empId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {
            value.dsr_date = $filter('date')(value.dsr_date, 'yyyy-MM-dd')

            $http({
              method: 'GET',
              url: $rootScope.baseURL+'/dsr/details/'+value.dsr_id,
              headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            })
            .success(function(Obj)
            {
                Obj.forEach(function (value, key) {
                  value.opening_meter = value.dsrnm_opening_meter;
                  value.diif_meter = parseFloat(value.dsrnm_opening_meter - value.dsrnm_diff).toFixed(3);
                    $scope.nozzleList.push(value);
                });

                $scope.dsr = value;
                  
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

    $scope.getDipChart = function(){
      $scope.dsr.dsr_dip_floor = Math.floor($scope.dsr.dsr_dip);
      var num = $scope.dsr.dsr_dip.toString();
      var dec = num.split('.');
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dsr/product/dip',
        data: $scope.dsr,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(login)
      {
        login.forEach(function (value, key) {
          if(dec[1] != undefined)
          {
            $scope.dsr.dsr_opening_stock = Math.round(((dec[1] * 2)* value.dpm_diff)+value.dpm_volume);
          }
          else
          {
            $scope.dsr.dsr_opening_stock = Math.round(value.dpm_volume);
          }
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
    }


  $scope.editDsr = function () {

  	var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#dsr_dip').val() === undefined || $('#dsr_dip').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter dip.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#dpm_volume').focus();
            }, 1500);
      }
      else if($('#dsr_water_dip').val() === undefined || $('#dsr_water_dip').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter water dip.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#dsr_water_dip').focus();
            }, 1500);
      }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

	    	        $scope.obj = {
                    purchaseSingleData : $scope.dsr,
                    purchaseMultipleData : $scope.nozzleList
                };
					    $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.obj,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
					    })
					    .success(function(login)
					    {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">DSR Entry Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/dsr'; 
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