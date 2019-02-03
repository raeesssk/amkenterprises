// import admin
angular.module('nozzle').controller('nozzleAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#nozzleaddindex').addClass("active");
	$scope.nozzle = {};
    $("#nm_name").focus();

	$scope.apiURL = $rootScope.baseURL+'/nozzle/add';

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

        $scope.nozzle.nm_price = $scope.nozzle.nm_pm_id.pm_price;
    }

  $scope.addNozzle = function () {
	    
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
      else if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.nozzle.nm_pm_id.pm_id == undefined){
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
     //    var dialog = bootbox.dialog({
     //        message: '<p class="text-center">please enter price.</p>',
     //            closeButton: false
     //        });
     //        dialog.find('.modal-body').addClass("btn-danger");
     //        setTimeout(function(){
     //            dialog.modal('hide'); 
     //            $('#nm_price').focus();
     //        }, 1500);
     //  }
      else {
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
                    if(orderno.length == 0){
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
                          message: '<p class="text-center">Nozzle Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
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
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
            	            }, 1500);            
            		    });
                    }
                    else{
                        var dialog = bootbox.dialog({
                              message: '<p class="text-center">Nozzle Already Exist!</p>',
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