

(function ($) {

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
            //errorPlacement: function (error, element) {
            //    if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
            //        var controls = element.closest('div[class*="col-"]');
            //        if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
            //        else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            //    }
            //    else if (element.is('.select2')) {
            //        error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            //    }
            //    else if (element.is('.chosen-select')) {
            //        error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
            //    }
            //    else error.insertAfter(element.parent());
            //}
        });

    $w4finish.on('click', function (ev) {
        ev.preventDefault();
        var validated = $('#w44 form').valid();
        if (validated) {
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
        nextSelector: 'ul.pager li.next a',
        previousSelector: 'ul.pager li.previous a',
        firstSelector: null,
        lastSelector: null,
        onNext: function (tab, navigation, index, newindex) {

            var validated = $('#w44 form').valid();
            if (!validated) {
                $w4validator.focusInvalid();
                return false;
            } else {
                // todo: disable wizard
                return false;
            }

            var isValid = $('#hdnIsValidALLL').val();
            if (isValid == "True" || isValid == "true" || isValid == "1") {
                return false;
            } else {
                return false;
            }

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

    /***************************************** load dates *****************************************/

    const monthNames = $("#hdnMonths").val().split(';');

    $.date = function (dateObject) {
        
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + " " + monthNames[d.getMonth()] + " " + year; // month
        return date;
    };

    $.date2 = function (dateObject) {
        
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "-" + month + "-" + year; // month
        return date;
    };

    function getDate(element) {

        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }

    var dateFormat = "dd-mm-yy",

        from = $("#DepartureDate")
            .datepicker({
                //defaultDate: "+1w",
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+10",
                numberOfMonths: 1,
                minDate: 0,
                dateFormat: dateFormat
            })
            .on("change", function () {

                to.datepicker("option", "minDate", getDate(this));

                //from.val($.date2(getDate(this)));
                //to.val($.date2(getDate(this)));

                //$("#datepickerFromSpan").text($.date(getDate(this)));
                //$("#DepartureDate").val($.date2(getDate(this)));

                //if ($(".datepickerTo").hasClass("hide")) {
                //    $(".btnHideCal").trigger("click");
                //}

            }),

        to = $("#ReturnDate").datepicker({
            defaultDate: "+1day",
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+10",
            numberOfMonths: 1,
            minDate: 0,
            dateFormat: dateFormat
        })
            .on("change", function () {

                from.datepicker("option", "maxDate", getDate(this));

                //from.val($.date2(getDate(this)));
                //to.val($.date2(getDate(this)));

                //$("#datepickerToSpan").text($.date(getDate(this)));
                //$("#SearchParameters_ReturnDate").val($.date2(getDate(this)));

                //$(".btnHideCal").trigger("click");

            });


    if ($("#hdnCultureCode").val().includes("ar")) {
        $("#DepartureDate").datepicker("option", $.datepicker.regional["ar"]);
        $("#ReturnDate").datepicker("option", $.datepicker.regional["ar"]);
    }


    $(".multiDate").datepicker({
        //defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+10",
        numberOfMonths: 1,
        minDate: 0,
        dateFormat: dateFormat
    })
    .on("change", function () {

        HideModelMessage();

        for (var i = 0; i < 5; i++) {

            if (i < 4) {

                var current = $.datepicker.parseDate(dateFormat, $(".multiDate" + (i) ).val());
                var next = $.datepicker.parseDate(dateFormat, $(".multiDate" + (i + 1)).val());

                if (next < current && next != null && current != null) {
                    $(".multiDate" + (i + 1)).val("");
                    ShowModelMessage($("#txtDepartureDateGreaterThanPrev").val());
                }

                if (current == null) {
                    $(".multiDate" + (i + 1)).val("");
                }

            } else {

                var current = $.datepicker.parseDate(dateFormat, $(".multiDate" + 3).val());

                if ($(".multiDate" + 4).val() != "") {
                    var next = $.datepicker.parseDate(dateFormat, $(".multiDate" + 4).val());
                    if (next < current) {
                        $(".multiDate" + (i + 1)).val("");
                        ShowModelMessage($("#txtDepartureDateGreaterThanPrev").val());
                    }
                }

                if (current == null) {
                    $(".multiDate" + (i + 1)).val("");
                }

            }

        }

    });

    if ($("#hdnCultureCode").val().includes("ar")) {
        $(".multiDate").datepicker("option", $.datepicker.regional["ar"]);
    }


    //var dateFormat2 = "dd-mm-yy",

    //    multiDate1 = $(".multiDate1")
    //        .datepicker({
    //            //defaultDate: "+1w",
    //            changeMonth: true,
    //            changeYear: true,
    //            yearRange: "-100:+10",
    //            numberOfMonths: 1,
    //            minDate: 0,
    //            dateFormat: dateFormat2
    //        })
    //        .on("change", function () {
    //            multiDate2.datepicker("option", "minDate", getDate(this));
    //        }),

    //    multiDate2 = $(".multiDate2").datepicker({
    //        defaultDate: "+1day",
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: "-100:+10",
    //        numberOfMonths: 1,
    //        minDate: 0,
    //        dateFormat: dateFormat2
    //    })
    //        .on("change", function () {
    //            multiDate1.datepicker("option", "maxDate", getDate(this));
    //        }),

    //    multiDate3 = $(".multiDate3").datepicker({
    //        defaultDate: "+1day",
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: "-100:+10",
    //        numberOfMonths: 1,
    //        minDate: 0,
    //        dateFormat: dateFormat2
    //    })
    //        .on("change", function () {
    //            from.datepicker("option", "maxDate", getDate(this));
    //        }),

    //    multiDate4 = $(".multiDate4").datepicker({
    //        defaultDate: "+1day",
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: "-100:+10",
    //        numberOfMonths: 1,
    //        minDate: 0,
    //        dateFormat: dateFormat2
    //    })
    //        .on("change", function () {
    //            from.datepicker("option", "maxDate", getDate(this));
    //        }),

    //    multiDate5 = $(".multiDate5").datepicker({
    //        defaultDate: "+1day",
    //        changeMonth: true,
    //        changeYear: true,
    //        yearRange: "-100:+10",
    //        numberOfMonths: 1,
    //        minDate: 0,
    //        dateFormat: dateFormat2
    //    })
    //        .on("change", function () {
    //            from.datepicker("option", "maxDate", getDate(this));
    //        })

    //    ;

    //if ($("#hdnCultureCode").val().includes("ar")) {
    //    $(".multiDate1").datepicker("option", $.datepicker.regional["ar"]);
    //    $(".multiDate2").datepicker("option", $.datepicker.regional["ar"]);
    //    $(".multiDate3").datepicker("option", $.datepicker.regional["ar"]);
    //    $(".multiDate4").datepicker("option", $.datepicker.regional["ar"]);
    //    $(".multiDate5").datepicker("option", $.datepicker.regional["ar"]);
    //}


    /***************************************** first load *****************************************/

    var _PageToken = $("#PageToken").val();

    var _IsHomePage = $("#IsHomePage").val();
    if (_IsHomePage == "True" && _PageToken == "R4FpJwwZ9oW") {
        setTimeout(function () {
            $("#btnNext").trigger("click");
        }, 500);
    }

    /**********/

    var _BookingType = $("#BookingType").val();
    if (_BookingType == 1) {
        $("#oneway").trigger("click");
    }
    else if (_BookingType == 2) {
        $("#roundtrip").trigger("click");
    }
    else if (_BookingType == 3) {
        $("#multi").trigger("click");
    }
    else {
        $("#oneway").trigger("click");
    }

    /**********/

    var _DirectTripsOnly = $("#DirectTripsOnly").val();
    if (_DirectTripsOnly == "True") {
        //$("#vipExpressTrips").trigger("click");
        $("#vipExpressTrips").attr("checked", "checked");
    }

    /**********/


    var isEmpty = $("#DepartureDate").val() == "";

    if (isEmpty) {

        /***************************/

        var today = new Date();
        var tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate());// + 1

        /***************************/

        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        //var mmm = monthNames[today.getMonth()];
        var yyyy = today.getFullYear();
        //today = dd + ' ' + mmm + ' ' + yyyy;

        /*$("#datepickerFromSpan").text(today);*/
        $("#DepartureDate").val(dd + '-' + mm + '-' + yyyy);

        /***************************/

        dd = String(tomorrow.getDate()).padStart(2, '0');
        mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        //mmm = monthNames[tomorrow.getMonth()];
        yyyy = tomorrow.getFullYear();
        //tomorrow = dd + ' ' + mmm + ' ' + yyyy;

        //$("#datepickerToSpan").text(tomorrow);
        $("#ReturnDate").val(dd + '-' + mm + '-' + yyyy);

        /***************************/

    }
    else {

        ///**********/
        //if ($("#SearchParameters_DirectTripsOnly").val() == "True") {
        //    $("#btnSwitch input").trigger("click");
        //}
        ///**********/
        //$("#FromStation").val($("#Station" + $("#SearchParameters_DepartureStation").val()).find("span").text());
        //$("#ToStation").val($("#Station" + $("#SearchParameters_ArrivalStation").val()).find("span").text());
        ///**********/
        //$("#datepickerFromSpan").html($("#SearchParameters_DepartureDate").val());
        //$("#datepickerToSpan").html($("#SearchParameters_ReturnDate").val());
        ///**********/
        //$(".spanAdults").text($("#SearchParameters_Passengers_AdultsCount").val());
        //$(".spanChildren").text($("#SearchParameters_Passengers_ChildrenCount").val());
        //$(".spanInfant").text($("#SearchParameters_Passengers_InfantsCount").val());
        ///**********/
        //if ($("#SearchParameters_PromotionCode").val() != '') {
        //    $("#btnPromocode").trigger("click");
        //    $("#txtPromocode").val($("#SearchParameters_PromotionCode").val());
        //}
        ///**********/

    }


    /**********/

    //var _IsHomePage = $("#IsHomePage").val();
    //if (_IsHomePage == "True") {
    //    //$("#btnNext").trigger("click");
    //}

    /**********/


    /***************************************** click buttons *****************************************/

    //completed = function (xhr) {
    //    alert(`Hi ${xhr.responseText}!`);
    //};

    /**********/
    $(document).on('click', '.addTripStatic', function () {

        if ($(".Multi_Destination.hide").first().attr("data") == "5") {
            $(".addTripStatic").addClass("hide");
            //ShowModelMessage("Max trips is 5");
        }

        $(".Multi_Destination.hide").first().removeClass("hide").addClass("last");
        $(".delTripStatic").removeClass("hide");

    });
    
    $(document).on('click', '.delTripStatic', function () {

        if ($(".Multi_Destination.last").last().attr("data") == "3") {
            $(".delTripStatic").addClass("hide");
        }

        $(".Multi_Destination.last").last().addClass("hide");
        $(".Multi_Destination.last").last().removeClass("last");
        $(".addTripStatic").removeClass("hide");

    });
    


    $(document).on('click', '.btnBookNow', function () {

        var id = $(this).attr("data");
        $("#" + id).find("tr.active").removeClass("active");
        $("#" + id).find("td.activeTrip").removeClass("activeTrip");

        //$(this).parent().parent().parent().find("td.activeTrip").removeClass("activeTrip");
        //$(this).parent().parent().parent().find("tr.active").removeClass("active");

        $(this).parent().parent().addClass("active");
        $(this).parent().addClass("activeTrip");

        /**********/

        //var price = 0;
        //$('.activeTrip').each(function () {
        //    price = parseFloat(price) + parseFloat($(this).parent().find(".hdnAmount").val());
        //});
        //$('#totalPriceSpan').text(price);

        /**********/
        
        var list = "";
        $('.activeTrip').each(function () {
            var td = $(this);
            list += td.find(".hdnJourneyID").val() + "~" + td.find(".hdnOfferId").val() + "|";
        });
        $("#JourneysList2").val(list);
        $("#JourneysList").val(list);

        

        var tripNum = $(this).attr("data").replace("tab_content", "");
        $("#hdnTripsSelectedBookNow").val(tripNum);

        $("#btnUpdateTotalTrips").trigger("click");

        /**********/

        //setTimeout(function () {

        //}, 500);

    });

    $(document).on('click', '.edit_saptco_trip', function () {

        var stepNo = parseInt($("#StepNo").val());

        if (stepNo == 3) {
            $("#btnPrevious").trigger("click");
        }
        if (stepNo == 4) {
            $("#btnPrevious").trigger("click");
            $("#btnPrevious").trigger("click");
        }

        $(".saptco_trip").addClass("hide");
        $("#saptco_trip" + $(this).attr("data")).removeClass("hide");

        loadingAjax();

        //var stepNo = 2;

        //$(".card-footer").addClass("hide");
        //$("#btnNext").html($("#txtNext").val() + ' <i class="fas fa-angle-right"></i>');

        //$("#Form_Reservation999").attr("data-ajax-update", "#step" + parseInt(stepNo + 1));

        //$(".wizard-steps .li_steps").removeClass("completed").removeClass("active");
        //$(".wizard-steps .li_step" + 1).addClass("completed");
        //$(".wizard-steps .li_step" + stepNo).addClass("active");

        //$("#step5").removeClass("active");
        //$(".ReservationTabs .steps").removeClass("active");
        //$(".ReservationTabs #step" + stepNo).addClass("active");
        //$("#StepNo").val(stepNo);

        //$([document.documentElement, document.body]).animate({
        //    scrollTop: $(".ReservationTabs").offset().top - 210
        //}, 500);

    });

    $(document).on('click', '.radNewPassenger', function () {

        $(this).parent().parent().find(".radNewPassenger").prop("checked", false);
        $(this).prop("checked", true);


        var item = $(this).parent().parent().parent().find(".GetPassenger");
        if ($(this).attr("data") == "1") {
            item.removeClass("hide");
        } else {
            item.addClass("hide");
        }

    });

    $(document).on('click', '.btnGetPassenger', function () {

        ////debugger

        var passengerDiv = $(this).parent().parent().parent();

        passengerDiv.find(".search_div").html("");

        var pasIDType = $(this).parent().parent().find('.pasIDType').val();
        var pasIDNumber = $(this).parent().parent().find('.pasIDNumber').val();
        var pasDateOfBirth = $(this).parent().parent().find('.pasDateOfBirth').val();

        //$("#FormGetPassenger").find(".IDType").val(pasIDType);
        //$("#FormGetPassenger").find(".IDNumber").val(pasIDNumber);
        //$("#FormGetPassenger").find(".DateOfBirth").val(pasDateOfBirth);

        //$("#FormGetPassenger").attr("data-ajax-update", "passengerNum" + $(this).attr("data"));
        //$("#btnGetPassengerAjax").trigger("click");

        //var data = {
        //    IDType: pasIDType,
        //    IDNumber: pasIDNumber,
        //    DateOfBirth: pasDateOfBirth
        //};

        $.ajax({
            type: "Post",
            url: "/ReservationWD/GetPassenger" + "?IDType=" + pasIDType + "&IDNumber=" + pasIDNumber + "&DateOfBirth=" + pasDateOfBirth,
            contentType: "application/json; charset=utf-8",
            //data: JSON.stringify(data),
            //dataType: "json",
            success: function (response) {
                
                if (response != null) {

                    var model = response;
                    localStorage.setItem("model", JSON.stringify(model));

                    if (model.idType != '' && model.idType != null) {

                        passengerDiv.find(".FirstName").val(model.firstName);
                        passengerDiv.find(".MiddleName").val(model.middleName);
                        passengerDiv.find(".LastName").val(model.lastName);

                        passengerDiv.find(".FullName").val(model.name);

                        passengerDiv.find(".NationalityID").val(model.nationalityID);
                        passengerDiv.find(".IDType").val(model.idType);
                        passengerDiv.find(".IDNumber").val(model.idNumber);
                        passengerDiv.find(".Gender").val(model.gender);
                        passengerDiv.find(".DateOfBirth").val(model.dateOfBirth);
                    } else {
                        passengerDiv.find(".search_div").html(model.modelMessage);
                    }

                } else {
                    passengerDiv.find(".search_div").html('خطأ ، فضلا المحاولة مرة اخرى.');
                }

                
            },
            failure: function (response) {
                
            }
        });

        //var validated = $('#w44 form').valid();
        //if (validated) {

        //}

    });



    $(document).on('click', '.inpBookingType input', function () {

        if ($(this).attr("value") == "oneway") {

            $("#BookingType").val(1);
            $("#ReturnDate").val("");
            $("#ReturnDate").trigger("change");

            //$("#roundReturnDate").addClass("d-none");
            //$("#OneTwoTrips").removeClass("d-none");
            //$("#frmInterCityRent .multi").addClass("d-none");
        }
        else if ($(this).attr("value") == "roundtrip") {

            $("#BookingType").val(2);

            //$("#roundReturnDate").removeClass("d-none");
            //$("#OneTwoTrips").removeClass("d-none");
            //$("#frmInterCityRent .multi").addClass("d-none");
        }
        else if ($(this).attr("value") == "multi") {

            $("#BookingType").val(3);
            
            //$("#OneTwoTrips").addClass("d-none");
            //$("#frmInterCityRent .multi").removeClass("d-none");
        }

        //$("#BookingType2").val($("#BookingType").val());

    });

    //$("#BookingType2").val($("#BookingType").val());
   
    $(document).on('click', '#vipExpressTrips', function () {

        if ($("#DirectTripsOnly").val() == "True") {
            $("#DirectTripsOnly").val('False');
            $("#DirectTripsOnly2").val('False');
        } else {
            $("#DirectTripsOnly").val('True');
            $("#DirectTripsOnly2").val('True');
        }

        window.location.href = window.location.pathname

            + "?token=R4FpJwwZ9o&IsHomePage=True&StepNo=1"

            + "&BookingType=" + $("#BookingType").val()
            + "&DirectTripsOnly=" + $("#DirectTripsOnly").val()

            //+ "&DepartureStation=" + $("#DepartureStation").val()
            //+ "&ArrivalStation=" + $("#ArrivalStation").val()

            + "&DepartureDate=" + $("#DepartureDate").val()
            + "&ReturnDate=" + $("#ReturnDate").val()
            
            + "&AdultsCount=" + $("#AdultsCount").val()
            + "&ChildrenCount=" + $("#ChildrenCount").val()
            + "&InfantsCount=" + $("#InfantsCount").val()

            + "&PromotionCode=" + $("#PromotionCode").val()
            ;

        //$("#btnFilterStation").trigger("click");

        //?token=R4FpJwwZ9o&IsHomePage=True&StepNo=1&DirectTripsOnly=True&BookingType=2&DepartureStation=197&ArrivalStation=67
        //&DepartureDate=22-04-2022&ReturnDate=23-04-2022&PromotionCode=&AdultsCount=1&ChildrenCount=0&InfantsCount=0

    });


    $("#btnPrevious").click(function () {


        if ($(this).parent().hasClass("disabled")) {

        } else {

            HideModelMessage();

            $("#btnNext").removeClass("hide");
            $("#btnNext").html($("#txtNext").val() + ' <i class="fas fa-angle-right"></i>');

            var stepNo = parseInt($("#StepNo").val());

            if (stepNo == 3) {
                //$(".card-footer").addClass("hide");
                $("#btnNext").addClass("hide");
            }

            if (stepNo > 1) {

                stepNo = stepNo - 1;
                $("#StepNo").val(stepNo);

                $("#step5").removeClass("active");
                $(".ReservationTabs .steps").removeClass("active");
                $(".ReservationTabs #step" + stepNo).addClass("active");
                //$("#Form_Reservation").attr("data-ajax-update", "#step" + parseInt(stepNo + 1));

                $(".ReservationTabs #step" + parseInt(stepNo + 1)).html("");
                //$(".has-error").find(".error").remove();

                //$(".slider_reservation .owl-stage .owl-item:first-child .nav-link").trigger("click");
                //$(".slider_reservation .tab-content .tab-pane:first-child").addClass("active");
            }

            //$([document.documentElement, document.body]).animate({
            //    scrollTop: $(".ReservationTabs").offset().top - 210
            //}, 500);

            loadingAjax();

            //if (stepNo == 1) {
            //    $(".ReservationTabs #step3").html("");
            //}

        }

    });

    // Prevent form submission with enter
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $("#btnNext").click();
            return false;
        }
    });

    $("#btnNext").click(function () {

        HideModelMessage();
        
        //$(this).attr('disabled', 'disabled');
        ////$("#Form_Reservation").removeAttr("novalidate");
        ////$("#Form_Reservation").validate();

        if ($("#Form_Reservation").valid()) {   // validate all
            // do stuff if form is valid

            var isValid = true;
            var stepNo = parseInt($("#StepNo").val());


            if (stepNo == 1 && $('#hdnIAgreed').val() == "False") {

                $("#btn_covid_terms").trigger("click");

                isValid = false;

            } else {

                $("#btnCancelStep1").trigger("click");

            }

            if (stepNo == 2) {

                var count = 0;
                var list = "";
                $('.activeTrip').each(function () {
                    var td = $(this);
                    list += td.find(".hdnJourneyID").val() + "~" + td.find(".hdnOfferId").val() + "|";
                    count++;
                });
                $("#JourneysList").val(list);



                var _TotalTrips = parseInt($("#TotalTrips").val());
                if (_TotalTrips == count) {
                    isValid = true;
                } else {
                    isValid = false;
                    ShowModelMessage($("#txtPlzSelectTrips").val());
                }
            }

            if (stepNo == 3) {

                if (document.getElementById('radMADA').checked
                    || document.getElementById('radVISA').checked
                    //|| document.getElementById('radMASTERCARD').checked
                    || document.getElementById('radSADAD').checked
                ) {
                    isValid = true;
                } else {
                    isValid = false;
                    ShowModelMessage($("#txtPlzSelectPayment").val());
                }

            }

            if (stepNo == 4) {

                if (document.getElementById('w4-terms').checked) {
                    isValid = true;
                } else {
                    isValid = false;
                    ShowModelMessage($("#txtPlzSelectIAgree").val());
                }

            }

            $('#IsValid').val(isValid);

            if (isValid) {

                //if (stepNo == 1) {
                //    $("#StepNo").val(stepNo + 1);
                //    $("#btnGetTrips").trigger("click");
                //}

                $("#step5").removeClass("active");
                //$(".ReservationTabs .steps").removeClass("active");
                //$(".ReservationTabs #step" + stepNo).addClass("active");


                $("#btnGetTrips").trigger("click");

            }
            else {
                //e.preventDefault();
                //e.stopPropagation();
                //return false;
                //$(this).unbind('click');
            }

        } else {
            // do stuff if form is not valid
        }

        //$(this).removeAttr('disabled');

    });


    $(document).on('click', '#btnIAgreeStep1', function () {
        $('#hdnIAgreed').val("True")
        $("#btnNext").trigger("click");
    });
    

    /**********/

    $(document).on('click', '#printPDFAPI', function () {

    });
   
    /**********/

    $(document).on('click', '.radPayment', function () {
        $(".payment label").removeClass("lblradPayment");
        $(this).next().addClass("lblradPayment");
    });

    /**********/



    $(document).on('click', '#directTripsOnlyCheck', function () {
        if ($("#DirectTripsOnlyFilter").val() == "True") {
            $("#DirectTripsOnlyFilter").val('False');
        } else {
            $("#DirectTripsOnlyFilter").val('True');
        }
        update_trips();
    });

    $(document).on('click', '#lessDurationTimeCheck', function () {
        if ($("#LessDurationTime").val() == "True") {
            $("#LessDurationTime").val('False');
        } else {
            $("#LessDurationTime").val('True');
        }
        update_trips();
    });

    $(document).on('click', '#lowestPriceCheck', function () {
        if ($("#LowestPrice").val() == "True") {
            $("#LowestPrice").val('False');
        } else {
            $("#LowestPrice").val('True');
        }
        update_trips();
    });

    $(document).on('click', '#departureTimeAM', function () {
        $("#DepartureTime").val(1);
        update_trips();
    });

    $(document).on('click', '#departureTimePM', function () {
        $("#DepartureTime").val(2);
        update_trips();
    });

    $(document).on('click', '#clearAllFilter', function () {

        $("#JourneysList").val("");
        $("#JourneysList2").val("");

        $("#DirectTripsOnlyFilter").val('False');
        $("#LessDurationTime").val('False');
        $("#LowestPrice").val('False');

        $("#DepartureTime").val(0);

        $(".reservation_results tr.active").removeClass("active");
        $(".reservation_results td.activeTrip").removeClass("activeTrip");

        /**********/

        $("#directTripsOnlyCheck").prop("checked", false);
        $("#lessDurationTimeCheck").prop("checked", false);
        $("#lowestPriceCheck").prop("checked", false);

        $("#departureTimeAM").prop("checked", false);
        $("#departureTimePM").prop("checked", false);

        /**********/

        update_trips();

    });

    
    
    //$(document).on('click', '#directTripsOnlyCheck, #lessDurationTimeCheck, #lowestPriceCheck, #departureTimeAM, #departureTimePM', function () {

    //});


    /**********/

    function validateStations() {

        var DepartureStation = $("#DepartureStation").val();
        var ArrivalStation = $("#ArrivalStation").val();
        if (DepartureStation == ArrivalStation) {
            $("#ArrivalStation").val("");
            ShowModelMessage($("#hdnInvalidStation").val());
        }

    }

    $("#DepartureStation").change(function () {
        validateStations();
    });

    $("#ArrivalStation").change(function () {
        validateStations();
    });

    /***************************************************************************************************/


});

//$('body').on('DOMSubtreeModified', '#total_trips_partial', function () {

//});

function HideModelMessage() {
    $(".w44_msg").html('');
    $(".w44_msg").addClass("hidden");
}

function ShowModelMessage(message, msgType = 0) {

    if (msgType == 1) {
        $(".w44_msg").html('<div class="alert alert-success" >' + message + '</div>');
    } else if (msgType == 2) {
        $(".w44_msg").html('<div class="alert alert-warning" >' + message + '</div>');
    } else {
        $(".w44_msg").html('<div class="alert alert-danger" >' + message + '</div>');
    }

    $(".w44_msg").html('<div class="col-12">' + $(".w44_msg").html() + '</div>');

    $(".w44_msg").removeClass("hidden");

    if ($(".w44_msg").length) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".w44_msg").offset().top - 200
        }, 500);
    }

    //setTimeout(function () {
    //    $(".w44_msg").html('');
    //    $(".w44_msg").addClass("hidden");
    //}, 7000);

}

function loadingAjax(hide = true) {

    //var item = $(".DotNetloading");
    //if (hide) {
    //    item.addClass("hidehide");
    //    item.css("display", "none");
    //} else {
    //    if (item.hasClass("hidehide")) {
    //        item.removeClass("hidehide");
    //        item.css("display", "block");
    //    } else {
    //        item.addClass("hidehide");
    //        item.css("display", "none");
    //    }
    //}

    $([document.documentElement, document.body]).animate({
        scrollTop: $(".ReservationTabs").offset().top - 210
    }, 500);

}

function update_trips() {

    loadingAjax();
    $("#btnUpdateTrips").trigger("click");
    
}

ajax_call_after_bookNow = function () {

    loadingAjax();

    var goNext = false;

    var count = 0;
    $('.activeTrip').each(function () {
        count++;
    });

    var _TotalTrips = parseInt($("#TotalTrips").val());

    if (_TotalTrips == count) {
        $("#btnNext").trigger("click");
    } else {

        //ShowModelMessage($("#txtPlzSelectTrips").val());

        var tripNum = parseInt($("#hdnTripsSelectedBookNow").val());
        var current = $("#saptco_trip" + tripNum);
        current.addClass("hide");

        var next = $("#saptco_trip" + (tripNum + 1));
        if (next.length) {
            next.removeClass("hide");
        }
        else {
            goNext = true;
        }
    }


    if (goNext) {
        $("#btnNext").trigger("click");
    }


    //var goNext = false;

    //var nextStep = $(".saptco_trip.hide");
    //if (nextStep.length) {

    //    if (nextStep.prev().length) {
    //        nextStep.prev().addClass("hide");
    //        nextStep.removeClass("hide");
    //    }
    //    else {
    //        goNext = true;
    //    }
    //}

    //var tripNum = parseInt($("#hdnTripsSelectedBookNow").val());

    //if (tripNum > 0) {

    //    var current = $("#saptco_trip" + tripNum);
    //    current.addClass("hide");

    //    var next = $("#saptco_trip" + tripNum + 1);
    //    if (next.length) {
    //        next.removeClass("hide");
    //    }
    //    else {
    //        goNext = true;


    //    }

    //}


    //if (goNext) {

    //    // check if this is last trip then trigger the next step
    //    var count = 0;
    //    $('.activeTrip').each(function () {
    //        count++;
    //    });

    //    var _TotalTrips = parseInt($("#TotalTrips").val());
    //    if (_TotalTrips == count) {
    //        //$("#btnNext").trigger("click");
    //    } else {
    //        //ShowModelMessage($("#txtPlzSelectTrips").val());
    //    }

    //}



    ////var tripNum = $(this).attr("data").replace("tab_content", "");
    //var tripNum = $(".saptco_trip.hide").attr("id").replace("saptco_trip", "");
    //.attr("id").replace("saptco_trip", "")

    //var currentStep = parseInt(tripNum) - 1;
    //var nextStep = parseInt(tripNum);

    //var saptco_next_trip = $("#saptco_trip" + nextStep);
    //if (saptco_next_trip.length) {

    //    saptco_next_trip.removeClass("hide");
    //    saptco_next_trip.show();

    //    var saptco_current_trip = $("#saptco_trip" + currentStep);
    //    saptco_current_trip.addClass("hide");

    //}
    //else {

    //    // check if this is last trip then trigger the next step
    //    var count = 0;
    //    $('.activeTrip').each(function () {
    //        count++;
    //    });

    //    var _TotalTrips = parseInt($("#TotalTrips").val());
    //    if (_TotalTrips == count) {
    //        $("#btnNext").trigger("click");
    //    } else {
    //        //ShowModelMessage($("#txtPlzSelectTrips").val());
    //    }

    //}

    //var className = ".spanTripDate" + nextStep;
    //if ($(className).length) {
    //    $([document.documentElement, document.body]).animate({
    //        scrollTop: $(className).offset().top - 100
    //    }, 500);
    //}

}

Form_Reservation_Completed = function () { // xhr

    //alert(`Hi ${xhr.responseText}!`);

    loadingAjax();

    $("#btnPrevious").parent().removeClass("disabled");

    if ($('#hdnIsValidALLL').length) {

        ShowModelMessage($('#hdnErrorMessageALLL').val());

    }
    else {

        var stepNo = parseInt($("#StepNo").val());
        stepNo = stepNo + 1;
        
        $("#StepNo").val(stepNo);
        $("#step" + stepNo).html($("#reservation_results_all").html());
        $("#reservation_results_all").html('');

        $(".wizard-steps .li_steps").removeClass("completed").removeClass("active");
        for (var i = 1; i < stepNo; i++) {
            $(".wizard-steps .li_step" + i).addClass("completed");
        }

        $(".ReservationTabs .steps").removeClass("active");
        $(".ReservationTabs #step" + stepNo).addClass("active");

        $(".wizard-steps .li_step" + stepNo).addClass("active");



        //if (stepNo == 2) {
        //    //$(".card-footer").addClass("hide");
        //    //$("#btnNext").addClass("hide");
        //}

        //if (stepNo == 5) {
        //    $(".edit_saptco_trip").remove();
        //    $(".card-footer").remove();
        //    $("#Form_Reservation").addClass("hide");
        //}

        //if (stepNo == 6) {
        //    $(".edit_saptco_trip").remove();
        //    $(".card-footer").remove();
        //    $("#Form_Reservation").addClass("hide");
        //    $(".li_step5").addClass("completed");
        //}

        //$(".li_steps")

        //var isValid = $('#hdnIsValidALLL').val();

        //var valid = isValid == "True" || isValid == "true" || isValid == "1";

        //if (valid) {

        //}

    }

};


