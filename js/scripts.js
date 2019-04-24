jQuery(function ($) {

    'use strict';

    // -------------------------------------------------------------
    // Countdown
    // -------------------------------------------------------------
    (function () {

        $("#back-countdiown").countdown({
            date: "15 may 2019 00:00:00",
            format: "on"
        });
    
    }()); 


}); // JQuery end


$(document).on('click', '.m-menu .dropdown-menu', function(e) {
  e.stopPropagation()
})
