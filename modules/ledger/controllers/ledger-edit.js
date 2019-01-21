// import admin
angular.module('ledger').controller('ledgerEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#ledgerlistindex').addClass("active");
  

    $scope.emId = $routeParams.emId;

    $('#blm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 1,
        format: 'yyyy-mm-dd HH:ii P'
      });

    $scope.getLedger = function() {
        $scope.apiURL = $rootScope.baseURL+'/ledger/'+$scope.emId;
        $http({
          method: 'GET',
          url: $scope.apiURL,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(expense)
        {
            expense.forEach(function (value, key) {
                value.blm_date = $filter('date')(value.blm_date, "medium");
                value.old_blm_amount = value.blm_amount;
                value.old_blm_dr_cr = value.blm_dr_cr;

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/bank/'+value.bkm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.old_blm_bkm_id = value1;
                        value.blm_bkm = value1;
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
                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/paymentmode/'+value.pmm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.old_blm_pmm_id = value1;
                        value.blm_pmm = value1;
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
                $scope.ledger = value;
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
    $scope.getLedger();

    $scope.getSearchBkm = function(vals) {

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

    $scope.getSearchPay = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/paymentmode/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.addLedger = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        if($('#blm_date').val() == undefined || $('#blm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#bkm_id').val() == undefined || $('#bkm_id').val() == "" || $scope.ledger.blm_bkm.bkm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select bank.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($scope.ledger.blm_dr_cr == undefined || $scope.ledger.blm_dr_cr == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select debit/credit.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#pmm_id').val() == undefined || $('#pmm_id').val() == "" || $scope.ledger.blm_pmm.pmm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select payment mode.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($('#blm_amount').val() == undefined || $('#blm_amount').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#blm_comment').val() == undefined || $('#blm_comment').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter comment or N/A.</p>',
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
    	    
            $scope.apiURL = $rootScope.baseURL+'/ledger/edit/'+$scope.emId;
    	    $http({
    	      method: 'POST',
    	      url: $scope.apiURL,
    	      data: $scope.ledger,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
    	    })
    	    .success(function(login)
    	    {
                var dialog = bootbox.dialog({
                  message: '<p class="text-center">Entry Updated Successfully.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                    window.location.href = '#/ledger';
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