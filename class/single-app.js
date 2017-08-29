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
    var App = function() {

        "user strict";
        var self = this;

        // Private variable
        var editSN = 0;

        var __construct = function() {

            // Register events
            initEvents();

            // Load Data Table
            self.loadData();

            // Initialize a select
            $('select[name=select]').change();
        };

        var initEvents = function() {

            $('.btn-load').change(self.loadData());

            $('input[name=status]').change(function() {

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
                    });
                } 

                // Call events after if needed

            }, 'json')
                .error(function(xhr, ajaxOptions, thrownError) {

                    console.log(thrownError)
                });
        };

        __construct();
    };

})(jQuery);