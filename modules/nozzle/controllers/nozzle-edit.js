// import admin
angular.module('nozzle').controller('nozzleEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#nozzlelistindex').addClass("active");
	$scope.empId = $routeParams.empId;
  $scope.apiURL = $rootScope.baseURL+'/nozzle/edit/'+$scope.empId;

  $scope.getPaymentmode = function () {
	     $http({
	      method: 'GET',
	      url: $rootScope.baseURL+'/nozzle/'+$scope.empId,
	      headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
	    })
	    .success(function(customerObj)
	    {
	    	customerObj.forEach(function (value, key) {

            $http({
              method: 'GET',
              url: $rootScope.baseURL+'/product/'+value.pm_id,
              //data: $scope.data,
              headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            })
            .success(function(selectedProductList)
            {
                selectedProductList.forEach(function(value1, key1) {
                    value.nm_pm = value1;
                });
            })
            .error(function(data) 
            {   
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong!</p>',
                    closeButton: false
                });
                setTimeout(function(){
                    dialog.modal('hide');  
                    //$scope.vendor = null;
                }, 1500);
            });

	      		$scope.nozzle = value;


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
//end type a head

  $scope.setProductData = function() {

      $scope.nozzle.nm_price = $scope.nozzle.nm_pm.pm_price;
  }


  $scope.editNozzle = function () {

  	var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#nm_name').val() === undefined || $('#nm_name').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#nm_name').focus();
            }, 1500);
      }
      else if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.nozzle.nm_pm.pm_id == undefined){
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
      // else if($('#nm_price').val() === undefined || $('#nm_price').val() === ""){
      //   var dialog = bootbox.dialog({
      //       message: '<p class="text-center">please enter price.</p>',
      //           closeButton: false
      //       });
      //       dialog.find('.modal-body').addClass("btn-danger");
      //       setTimeout(function(){
      //           dialog.modal('hide'); 
      //           $('#nm_price').focus();
      //       }, 1500);
      // }
	    else{
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");
	    	
	    	$http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/nozzle/checkname',
                  data: $scope.nozzle,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 1 && $scope.empId != orderno[0].pmm_id){
                         var dialog = bootbox.dialog({
                                message: '<p class="text-center">Nozzle Already Exits!</p>',
                                    closeButton: false
                                });
                                dialog.find('.modal-body').addClass("btn-warning");
                                setTimeout(function(){
                                    dialog.modal('hide'); 
                              $('#btnsave').text("Update");
                              $('#btnsave').removeAttr('disabled');
                                }, 1500);

                      }
                    else
                      {
					    $http({
					      method: 'POST',
					      url: $scope.apiURL,
					      data: $scope.nozzle,
					      headers: {'Content-Type': 'application/json',
				                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
					    })
					    .success(function(login)
					    {
                  var dialog = bootbox.dialog({
                    message: '<p class="text-center">Nozzle Updated Successfully.</p>',
                        closeButton: false
                    });
                    dialog.find('.modal-body').addClass("btn-success");
                    setTimeout(function(){
                        dialog.modal('hide');
                      $('#btnsave').text("Update");
                      $('#btnsave').removeAttr('disabled');
                      window.location.href = '#/nozzle'; 
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
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                    }, 1500);
                });
		}
	};

});