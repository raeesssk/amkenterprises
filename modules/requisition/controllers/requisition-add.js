// import admin
angular.module('requisition').controller('requisitionAddCtrl', function ($rootScope, $http, $scope, $location, $routeParams, $route, $filter) {


  $('.index').removeClass("active");
  $('#customerindex').addClass("active");
  $('#requisitionaddindex').addClass("active");
  
    $scope.requisition = {};

    $("#cm_id").focus();
    $("#vehicle").hide();
    $("#p_id").hide();

    var d = new Date();
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth()).toString(); // getMonth() is zero-based
    var dd  = d.getDate().toString();
    $scope.requisition.rcm_date = yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd;

    $('#rcm_date').datepicker({
        validateOnBlur: false,
        todayButton: false,
        timepicker: false,
        scrollInput: false,
        format: 'yyyy-m-dd',
        autoclose: true,
        orientation: 'bottom',
        /*minDate: (parseInt(new Date().getFullYear()) - 100) + '/01/01',// minimum date(for today use 0 or -1970/01/01)
        maxDate: (parseInt(new Date().getFullYear()) - 18) + '/01/01',//maximum date calendar*/
        // onSelect: function(dateText, inst) {
            
        //     console.log($scope.requisition.rcm_pm_id);

        // }
        // onChangeDateTime: function (dp, $input) {
        //     console.log($scope.requisition.rcm_pm_id);
        //     $scope.requisition.rcm_date = $('#rcm_date').val();
        //     $scope.requisition.rcm_pm_id = "";
        //     $('#pm_id').val("");
        //     console.log($scope.requisition.rcm_pm_id);
        //     // $('#end-date-picker').val(endDate); 
        //     $scope.getSerialNo();
        // }
    });

    $scope.changeDate = function(){
      if(yyyy +"-"+ (parseInt(mm)+parseInt(1)) +"-"+ dd != $('#rcm_date').val()){
        $('#pm_id').val("");
        $scope.requisition.rcm_pm_id = "";
        $scope.getSerialNo();
      }
      
    }

    $scope.checkBox = function(index){ 

        if($scope.requisition.rcm_check){
            $scope.requisition.rcm_pm_id = undefined;
           $("#pm_id").hide();
            $("#p_id").show();
        }
        else{
            $scope.requisition.rcm_p_id = undefined;
            $("#p_id").hide();
           $("#pm_id").show();
        } 

    };

    $scope.getSerialNo = function() {
        

        $http({
          method: 'POST',
          url: $rootScope.baseURL+'/requisition/serial/no',
          data: $scope.requisition,
          headers: {'Content-Type': 'application/json',
                  'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
        })
        .success(function(orderno)
        {
          
            if(orderno.length >0){
                $scope.requisition.rcm_token = parseInt(parseInt(orderno[0].rcm_token)+parseInt(1));                
            }
            else
                $scope.requisition.rcm_token = 1;
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

    $scope.getSearchVen = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/customer/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.setgetVehicle = function(){
        if($('#cm_id').val() == undefined || $('#cm_id').val() == "" || $scope.requisition.rcm_cm_id.cm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else{
            $("#vehicle").show();
        }
    }

    $scope.getCustVehicle = function(vals) {

      var searchTerms = {search: vals, cm_id:$scope.requisition.rcm_cm_id.cm_id};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/customer/vehicle/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getSearchPro = function(vals) {

      var searchTerms = {search: vals, pdate: $scope.requisition.rcm_date};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/productprice/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

    $scope.getSearch = function(vals) {

      var searchTerms = {search: vals};
        const httpOptions = {
          headers: {
            'Content-Type':  'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")
          }
        };
        return $http.post($rootScope.baseURL+'/product/nottank/typeahead/search', searchTerms, httpOptions).then((result) => {
          
          return result.data;
      });
    };

  $scope.addRequisition = function () {

        var nameRegex = /^\d+$/;
        var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numRegex = /^\d+(\.\d{1,2})?$/;

        if($('#rcm_date').val() == undefined || $('#rcm_date').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select date.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cm_id').val() == undefined || $('#cm_id').val() == "" || $scope.requisition.rcm_cm_id.cm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select customer name.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($('#rcm_bill_no').val() == undefined || $('#rcm_bill_no').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter req. no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        }
        else if($('#cvm_id').val() == undefined || $('#cvm_id').val() == "" || $scope.requisition.rcm_cvm_id.cvm_id == undefined){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select vehicle no.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if(($('#pm_id').val() == undefined || $('#pm_id').val() == "" || $scope.requisition.rcm_pm_id.pm_id == undefined) && ($('#p_id').val() == undefined || $('#p_id').val() == "" || $scope.requisition.rcm_p_id.pm_id == undefined)){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please select product or other product.</p>',
                closeButton: false
            });
            dialog.find('.modal-body').addClass("btn-danger");
            setTimeout(function(){
                dialog.modal('hide'); 
            }, 1500);
        } 
        else if($('#rcm_qty').val() == undefined || $('#rcm_qty').val() == ""){
            var dialog = bootbox.dialog({
            message: '<p class="text-center">please enter quantity.</p>',
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
            $scope.requisition.rcm_date = $('#rcm_date').val();

            if($scope.requisition.rcm_pm_id != undefined)
            {
                $scope.requisition.rcm_pm_id.price = $scope.requisition.rcm_pm_id.prprm_price;
                $scope.requisition.rcm_p = $scope.requisition.rcm_pm_id;
            }
            else
            {
                $scope.requisition.rcm_p_id.price = $scope.requisition.rcm_p_id.pm_sell_price;
                $scope.requisition.rcm_p = $scope.requisition.rcm_p_id;
            }


            $http({
                  method: 'POST',
                  url: $rootScope.baseURL+'/requisition/checkname',
                  data: $scope.requisition,
                  headers: {'Content-Type': 'application/json',
                          'Authorization' :'Bearer '+localStorage.getItem("amkenterprises_admin_access_token")}
                })
                .success(function(orderno)
                {
                    if(orderno.length == 0){
                      $http({
                        method: 'POST',
                        url: $rootScope.baseURL+'/requisition/add',
                        data: $scope.requisition,
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
                                $scope.printDetails();
                                window.location.href = '#/requisition';
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
                              message: '<p class="text-center">Entry Already Exist!</p>',
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

    $scope.printDetails = function(){
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
                    "<td style='font-size:36pt; border-style: solid solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>token</div><div>"+$scope.requisition.rcm_token+"</div></td>"+
                    "<td style='font-size:36pt; border-style: solid solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Req. no.</div><div>"+$scope.requisition.rcm_bill_no+"</div></td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td style='font-size:8pt; border-style: none solid solid solid; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Product</div><div>"+$scope.requisition.rcm_p.pm_name+"</div></td>"+
                    "<td style='font-size:8pt; border-style: none solid solid none; border-width:1px; text-align:center;'><div style='font-size:10pt;'>Quantity</div><div>"+$filter('number')($scope.requisition.rcm_qty,'3')+"</div></td>"+
                    "</tr>"+
          "</table>"+
          "</body>" +
        "</html>";
        popupWin.document.write(printchar);
        popupWin.document.close();
    }

});