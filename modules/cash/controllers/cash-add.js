// import admin
angular.module('cash').controller('cashAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#cashlistindex').addClass("active");

	$scope.cash = {};

    $("#chm_amount").focus();

	$scope.apiURL = $rootScope.baseURL+'/cash/add';
  $scope.addCash = function () {
	    
	 
	    if($('#chm_amount').val() === undefined || $('#chm_amount').val() === ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount.</p>',
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
                      data: $scope.cash,
                      headers: {'Content-Type': 'application/json',
                                'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                    })
                    .success(function(login)
                    {
                        var dialog = bootbox.dialog({
                          message: '<p class="text-center">Cash Added Successfully.</p>',
                              closeButton: false
                          });
                          dialog.find('.modal-body').addClass("btn-success");
                          setTimeout(function(){
                              dialog.modal('hide');
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            window.location.href = '#/cash'; 
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