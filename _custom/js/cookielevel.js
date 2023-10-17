

$(document).ready(function () {

    $(".cky-checkbox").change(function () {

        var item = $(this);

        if (item.attr("value") == 1) {
            item.prop("value", 0);
        }
        else {
            item.prop("value", 1);

            if (item.attr("id") == "cky-checkbox-3") {
                $("#cky-checkbox-2").trigger("click");
            }
        }

    });

    $(".btnSaveCookieLevel").click(function () {
        
        $("#divSetCookieLevel").html("");

        var level = 0;
        
        if ($('#cky-checkbox-2').attr("value") == 1) {
            level = 200;
        }

        if ($('#cky-checkbox-3').attr("value") == 1) {
            level = 1000;
        }

        if ($(this).attr("id") == "cky-btn-accept") {
            level = 1000;
        }

        $("#hdnLevel").val(level);

        $("#btnSetCookieLevel").trigger("click");
        $(".cookieinfo-close ").trigger("click");

        if ($(this).attr("id") == "cky-btn-accept") {
            $("#cky-consent").slideUp();
        } else {
            setTimeout(function () {
                $("#cky-consent").slideUp();
            }, 1500);
        }

    });

});

