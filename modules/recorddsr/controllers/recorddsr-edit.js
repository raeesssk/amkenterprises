// import admin
angular.module('recorddsr').controller('recorddsrEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#recorddsrlistindex').addClass("active");
	$scope.empId = $routeParams.empId;
  $scope.apiURL = $rootScope.baseURL+'/recorddsr/edit/'+$scope.empId;

    $('#rdsrm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });

  $scope.getPaymentmode = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/recorddsr/'+$scope.empId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {

            value.rdsrm_date = $filter('date')(value.rdsrm_date, 'yyyy-MM-dd hh:mm a','+0000');
            $scope.recorddsr = value;
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
      $scope.recorddsr.dsr_dip_floor = Math.floor($scope.recorddsr.rdsrm_dip);
      var num = $scope.recorddsr.rdsrm_dip.toString();
      var dec = num.split('.');
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/recorddsr/product/dip',
        data: $scope.recorddsr,
        headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
      })
      .success(function(login)
      {
        login.forEach(function (value, key) {
          if(dec[1] != undefined)
          {
            $scope.recorddsr.rdsrm_stock = Math.round(((dec[1] * 2)* value.dpm_diff)+value.dpm_volume);
          }
          else
          {
            $scope.recorddsr.rdsrm_stock = Math.round(value.dpm_volume);
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


  $scope.editRecorddsr = function () {

  	var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#rdsrm_date').val() === undefined || $('#rdsrm_date').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#rdsrm_date').focus();
            }, 1500);
      }
      else if($('#rdsrm_dip').val() === undefined || $('#rdsrm_dip').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter dip.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#rdsrm_dip').focus();
            }, 1500);
      }
      else if($('#rdsrm_water_dip').val() === undefined || $('#rdsrm_water_dip').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter water dip.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#rdsrm_water_dip').focus();
            }, 1500);
      }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

					    $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.recorddsr,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
					    })
					    .success(function(login)
					    {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">DSR Record Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/recorddsr'; 
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