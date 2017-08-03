$(document).ready(function() {

    ControllerNameApp.run();
});

/** 
 * @author      Nick Tsai <myintaer@gmail.com>
 * @filesource  jQuery
 */
var ControllerNameApp = new function() {

    "user strict";

    var self = this;

    // Flag for add or edit
    self.editSN = 0;

    var __construct = function() {

    };

    // Run the App
    self.run = function() {

        // Register events
        listeners();

        // Load Data Table
        loadData();

        // Initialize a select
        $('select[name=select]').change();
    }

    var listeners = function() {

        $('input[name=status]').change(function() {

            // code..
        });
    };

    var loadData = function() {

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

        }, 'json')
            .error(function(xhr, ajaxOptions, thrownError) {

                console.log(thrownError)
            });
    };

    __construct();
};