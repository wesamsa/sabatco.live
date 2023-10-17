

$(document).ready(function () {

    //----------------------------------------------

    $(".custom_MobileWithIcons_shared").intlTelInput({
        utilsScript: "/_custom/js/utils.js",
        initialCountry: $(".custom_MobileWithIcons_shared_codeLetters").val()
    });

    $(document).on('click', '.intl-tel-input .country-list li.country', function () {
        var code = $(this).attr("data-dial-code");
        $(this).parent().parent().parent().parent().find(".custom_MobileWithIcons_shared_code").val(code);

        var letter = $(this).attr("data-country-code");
        $(this).parent().parent().parent().parent().find(".custom_MobileWithIcons_shared_codeLetters").val(letter);
    });

    //----------------------------------------------

    $(document).on('keyup', '.custom_MobileWithIcons', function () {
        //var code = $(this).prev().find(".country.active").attr("data-dial-code");
        $(this).parent().parent().find(".myHiddenMobile").val($(this).val()); //code + " " + 
    });

    //----------------------------------------------

});

$(document).ready(function () {

    //$(".select2-selection").click(function () {
    //    $(".select2-results__options li:first-child").html(""); // .remove();
    //});

    //alert(window.location.pathname);

    //setTimeout(function () {
    //    alert($("#hdnCultureCode").val());
    //    if ($("#hdnCultureCode").val().includes("ar")) {
    //        $(".hasDatepicker ").datepicker("option", $.datepicker.regional["ar"]);
    //    }
    //}, 0);


    $(".a_level1").each(function () {
        if (window.location.pathname.includes($(this).attr("href"))) {
            $(this).addClass("active");
        }
    });

    setTimeout(function () {
        var drpOfferValue = $("#ItemTextSelected").val();
        $("#select2-drpFilterOffers-container").attr("title", drpOfferValue);
        $("#select2-drpFilterOffers-container").html(drpOfferValue);
    }, 0);

    $(".Full_Width").parent().parent().removeClass("col-lg-6").addClass("col-lg-12");

    setTimeout(function () {
        $(".g-recaptcha-response").parent().parent().parent().parent().removeClass("col-lg-6").addClass("col-lg-12");
    }, 700);

    $(".search-link").click(function () {
        $("#searchText").focus();
    });

    // show/hide loading on ajax requests
    var $loading = $('#DotNetloading').hide();
    $(document)
        .ajaxStart(function () {
            $loading.show();
        })
        .ajaxStop(function () {
            $loading.hide();
        });

    // search icon
    $('#searchText').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#searchSubmit").trigger("click");
        }
        event.stopPropagation();
    });

    // send ajax request
    $("#btnSearchAjax").formAutoPost({ targetContainerSelector: '.gridContentAjax' });
    $(".drpAjax").formAutoChange({ targetContainerSelector: '.gridContentAjax' });

    $(".js-postback input:checkbox").click(function () {
        $(this).parent().parent().find(".checkboxSelectAll").prop("checked", false);
        $("#CurrentPage").val("1");
        SendRequest(false);
    });

    $(".btnApply").click(function () { //, .js-postback input:checkbox , .drpApply
        $("#CurrentPage").val("1");
        SendRequest();
    });

    $("#drpFilterOffers").change(function () {
        $("#ItemID").val($(this).val());
        SendRequest();
    });
    
    $(".btnSearch").click(function () {
        $("#CurrentPage").val("1");
        $("#Keyword").val($(".txtSearch").val());
        SendRequest();
    });

    $('.txtSearch').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(".btnSearch").trigger("click");
        }
        event.stopPropagation();
    });

    $(".checkboxSelectAll").click(function () {
        $(this).parent().parent().find(".js-postback input:checkbox").prop("checked", false);
        $("#CurrentPage").val("1");
        $("#Keyword").val("");
        SendRequest(false);
    });

    // send ajax request for newsletter only

    $(document).on("submit", "#NewsletterSubscriptionWidget", function (e) {
        e.preventDefault();
        return false;
    });

    $("#btnSearchAjax_Newsletter").formAutoPost({ targetContainerSelector: '.gridContentAjax_Newsletter' });

    $(".btnApply_Newsletter").click(function () {

        if ($(".gridContentAjax_Newsletter").length) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".gridContentAjax_Newsletter").offset().top - 200
            }, 500);
        }
        
        $("#btnSearchAjax_Newsletter").click();
    });

    $('.txtApply_Newsletter').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(".btnApply_Newsletter").trigger("click");
        }
        event.stopPropagation();
    });

    // end

    
    // send ajax request for newsletter only
    $("#btnSearchAjax_photos").formAutoPost({ targetContainerSelector: '.gridContentAjax_photos' });
    $(".btnApply_photos").click(function () {

        

        var ID = $(this).attr("id");
        var data = $(this).attr("accesskey");

        $("#SelectedImage").val(ID);
        $("#List_Images").val(data);

        $("#PhotoGalleryId").val(ID.replace("photo_", ""));
        $("#Title").val($(this).parent().parent().find(".text-primary").text());
        $("#ImageURL").val($(this).find(".img-fluid").attr("src"));

        $("#btnSearchAjax_photos").click();

    });
    // end
    

});

function ShowModelAlert(message, title = '', msgType = 0) {

    if (title == "") {
        title = $("#hdnAlertText").val();
    }

    $("#model_title").html(title);
    $("#model_message").html(message);
    $("#btn-alert-modal").trigger("click");

}
 
//function onlyNumber(evt) {
//    if (evt.shiftKey || evt.ctrlKey || evt.altKey) {
//        evt.preventDefault();
//    } else {
//        // Only ASCII character in that range allowed
//        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
//        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
//            return false;
//        return true;
//    }
//}

$(document).on('keyup', '.onlyNumbers', function () {
    $(this).val($(this).val().replace(/[^0-9]+/, ''));
});

$(document).on('keyup', '.onlyText', function () {
    /*$(this).val($(this).val().replace(/[^a-zA-Z\s]+/, ''));*/
    $(this).val($(this).val().replace(/[^\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\s]+[^\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-_\s]*/, '').replace(/  +/g, ' '));
});

$(document).on('keyup', '.mobileNoZero', function () {
    $(this).val($(this).val().replace(/[^0-9]+/, '').replace(/[0]/, '')); //.replace(/[^\d]+|^0+(?!$)/g, '')
});



$(document).on('change', '.pageCountFilter', function () {
    $("#CurrentPage").val("1");
    $("#PageSize").val($(this).val());
    SendRequest();
});

$(document).on('click', '#StaySignedIn', function () {
    if ($(this).attr("value") == "True") {
        $(this).attr("value", "False");
    } else {
        $(this).attr("value", "True");
    }
});

$(document).on('click', '.pagerClick a', function () {
    if ($(this).hasClass("disabled")) {

    } else {
        //$(".scroll-up").click();
        $("#CurrentPage").val($(this).attr("accesskey"));
        SendRequest();
    }
});

$(document).on('click', '.togglePassword', function () {
    var type = $(this).prev().attr("type") === 'password' ? 'text' : 'password';
    $(this).prev().attr("type", type);
    this.classList.toggle('fa-eye-slash');
});

$(document).on('click', '.form-widget-form .submit-button', function () {

    setTimeout(function () {

        if ($(".field-validation-error").length) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".field-validation-error").offset().top - 210
            }, 500);
        }

        if ($(".formwidget-submit-text").length) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".formwidget-submit-text").offset().top - 210
            }, 500);
        }

    }, 700);

});


$('body').on('DOMSubtreeModified', '.gridContentAjax_photos', function () {

    $("#container_" + $("#SelectedImage").val()).html($(".gridContentAjax_photos").html());

    setTimeout(function () {
        $("#temp_" + $("#SelectedImage").val()).trigger("click");
    }, 700);

});

$('body').on('DOMSubtreeModified', '.form-widget-form', function () {

    $(".Full_Width").parent().parent().removeClass("col-lg-6").addClass("col-lg-12");

    setTimeout(function () {
        $(".g-recaptcha-response").parent().parent().parent().parent().removeClass("col-lg-6").addClass("col-lg-12");
    }, 700);

});

$('body').on('DOMSubtreeModified', '.formwidget-submit-text', function () {

    if ($(".formwidget-submit-text").length) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".formwidget-submit-text").offset().top - 200
        }, 500);
    }

});


function ShowFormErrors() {
    if ($("#w44").length) {
        $("#w44 form").validate();
        var validated = $('#w44 form').valid();
        if (validated) {

        } else {
            $("#btnNext").trigger("click");
        }
    }
}


$(document).on('change', 'select', function () {
    $(this).parent().find(".error").trigger("click");
});

$(document).on('change', 'input[type=text]', function () {
    $(this).parent().find(".error").trigger("click");
});

$(document).on('change', 'input[type=telSA]', function () {
    ShowFormErrors();
});

$(document).on('change', 'input[type=email]', function () {
    ShowFormErrors();
});

$(document).on('keyup', 'input[type=text]', function () {
    $(this).parent().find(".error").trigger("click");
});




function SendRequest(focus = true) {

    if (focus) {
        if ($(".gridContentAjax").length) {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".gridContentAjax").offset().top - 200
            }, 500);
        }
    }

    $("#btnSearchAjax").click();

}


