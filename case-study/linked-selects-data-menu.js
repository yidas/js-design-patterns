/** 
 * Organiztion Three Layer Menu
 *
 * Each object load tree data only one time, the data source could be given by 
 * options or load from given AJAX URL automatically. You can render multiple 
 * menu groups by different options.
 *
 * Author    Nick Tsai <myintaer@gmail.com>
 * Version   1.0.0
 */
var Organiztion3LayerMenu = function (options) {
  
  "use strict";
  var self = this;
  // Application Options initialize
  var options = options || {};

  /* 
   * Private Propertites 
   */
  // Flag for loadData()
  var isLoading = false;

  /* 
   * Public Propertites 
   */
  // Tree data
  self.treeData = options.treeData || null;
  // AJAX URL for loadData()
  self.ajaxUrl = options.ajaxUrl || '/shared/org3layermenu_ajax';


  /* Constructor */
  var constructor = function(options) {

    self.initialize();
  }
  /* Controller */
  self.initialize = function() {

    loadData();
  }

  /* Load data with callback function */
  self.afterLoadData = function (callback) {

    // Initialize arguments
    callback = (typeof callback === "function") ? callback : function(){};

    if (isLoaded()) {

      callback();

    } else {

      loadData(callback);
    }
  }

  /* Render */
  self.render = function (options) {

    // Load data if no data 
    if (!isLoaded()) {

      // loadData(this.render, options);
      loadData(function() {
        self.render(options)
      });
      
      return;
    }

    /* Options */
    var o = options || {};
    var $company = o.$selectCompany || $(o.elSelectCompany) || null;
    var $dept = o.$selectDept || $(o.elSelectDept) || null;
    var $user = o.$selectUser || $(o.elSelectUser) || null;
    var CompanyVal = o.valCompany || 0;
    var DeptVal = o.valDept || 0;
    var UserVal = o.valUser || 0;

    if ($company===null || $dept===null || $user===null) {

      console.log($company);
      console.log($dept);
      console.log($user);
      return false;
    }

    /* Company */

    $company.find("option").remove();

    $.each(self.treeData, function( key, company ) {

        $company.append($("<option></option>")
          .attr("value", key)
          .text(company.title));
    });

    /* Company select listener */
    $company.change(function() {
      
      var companyKey = $(this).find(":selected").val();

      changeDept($dept, companyKey);
    });  

    /* Dept select listener */
    $dept.change(function() {

      var $option = $(this).find(":selected");

      var companyKey = $option.attr("data-company-key");
      
      var deptKey = $option.val();

      changeUser($user, companyKey, deptKey);
    });  

    // Initialize 3 Layer Menu
    $company.change();

    /* Exsitant data auto select options */
    if (CompanyVal) {

      $company.val(CompanyVal).change();
    }
    if (DeptVal) {

      $dept.val(DeptVal).change();
    }
    if (UserVal) {

      $user.val(UserVal).change();
    }
  }

  /* Load TreeData from AJAX */
  var loadData = function (callback) {

    // Initialize arguments
    callback = (typeof callback === "function") ? callback : function(){};

    // Check if is loading
    if (isLoading) {

      // Retry later
      setTimeout(function(){

      	if (isLoaded()) {
      		callback();
      	} else {
      		loadData(callback);
      	}
        
      }, 100);

      return;
    }

    isLoading = true;
    
    // Load data by AJAX
    $.get( self.ajaxUrl, function(data) {

      self.treeData = data.company_list;

      isLoading = false;

        callback();
    });
  }

  /* Determination of is loadedData */
  var isLoaded = function () {
    
    return (self.treeData!==null) ? true : false;
  }

  /* Build Dept select options */
  var changeDept = function ($dept, companyKey) {
    
    var deptList = self.treeData[companyKey].dept_list || {};

    $dept.find("option").remove();

    $.each(deptList, function( key, dept ) {
      
      $dept.append($("<option></option>")
        .attr("value", key)
        .attr("data-company-key", companyKey)
        .text(dept.title)); 
    });

    // Trigger cahnge
    $dept.change();
  }

  /* Build User select options */
  var changeUser = function ($user, companyKey, deptKey) {
    
    var userList = self.treeData[companyKey].dept_list[deptKey].user_list || {};

    $user.find("option").remove();

    // for (var key of userList) {
    
    //   $user.append($("<option></option>").attr("value", key).text(userList[key].title)); 
    // }

    $.each(userList, function( key, user ) {

      $user.append($("<option></option>")
        .attr("value", user.sn)
        .attr("data-ud_sn", user.ud_sn)
        .text(user.title)); 
    });
  }

  // Implement Constructor
  constructor(options);
}
