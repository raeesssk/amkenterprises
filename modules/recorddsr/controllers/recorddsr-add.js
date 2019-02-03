// import admin
angular.module('recorddsr').controller('recorddsrAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#recorddsraddindex').addClass("active");
	$scope.dsr = {};
    $("#pm_id").focus();
    $scope.dsr.dsr_water_dip = 0;

	$scope.apiURL = $rootScope.baseURL+'/dsr/add';



    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.dsr.dsr_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#dsr_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-m-dd',
        autoclose: true,
        orientation: 'bottom'
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

    $scope.setProductData = function() {
      $scope.nozzleList = [];
        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/nozzle/product/list/'+$scope.dsr.dsr_pm_id.pm_id,
          headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(login)
        {
          login.forEach(function (value, key) {
            value.closing_meter = value.nm_closing_meter;
            $scope.nozzleList.push(value);
          
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

    $scope.getDipChart = function(){
      $scope.dsr.dsr_dip_floor = Math.floor($scope.dsr.dsr_dip);
      var num = $scope.dsr.dsr_dip.toString();
      var dec = num.split('.');
      $http({
        method: 'POST',
        url: $rootScope.baseURL+'/dipchart/product/dip',
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

  $scope.addDsr = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#dsr_date').val() === undefined || $('#dsr_date').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#dsr_date').focus();
            }, 1500);
      }
      else if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.dsr.dsr_pm_id.pm_id == undefined){
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
	    else if($('#dsr_dip').val() === undefined || $('#dsr_dip').val() === ""){
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
      else {
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $scope.obj = {
                    purchaseSingleData : $scope.dsr,
                    purchaseMultipleData : $scope.nozzleList
                };

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/dsr/checkname',
                  data: $scope.dsr,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
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
                          message: '<p class="text-center">DSR Entry Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
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
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
            	            }, 1500);            
            		    });
                    }
                    else{
                        var dialog = bootbox.dialog({
                              message: '<p class="text-center">DSR Entry Already Exist!</p>',
                                  closeButton: false
                              });
                              dialog.find('.modal-body').addClass("btn-warning");
                              setTimeout(function(){
                                  dialog.modal('hide');  
                                  $('#btnsave').text("Save");
                                  $('#btnsave').removeAttr('disabled');
                              }, 1500);
                    }
                })
                .error(function(data) 
                {   
                    var dialog = bootbox.dialog({
                    message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-danger");
                    setTimeout(function(){
                        dialog.modal('hide');  
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                    }, 1500);
                });
		}
	};

});