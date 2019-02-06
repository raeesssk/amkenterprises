// import admin
angular.module('dailyexpense').controller('dailyexpenseEditCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#expenseindex').addClass("active");
  $('#dailyexpenselistindex').addClass("active");
    $scope.emId = $routeParams.emId;
    $('#selectbank').hide();
    
    $('#dateExpense').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true
    });

    $scope.chequeShow = function(){
        if ($scope.expense.em_payment_mode == "Cash") {
            $('#selectbank').hide();
            $scope.expense.em_bkm_id = undefined;
        }
        else{
            $('#selectbank').show();
        }
    }

    $scope.getExpenseList = function() {
        $scope.apiURL = $rootScope.baseURL+'/dailyexpense/'+$scope.emId;
        $http({
          method: 'GET',
          url: $scope.apiURL,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(expense)
        {
            expense.forEach(function (value, key) {
                value.old_em_payment_mode = value.em_payment_mode;
                value.em_date = $filter('date')(value.em_date, 'yyyy-MM-dd');
                value.old_em_amount = value.em_amount;
                if(value.em_payment_mode != "Cash"){

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
                            value.old_em_bkm_id = value1;
                            value.em_bkm = value1;
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

                    $('#selectbank').show();
                }

                $http({
                  method: 'GET',
                  url: $rootScope.baseURL+'/expensetype/'+value.etm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.em_etm = value1;
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
                  url: $rootScope.baseURL+'/shift/'+value.sm_id,
                  //data: $scope.data,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(selectedProductList)
                {
                    selectedProductList.forEach(function(value1, key1) {
                        value.em_sm = value1;
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


                $scope.expense = value;
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
        return $http.post($rootScope.baseURL+'/expensetype/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getSearchBank = function(vals) {

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

    $scope.getSearchShift = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/shift/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.editExpense = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;
        
        if($scope.expense.em_payment_mode == undefined || $scope.expense.em_payment_mode == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select payment mode.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode != "Cash" && ($('#em_bkm_id').val() == undefined || $('#em_bkm_id').val() == "" || $scope.expense.em_bkm.bkm_id == undefined)){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select bank.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_etm_id').val() == undefined || $('#em_etm_id').val() == "" || $scope.expense.em_etm.etm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select type.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#dateExpense').val() == undefined || $('#dateExpense').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_sm_id').val() == undefined || $('#em_sm_id').val() == "" || $scope.expense.em_sm.sm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select shift.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_comment').val() == undefined || $('#em_comment').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter comment or N/A.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#em_amount').val() == undefined || $('#em_amount').val() == "" ){
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
                $scope.expense.em_date = $('#dateExpense').val();

            $scope.apiURL = $rootScope.baseURL+'/dailyexpense/edit/'+$scope.emId;
    	    $http({
    	      method: 'POST',
    	      url: $scope.apiURL,
    	      data: $scope.expense,
    	      headers: {'Content-Type': 'application/json',
                      'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
    	    })
    	    .success(function(login)
    	    {
                var dialog = bootbox.dialog({
                message: '<p class="text-center">Daily Expense Updated Successfully!</p>',
                    closeButton: false
                });
                dialog.find('.modal-body').addClass("btn-success");
                setTimeout(function(){
                    dialog.modal('hide');  
                        $('#btnsave').text("Update");
                        $('#btnsave').removeAttr('disabled');
                        window.location.href = '#/dailyexpense'; 
                }, 1500);  
    	    })
    	    .error(function(data) 
    	    {   
    	      var dialog = bootbox.dialog({
                message: '<p class="text-center">Oops, Something Went Wrong! Please Refresh the Page.</p>',
                    closeButton: false
                });
                setTimeout(function(){
                    $('#btnsave').text("Update");
                    $('#btnsave').removeAttr('disabled');
                    dialog.modal('hide'); 
                }, 1500);            
    	    });
        }
	};

});