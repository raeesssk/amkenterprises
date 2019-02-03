// import admin
angular.module('recorddsr').controller('recorddsrAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#recorddsraddindex').addClass("active");
	$scope.recorddsr = {};
    $("#pm_id").focus();
    $scope.recorddsr.rdsrm_water_dip = 0;

	$scope.apiURL = $rootScope.baseURL+'/recorddsr/add';




    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.recorddsr.rdsrm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd +" "+strTime;

    
    $('#rdsrm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });

     $scope.getSearchProd = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/product/tank/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getDipChart = function(){
      $scope.recorddsr.dsr_dip_floor = Math.floor($scope.recorddsr.rdsrm_dip);
      var num = $scope.recorddsr.rdsrm_dip.toString();
      var dec = num.split('.');
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dipchart/product/dip',
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

  $scope.addRecorddsr = function () {
	    
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
      else if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.recorddsr.dsr_pm_id.pm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select Product</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#pm_id').focus();
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
      else {
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
                      message: '<p class="text-center">DSR Record Added Successfully.</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-success");
                      setTimeout(function(){
                          dialog.modal('hide');
                        $('#btnsave').text("Save");
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
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
        	            }, 1500);            
        		    });
		}
	};

});