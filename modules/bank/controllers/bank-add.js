// import admin
angular.module('bank').controller('bankAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {

  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#bankaddindex').addClass("active");
  
    $scope.bank = {};
    $scope.bank.bkm_contact = "N/A";
    $scope.bank.bkm_email = "N/A";
    $scope.bank.bkm_address = "N/A";
    $scope.bank.bkm_state = "N/A";
    $scope.bank.bkm_city = "N/A";
    $scope.bank.bkm_pin = "N/A";
    $scope.bank.bkm_branch = "N/A";
    $scope.bank.bkm_ifsc = "N/A";
    $scope.bank.bkm_default = false;
    $scope.bank.bkm_opening_balance = 0;
    $("#bkm_name").focus();

	$scope.apiURL = $rootScope.baseURL+'/bank/add';
    $scope.addBank = function () {
		var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
      if($('#bkm_name').val() == undefined || $('#bkm_name').val() == ""){
	    	var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_name").focus();
            }, 1500);
	    }
      else if($('#bkm_account_no').val() == undefined || $('#bkm_account_no').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter account no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_account_no").focus();
            }, 1500);
      }
        else if($('#bkm_address').val() == undefined || $('#bkm_address').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter address.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_address").focus();
            }, 1500);
        }
        else if($('#bkm_state').val() == undefined || $('#bkm_state').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter state.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide');
                $("#bkm_state").focus(); 
            }, 1500);
        }
        else if($('#bkm_city').val() == undefined || $('#bkm_city').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter city.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_city").focus();
            }, 1500);
        }
        else if($('#bkm_pin').val() == undefined || $('#bkm_pin').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter pin code.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_pin").focus();
            }, 1500);
        }
      else if($('#bkm_contact').val() == undefined || $('#bkm_contact').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter Mobile no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_contact").focus();
            }, 1500);
      }
        else if($('#bkm_email').val() == undefined || $('#bkm_email').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter email id.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_email").focus();
            }, 1500);
        }
      else if($('#bkm_branch').val() == undefined || $('#bkm_branch').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter bank branch.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_branch").focus();
            }, 1500);
      }
      else if($('#bkm_ifsc').val() == undefined || $('#bkm_ifsc').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter IFSC.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_ifsc").focus();
            }, 1500);
      }
      else if($('#bkm_opening_balance').val() == undefined || $('#bkm_opening_balance').val() == ""){
        var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter opening balance.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $("#bkm_opening_balance").focus();
            }, 1500);
      }
	    else{

            $('#btnsave').attr('disabled','true');
            $('#btnsave').text("please wait...");

            $http({
                method: 'POST',
                url: $rootScope.baseURL+'/bank/checkname',
                data: $scope.bank,
                headers: {'Content-Type': 'application/json',
                        'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
              })
              .success(function(login)
              {
                if(login.length > 0)
                {
                  var dialog = bootbox.dialog({
                  message: '<p class="text-center">Bank Already exists.</p>',
                      closeButton: false
                  });
                  setTimeout(function(){
                  $('#btnsave').text("SAVE");
                  $('#btnsave').removeAttr('disabled');
                      dialog.modal('hide'); 
                      $("#bkm_name").focus();
                  }, 1500);  
                }
                else{

                    $http({
                      method: 'POST',
                      url: $scope.apiURL,
                      data: $scope.bank,
                      headers: {'Content-Type': 'application/json',
                              'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                    })
                    .success(function(login)
                    {

                          if ($scope.bank.bkm_default == true) 
                          {
                            localStorage.setItem('bkm_name', $scope.bank.bkm_name);
                            localStorage.setItem('bkm_branch', $scope.bank.bkm_branch);
                            localStorage.setItem('bkm_account_no', $scope.bank.bkm_account_no);
                            localStorage.setItem('bkm_ifsc', $scope.bank.bkm_ifsc);
                          }
                         var dialog = bootbox.dialog({
                          message: '<p class="text-center">Bank Add Successfully!</p>',
                              closeButton: false
                          });
                          setTimeout(function(){
                            dialog.modal('hide');
                            $('#btnsave').text("Save");
                            $('#btnsave').removeAttr('disabled');
                            $route.reload(); 
                          }, 1000);
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