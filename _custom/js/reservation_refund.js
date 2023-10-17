

(function ($) {

    //'use strict';
    /*
    Wizard #4
    */
    var $w4finish = $('#w44').find('ul.pager li.finish'),
        $w4validator = $("#w44 form").validate({
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
                $(element).remove();
            },
            errorPlacement: function (error, element) {
                element.parent().append(error);
            }
        });

    $w4finish.on('click', function (ev) {
        ev.preventDefault();
        var validated = $("#w44 form").valid();
        if (validated) {
            $("#RetuenPartialName").val($("#btnFinish").attr("PartialName"));
            $("#btnSubmitRefundticketshd").trigger("click");
            //new PNotify({
            //	title: 'Congratulations',
            //	text: 'You completed the wizard form.',
            //	type: 'custom',
            //	addclass: 'notification-success',
            //	icon: 'fas fa-check'
            //});
        }
    });

    $('#w44').bootstrapWizard({
        tabClass: 'wizard-steps',
        nextSelector: 'ul.pager li.next',
        previousSelector: 'ul.pager li.previous',
        firstSelector: null,
        lastSelector: null,
        onNext: function (tab, navigation, index, newindex) {

            $(this).attr('disabled', 'disabled');

            if ($(".formContent").valid()) {   // validate all
                // do stuff if form is valid
                var stepNo = parseInt($("#StepNo").val());
                var isValid = true;
                if (stepNo === 1 && $("#step1Confirmation input").length === 0) {
                    $("#btnSearch").trigger("click");
                    return false;
                }

                if (stepNo === 2) {
                    if ($(".tickets-table tr:has(input:checked)").length === 0) {
                        isValid = false;
                        //alert("Please Select One Trip at Least");
                        ShowModelAlert($("#err4").val());
                        return false;
                    }
                }


                $('#IsValid').val(isValid);

                if (isValid) {
                    $("#RetuenPartialName").val("");
                    $(".errorContainer").addClass("d-none");
                    $("#errorAlert").text('');
                    var CurrentStep = stepNo;
                    stepNo = stepNo + 1;
                    $("#StepNo").val(stepNo);

                    $(".TabsContent .tab-pane").not('.innerTab').removeClass("active")
                    $(".TabsContent #step" + stepNo).addClass("active");

                    if (CurrentStep === 1 && $("#step1Confirmation input").length !== 0) {
                        $("#btnConfirmhdsubmithd").trigger("click");
                    }
                    if (CurrentStep === 2) {
                        $("#btnCheckRefundTicketshd").trigger("click");
                    }

                }
                else {
                    //e.preventDefault();
                    //e.stopPropagation();
                    //return false;
                    //$(this).unbind('click');
                }

            } else {
                // do stuff if form is not valid
                return false;
            }


            // Handle event here 
            $(this).removeAttr('disabled');
            //$(this).val('Next');

        },
        onTabClick: function (tab, navigation, index, newindex) {
            if (newindex == index + 1) {
                return this.onNext(tab, navigation, index, newindex);
            } else if (newindex > index + 1) {
                return false;
            } else {
                return true;
            }
        },
        onTabChange: function (tab, navigation, index, newindex) {
            var $total = navigation.find('li').length - 1;
            $w4finish[newindex != $total ? 'addClass' : 'removeClass']('hidden');
            $('#w44').find(this.nextSelector)[newindex == $total ? 'addClass' : 'removeClass']('hidden');
        },
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length - 1;
            var $current = index;
            var $percent = Math.floor(($current / $total) * 100);

            navigation.find('li').removeClass('active');
            navigation.find('li').eq($current).addClass('active');

            $('#w44').find('.progress-indicator').css({ 'width': $percent + '%' });
            tab.prevAll().addClass('completed');
            tab.nextAll().removeClass('completed');
        }
    });




}).apply(this, [jQuery]);

//function scrollTopGrid() {
//    $([document.documentElement, document.body]).animate({
//        scrollTop: $(".gridContentAjax_firstTrip").offset().top - 200
//    }, 500);
//}




$(document).ready(function () {

    $('#OTPDetails_OTP').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            $("#btnNext").trigger("click");
        }
        event.stopPropagation();
    });

});


$(document).on("keypress", "#OTPDetails_OTP", function (e) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        event.preventDefault();
        $("#btnNext").trigger("click");
    }
    event.stopPropagation();
});


$("#btnSearch").click(function () {
    if ($(".formContent").valid() && $(this).attr("PartialName").length > 0) {
        if ($(".inputCountryDialCode .country-list .country.highlight.active").length > 0) {
            $("#CountryDialCode").val($(".inputCountryDialCode .country-list .country.highlight.active").attr("data-dial-code"));

        } else {
            $("#CountryDialCode").val($(".inputCountryDialCode .country-list .country.active").attr("data-dial-code"));
        }
        $("#RetuenPartialName").val($(this).attr("PartialName"));

    }
});

$("#btnPrevious").click(function () {

    var stepNo = parseInt($("#StepNo").val());

    if (stepNo > 1) {

        stepNo = stepNo - 1;
        $("#StepNo").val(stepNo);

        $(".TabsContent .tab-pane").not('.innerTab').removeClass("active");
        $(".TabsContent #step" + stepNo).addClass("active");
        $(".formContent").attr("data-ajax-update", "#step" + parseInt(stepNo + 1));

        $(".TabsContent #step" + parseInt(stepNo + 1)).html("");
        //$(".has-error").find(".error").remove();

        //$(".slider_reservation .owl-stage .owl-item:first-child .nav-link").trigger("click");
        //$(".slider_reservation .tab-content .tab-pane:first-child").addClass("active");
    }

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".TabsContent").offset().top - 210
    }, 500);

    //if (stepNo == 1) {
    //    $(".ReservationTabs #step3").html("");
    //}

});


$("#btnConfirm").click(function () {
    $("#btnNext").trigger("click");
});




