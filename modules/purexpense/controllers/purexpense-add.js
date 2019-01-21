// import admin
angular.module('purexpense').controller('purexpenseAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#vendorindex').addClass("active");
  $('#purexpenseaddindex').addClass("active");
  
    $scope.expense = {};
    $scope.expense.em_comment = "N/A";
    $scope.expense.em_payment_mode = "Cash";
    $('#cheq').hide();
    $("#vm_id").focus();


    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.expense.em_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#dateExpense').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        orientation: 'bottom',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.expense.em_date = $('#dateExpense').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $('#em_cheque_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-mm-dd',
        autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        onChangeDateTime: function (dp, $input) {
            $scope.expense.em_cheque_date = $('#em_cheque_date').val();
            // $('#end-date-picker').val(endDate); 
        }
    });

    $scope.getSearchVen = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/vendor/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.chequeShow = function(){
        if ($scope.expense.em_payment_mode == "Cheque") {
            $('#cheq').show();
        }
        else{
            $('#cheq').hide();
        }
    }

  $scope.addExpense = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#vm_id').val() == undefined || $('#vm_id').val() == "" || $scope.expense.expensess.vm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select name.</p>',
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
        else if($('#em_amount').val() == undefined || $('#em_amount').val() == "" || !numRegex.test($('#em_amount').val())){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode == undefined || $scope.expense.em_payment_mode == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select payment mode.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode === "Cheque" && ($('#em_cheque_no').val() == undefined || $('#em_cheque_no').val() == "" || $('#em_cheque_no').val().length < 6 || !nameRegex.test($('#em_cheque_no').val()))){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter a valid cheque no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($scope.expense.em_payment_mode === "Cheque" && ($('#em_cheque_date').val() == undefined || $('#em_cheque_date').val() == "")){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select cheque date.</p>',
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
            $scope.apiURL = $rootScope.baseURL+'/purexpense/add';
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
                  message: '<p class="text-center">Entry Added Successfully.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                        $('#btnsave').text("Save");
                        $('#btnsave').removeAttr('disabled');
                       window.location.href = '#/purexpense'; 
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