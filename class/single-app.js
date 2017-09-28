/** 
 * @author      Nick Tsai <myintaer@gmail.com>
 * @filesource  jQuery
 * @see         https://github.com/yidas/js-design-patterns
 */
(function ($) {

  // Bootstrap
  $(document).ready(function() {

    new App;
  });

  /** 
   * Single Page Application
   */
  var App = function(options) {

    "use strict";
    var self = this;
    // Application Options initialize
    var options = options || {};
    // Application element
    var el = options.el || options.element || '#content';

    /** 
     * Application Variables Declaration
     */
    var editSN = 0;

    /* Constructor */
    var constructor = function(options) {

      self.events(el);
      self.initialize();
    }

    /* Application Controller */
    self.initialize = function() {

      // Load Data Table
      self.loadData();

      // Initialize a select
      $('select[name=select]').change();
    }

    /* Application Events */
    self.events = function(el) {
        
      // Use jQuery selector
      var $el = $(el);

      $el.find('.btn-load').change(self.loadData());

      $el.find('input[name=status]').change(function() {

        // code..
      });
    };

    // Public function
    self.loadData = function() {

      // Catch outer variable example
      var url = viewData.ajaxUrl.index;

      // Get data by AJAX
      $.get(url, function(res) {

        if (res.code==200 && res.data) {

          // Render
          $.each(res.data, function(key, row) {

            // render table code..
            var $table = $('<table></table>');
          });
        } 

        // Call events after if needed
        eventsAfterLoadData($table);

      }, 'json')
        .error(function(xhr, ajaxOptions, thrownError) {

          console.log(thrownError)
        });
    };
    
    /* Application Behavior Events */
    var eventsAfterLoadData = function($table) {

      $table.find('td').click(function() {
        // Code...
      });
    };

    // Implement Constructor
    constructor(options);
  };

})(jQuery);
