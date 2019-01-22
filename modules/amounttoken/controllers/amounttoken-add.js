// import admin
angular.module('amounttoken').controller('amounttokenAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {

    
  $('.index').removeClass("active");
  $('#assignindex').addClass("active");
  $('#amounttokenaddindex').addClass("active");
	$scope.amounttoken = {};
    $("#emp_id").focus();

	$scope.apiURL = $rootScope.baseURL+'/amounttoken/add';

    $scope.getSerialNo = function() {
        

        $http({
          method: 'GET',
          url: $rootScope.baseURL+'/amounttoken/serial/no',
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
          
            if(orderno.length >0){
                $scope.amounttoken.atm_token = parseInt(parseInt(orderno[0].atm_token)+parseInt(1));                
            }
            else
                $scope.amounttoken.atm_token = 1;
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
    };
    $scope.getSerialNo();

     $scope.getSearchEmp = function(vals) {
      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/employee/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

     $scope.getSearchAssg = function(vals) {
      var searchTerms = {search: vals, emp_id:$scope.amounttoken.atm_emp_id.emp_id};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/assign/employee/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

  $scope.addAmounttoken = function () {
	    
	    var nameRegex = /^\d+$/;
  		var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    
	 
	    if($('#emp_id').val() == undefined || $('#emp_id').val() == "" || $scope.amounttoken.atm_emp_id.emp_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select employee</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#emp_id').focus();
            }, 1500);
        }
	    else if($('#am_id').val() == undefined || $('#am_id').val() == "" || $scope.amounttoken.atm_am_id.am_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select assign no</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#am_id').focus();
            }, 1500);
        }
      else if($('#atm_amount').val() == undefined || $('#atm_amount').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter amount</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
                $('#atm_amount').focus();
            }, 1500);
        }
      else {
                $('#btnsave').attr('disabled','true');
                $('#btnsave').text("please wait...");

        		    $http({
        		      method: 'POST',
        		      url: $scope.apiURL,
        		      data: $scope.amounttoken,
        		      headers: {'Content-Type': 'application/json',
        	                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        		    })
        		    .success(function(login)
        		    {
                    var dialog = bootbox.dialog({
                      message: '<p class="text-center">Amount Token Added Successfully!</p>',
                          closeButton: false
                      });
                      dialog.find('.modal-body').addClass("btn-success");
                      setTimeout(function(){
                          dialog.modal('hide');  
                              $('#btnsave').text("Save");
                              $('#btnsave').removeAttr('disabled');
                              $scope.printDetails(login[0]);
                              window.location.href = '#/amounttoken'; 
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

    $scope.printDetails = function(amountt){
      var popupWin = window.open('', 'winname','directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no');
          
          var printchar = "<html>" +
         " <head>" +
            "<link rel='stylesheet' href='./././resources/customer/bootstrap/css/bootstrap.min.css' />" +
            "<style>.action{display:none;} .print-hide{display:none;}</style>"+
            "   <style type='text/css' media='print'>" +
            "  @page " +
             " {" +
              "    size:  A4 portrait;" +  /* auto is the initial value */
               "   margin: 0; " + /* this affects the margin in the printer settings */
              "}" +

              "html" +
              "{" +
               "   background-color: #FFFFFF;" + 
                "  margin: 0px; " + /* this affects the margin on the html before sending to printer */
              "}" +

              "body" +
              "{" +
                // "font-size:11pt;"+
                "font-family:'Open Sans', sans-serif;"+
               // "   border: solid 1px black ;" +
                // "  margin: 5mm 5mm 5mm 5mm;" + /* margin you want for the content */
              "}" +
              "</style>" +
          "</head>" +
          "<body onload='window.print()' style='width:74mm;height:105mm'>" +
           "<table width='100%' height='100%'>" +
                    "<tr>" +
                      "<td colspan='2' style='text-align:center; padding-bottom: 10px; border-style: solid solid none solid; border-width:1px; font-size:10pt;' width='100%'>" +
                          "<img src='./././resources/indianoil.jpg' class='user-image' alt='User Image' style='margin-left:10px;'><br>"+localStorage.getItem("com_name")+"</h3><br>" +
                          "Dealer : "+localStorage.getItem("com_dealer")+"" +
                          // "Address : "+localStorage.getItem("com_address")+"<br>" +
                          // "E-Mail : "+localStorage.getItem("com_email")+"<br>"+
                          // "Cont. No. : "+localStorage.getItem("com_contact")+"<br>"+
                          // "GST No. : "+localStorage.getItem("com_gst")+"</td>"+
                      "</td>" +
                    "</tr>" +
                    "<tr>"+
                    "<td style='font-size:36pt; border-style: solid solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Token</div><div>"+amountt.atm_token+"</div></td>"+
                    "<td style='font-size:36pt; border-style: solid solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Assign no</div><div>"+$scope.amounttoken.atm_am_id.am_invoice_no+"</div></td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td style='font-size:8pt; border-style: none solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Amount</div><div>"+$filter('number')(amountt.atm_amount,'3')+"</div></td>"+
                    "<td style='font-size:8pt; border-style: none solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Date & Time</div><div>"+$filter('date')(amountt.atm_created_at,'dd-MM-yyyy hh:mm a')+"</div></td>"+
                    "</tr>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    }

});