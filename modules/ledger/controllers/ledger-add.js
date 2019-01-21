// import admin
angular.module('ledger').controller('ledgerAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route) {


  $('.index').removeClass("active");
  $('#bankindex').addClass("active");
  $('#ledgeraddindex').addClass("active");
  
    $scope.ledger = {};
    $scope.ledger.blm_dr_cr = "Credit";
    $("#bkm_id").focus();


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
    $scope.ledger.blm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd +" "+strTime;

    
    $('#blm_date').datetimepicker({
        autoclose: true,
        todayBtn: true,
        showMeridian: true,
        minuteStep: 1,
        format: 'yyyy-mm-dd HH:ii P'
      });

    // $('#blm_date').datepicker({
    //     validateOnBlur: false,
    //     todayButton: false,
    //     timepicker: false,
    //     scrollInput: false,
    //     format: 'yyyy-mm-ddThh:ii:ssZ',
    //     autoclose: true,
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
    //     onChangeDateTime: function (dp, $input) {
    //         $scope.ledger.blm_date = $('#blm_date').val();
    //     }
    // });

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
        else if($('#bkm_id').val() == undefined || $('#bkm_id').val() == "" || $scope.ledger.blm_bkm_id.bkm_id == undefined){
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
        else if($('#pmm_id').val() == undefined || $('#pmm_id').val() == "" || $scope.ledger.blm_pmm_id.pmm_id == undefined){
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
            $scope.ledger.blm_date = $('#blm_date').val();
            $scope.apiURL = $rootScope.baseURL+'/ledger/add';
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
                  message: '<p class="text-center">Entry Added Successfully.</p>',
                      closeButton: false
                  });
                  dialog.find('.modal-body').addClass("btn-success");
                  setTimeout(function(){
                      dialog.modal('hide'); 
                    $('#btnsave').text("Save");
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
                $('#btnsave').text("Save");
                $('#btnsave').removeAttr('disabled');
                }, 1500);            
    	    });
        }
	};

});