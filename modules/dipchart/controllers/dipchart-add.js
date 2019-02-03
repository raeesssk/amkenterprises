// import admin
angular.module('dipchart').controller('dipchartAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#nozzleindex').addClass("active");
  $('#dipchartaddindex').addClass("active");
	$scope.dipchart = {};
    $("#pm_id").focus();

	$scope.apiURL = $rootScope.baseURL+'/dipchart/add';

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

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/dipchart/serial/no/'+$scope.dipchart.dpm_pm_id.pm_id,
          headers: {'Content-Type': 'application/json',
                    'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(login)
        {
          if(login.length >0){
                $scope.dipchart.dpm_dip = parseInt(parseInt(login[0].dpm_dip)+parseInt(1));                
            }
            else
                $scope.dipchart.dpm_dip = 1;
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

  $scope.addDipchart = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.dipchart.dpm_pm_id.pm_id == undefined){
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
	    else if($('#dpm_volume').val() === undefined || $('#dpm_volume').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter volume.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#dpm_volume').focus();
            }, 1500);
      }
      else if($('#dpm_diff').val() === undefined || $('#dpm_diff').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter diff.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#dpm_diff').focus();
            }, 1500);
      }
      else {
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

                $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/dipchart/checkname',
                  data: $scope.dipchart,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
            		    $http({
            		      method: 'POST',
            		      url: $scope.apiURL,
            		      data: $scope.dipchart,
            		      headers: {'Content-Type': 'application/json',
            	                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
            		    })
            		    .success(function(login)
            		    {

                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">Dipchart Entry Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            window.location.href = '#/dipchart'; 
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
                              message: '<p class="text-center">Dipchart Entry Already Exist!</p>',
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