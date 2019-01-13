$(function () {
    $("#navbarToggle").blur(function(event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768)
        {
            $("#collapsable-nav").collapse('hide');

        }
    });
});

/* To load homepage */
(function (global) {

    var dc = {};

    var homeHtml = "snippets/home-snip.html";

// Convenience function for inserting innerHTML for 'select'
    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

// Show loading icon inside element identified by 'selector'.
    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='pictures/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

// On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
        showLoading("#maincontent");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#maincontent")
                    .innerHTML = responseText;
            },
            false);
    });


    global.$dc = dc;

})(window);
