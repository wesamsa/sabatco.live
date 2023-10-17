"use strict";

//var scrollTo = function (sectionEl = "", callback = function () { }) {
//    $("html, body").animate(
//        {
//            scrollTop: sectionEl ? calculateOffset(sectionEl) : 0,
//        },
//        800,
//        "swing",
//        callback()
//    );
//};

var calculateOffset = function (el) {
    if ($(el).length == 0) return;
    if ($(window).width() >= 980) return Math.floor($(el).offset().top - 69);
    return Math.floor($(el).offset().top);
};

// on ready state
$(function () {
    // breakpoint and up
    $(window).resize(function () {
        if ($(window).width() >= 980) {
            // when you hover a toggle show its dropdown menu
            $(".navbar .dropdown-toggle").hover(function () {
                $(this).parent().toggleClass("show");
                $(this).parent().find(".dropdown-menu").toggleClass("show");
            });

            // hide the menu when the mouse leaves the dropdown
            $(".navbar .dropdown-menu").mouseleave(function () {
                $(this).removeClass("show");
            });

            // do something here
        }
    });
    $(document).scroll(function () {
        var scroll = $(this).scrollTop();
        var navbar = $(".main-navbar");
        var scrollUpBtn = $(".scroll-up");
        if (scroll > 0) {
            scrollUpBtn.fadeIn();
        } else {
            scrollUpBtn.fadeOut();
        }
        if ($(window).width() >= 992) {
            if (scroll > 140) {
                if (!navbar.hasClass("fixed")) {
                    $("body").css({ "padding-top": navbar.height() + "px" });
                    navbar.addClass("fixed");
                }
            } else {
                navbar.removeClass("fixed");
                $("body").css({ "padding-top": "0px" });
            }
        }
        if (scroll == 0) {
            $("ul.navigator li").removeClass("active");
            $("#navIntro").addClass("active");
        } else $("#navIntro").removeClass("active");

        if (scroll >= calculateOffset(".in-focus") - 400) {
            $("ul.navigator li").removeClass("active");
            $("#navFocus").addClass("active");
        } else $("#navFocus").removeClass("active");

        if (scroll >= calculateOffset(".latest-news") - 400) {
            $("ul.navigator li").removeClass("active");
            $("#navNews").addClass("active");
        } else $("#navNews").removeClass("active");
        if (scroll >= calculateOffset(".upcoming-events") - 500) {
            $("ul.navigator li").removeClass("active");
            $("#navEvents").addClass("active");
        } else $("#navEvents").removeClass("active");
        if (scroll >= calculateOffset(".publications") - 500) {
            $("ul.navigator li").removeClass("active");
            $("#navPublications").addClass("active");
        } else $("#navPublications").removeClass("active");
        if (
            scroll >= calculateOffset(".our-group") - 600 ||
            $(window).scrollTop() + $(window).height() == $(document).height()
        ) {
            $("ul.navigator li").removeClass("active");
            $("#navISDB").addClass("active");
        } else $("#navISDB").removeClass("active");
    });


    $(".search-toggle").on("click", function (e) {
        // $(".search-box").toggle();
        //show search action

        $(".search-box").fadeToggle("fast", function () {
            $(".search-box input").focus();
            // Animation complete.

        });

        $(document).click(function (e) {
            if (!$(e.target).is('.searchbox, .searchbox *')) {
                $(".searchbox").hide();
                //$(".search-input").val("");
            }
        });
        $('.closeSearch').click(function (e) {
            $(".searchbox").hide();
            $(".search-input").val("");
        });

        $(".search-box").toggleClass("open-search");

        $("body").toggleClass("header-popup-open");
        e.stopPropagation();


    });



    $(document).click(function (e) {
        if (!$(e.target).is('.search-box input, .search-toggle*')) {
            $(".search-box").hide();
            $("body").removeClass("header-popup-open");
            //console.log("hhhhhhhhhhh");
            $(".search-box").toggleClass("open-search");
            $(".search-box input").val("");



            $(".html5-video-player").contents().find(".ytp-pause-overlay").remove();
        }
    });





    $(".scroll-down").on("click", function () {
        scrollTo(".in-focus");
    });
    $(".scroll-up").on("click", function () {
        scrollTo();
    });
    $("#navIntro a").on("click", function () {
        scrollTo(false, function () {
            $("ul.navigator li").removeClass("active");
            $("#navIntro").addClass("active");
        });
    });
    $("#navFocus a").on("click", function () {
        scrollTo(".in-focus", function () {
            $("ul.navigator li").removeClass("active");
            $("#navFocus").addClass("active");
        });
    });
    $("#navNews a").on("click", function () {
        scrollTo(".latest-news", function () {
            $("ul.navigator li").removeClass("active");
            $("#navNews").addClass("active");
        });
    });
    $("#navEvents a").on("click", function () {
        scrollTo(".upcoming-events", function () {
            $("ul.navigator li").removeClass("active");
            $("#navEvents").addClass("active");
        });
    });
    $("#navPublications a").on("click", function () {
        scrollTo(".publications", function () {
            $("ul.navigator li").removeClass("active");
            $("#navPublications").addClass("active");
        });
    });
    $("#navISDB a").on("click", function () {
        scrollTo(".our-group", function () {
            $("ul.navigator li").removeClass("active");
            $("#navISDB").addClass("active");
        });
    });
    $("#trade-expand").on("click", function () {
        var tradeC = $("#trade-content");
        var tradeScrollH = document.getElementById("trade-content");
        tradeC.css("max-height", tradeScrollH.scrollHeight);
        tradeC.removeClass("collapsed");
    });
    $("#trade-collapse").on("click", function () {
        var tradeC = $("#trade-content");
        tradeC.addClass("collapsed");
        tradeC.removeAttr("style");
    });
});

// mmousa

// font increase & decrease
$("#font-increase").click(function () {
    //console.log("+");
    if ($("html").hasClass("Xlarge-font-size")) {
        $("html").removeClass("Xlarge-font-size").addClass("XXlarge-font-size");
    }
    if ($("html").hasClass("large-font-size")) {
        $("html").removeClass("large-font-size").addClass("Xlarge-font-size");
    }
    if ($("html").hasClass("reg-font-size")) {
        $("html").removeClass("reg-font-size").addClass("large-font-size");
    }
});
$("#font-decrease").click(function () {
    //console.log("-");
    if ($("html").hasClass("large-font-size")) {
        $("html").removeClass("large-font-size").addClass("reg-font-size");
    }
    if ($("html").hasClass("Xlarge-font-size")) {
        $("html").removeClass("Xlarge-font-size").addClass("large-font-size");
    }
    if ($("html").hasClass("XXlarge-font-size")) {
        $("html").removeClass("XXlarge-font-size").addClass("Xlarge-font-size");
    }
});

// $('#datepicker').datepicker({
//     weekStart: 6,
//     // daysOfWeekHighlighted: "6,0",
//     autoclose: true,
//     todayHighlight: true,
// });
// // $('#datepicker').datepicker("setDate", new Date());

// grid vs list VIEW

// List View
function listView() {
    if ($("#gridVSlist").hasClass("grid-show")) {
        $("#gridVSlist").removeClass("grid-show").addClass("list-show");
        $(".gridShow").removeClass("active");
        $(".listShow").addClass("active");
    }
}

// Grid View
function gridView() {
    if ($("#gridVSlist").hasClass("list-show")) {
        $("#gridVSlist").removeClass("list-show").addClass("grid-show");
        $(".listShow").removeClass("active");
        $(".gridShow").addClass("active");
    }
}

// Collapsed side bar
function filterOption() {
    $(".btn-filter").toggleClass("active")
    $(".list-filter").toggleClass("border-r-1")
    $(".collabse-side-filter").toggleClass("closed");
    $(".side-filter-btn").toggleClass("closed-filter-btn");
    $(".list-filter").toggleClass("widthZero");
    $(".list-with-filter.list-show .list-item .date-card").toggleClass("margin-l-0");
    $(".list-with-filter").toggleClass("margin-l-0");


    // if( document.body.classList.contains("closed-filter-btn")){
    if (document.querySelector(".side-filter-btn").classList.contains("closed-filter-btn")) {
        // $(".list-with-filter").addClass("margin-l-0");
        // $(".list-with-filter.list-show .list-item .date-card").addClass("margin-l-0");

        //console.log("opened");
        document.cookie = "status=opened";



    }
    else {
        //console.log("closed");
        document.cookie = "status=closed";
        // $(".list-with-filter").removeClass("margin-l-0");
        // $(".list-with-filter.list-show .list-item .date-card").removeClass("margin-l-0");

    }
}

// tooltip

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$(document).ready(function () {

    checkCookie();

    //console.log("ready!");
    if ($(window).width() <= 992) {
        if ($("#gridVSlist").hasClass("list-show")) {
            $("#gridVSlist").removeClass("list-show").addClass("grid-show");
        }
    }
});


function checkCookie() {
    //console.log("hhhhhhhhhhhhh");
    let status = getCookie("status");
    if (status == "opened" && $(window).width() > 992) {
        $(".btn-filter").toggleClass("active")
        $(".list-filter").toggleClass("border-r-1")
        $(".collabse-side-filter").toggleClass("closed");
        $(".side-filter-btn").toggleClass("closed-filter-btn");
        $(".list-filter").toggleClass("widthZero");
        $(".list-with-filter.list-show .list-item .date-card").toggleClass("margin-l-0");
        $(".list-with-filter").toggleClass("margin-l-0");

    } else {
        // status = prompt("Please enter your name:", "");
        if (status != "" && status != null) {
            setCookie("status", status, 365);
        }
    }
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function () {
    $("#cky-btn-settings").on("click", function () {
        $("#cky-detail-wrapper").toggleClass("d-block")
        $(".cky-btn-settings").toggleClass("reverse-arrow")

    });


    $(".cky-tab-item").on("click", function () {
        $(".cky-tab-item").removeClass("cky-tab-item-active")
        $(".cky-tab-content-item").removeClass("cky-tab-content-active")

        $(this).addClass("cky-tab-item-active")


        //console.log($(this).attr("tab-target") , "ddddd");

        let ourId = $(this).attr("tab-target")
        //console.log(ourId , "ourId");
        $("#" + ourId).addClass("cky-tab-content-active")
    });

})


// $( "a.collapse-btn" ).click(function() {
//   $( this ).parent("div").toggleClass("show-collapse");
//   console.log("hello");
// });
