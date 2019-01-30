// import admin
angular.module('cashtransfer').controller('cashtransferAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

    
  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#cashtransferaddindex').addClass("active");
	$scope.cashtransfer = {};
    $("#pmm_name").focus();


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
    $scope.cashtransfer.ctm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd +" "+strTime;

    
    $('#ctm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 5,
        format: 'yyyy-mm-dd HH:ii P'
      });

	$scope.apiURL = $rootScope.baseURL+'/cashtransfer/add';

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
  
  $scope.addCashtransfer = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#ctm_bkm_id').val() === undefined || $('#ctm_bkm_id').val() === "" || $scope.cashtransfer.ctm_bkm_id.bkm_id == undefined){
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
                          message: '<p class="text-center">Deposit Entry Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
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
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
            	            }, 1500);            
            		    });
		}
	};

});