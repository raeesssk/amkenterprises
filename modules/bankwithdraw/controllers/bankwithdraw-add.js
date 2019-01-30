// import admin
angular.module('bankwithdraw').controller('bankwithdrawAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#bankwithdrawaddindex').addClass("active");
	$scope.bankwithdraw = {};
    $("#bwm_bkm_id").focus();

	$scope.apiURL = $rootScope.baseURL+'/bankwithdraw/add';


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
    $scope.bankwithdraw.bwm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd +" "+strTime;

    
    $('#bwm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });


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

  $scope.addBankwithdraw = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#bwm_bkm_id').val() === undefined || $('#bwm_bkm_id').val() === "" || $scope.bankwithdraw.bwm_bkm_id.bkm_id == undefined){
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
                          message: '<p class="text-center">Withdraw Entry Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
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
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
            	            }, 1500);            
            		    });
		}
	};

});