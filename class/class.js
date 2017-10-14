/** 
 * Class
 *
 * Each object load data only one time, the data source could be given by 
 * options or load from given AJAX URL automatically. You can render multiple 
 * items you designed by different options.
 *
 * @author      Nick Tsai <myintaer@gmail.com>
 */
var Class = function (options) {

  "use strict";
  var self = this;
  // Application Options initialize
  var options = options || {};

  /* 
   * Private Propertites 
   */
  // var privateAttr = 1;

  /* 
   * Public Propertites 
   */
  // publicAttr = options.publicAttr || null;

  /* Constructor */
  var constructor = function(options) {

    self.initialize();
  }
  /* Controller */
  self.initialize = function() {

    // Init actions
  }
  
  // Implement Constructor
  constructor(options);
}
