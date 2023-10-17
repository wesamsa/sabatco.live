 (function ($) {
    'use strict';

     $.fn.formAutoChange = function (options) {
        // Default settings
        var settings = $.extend({
            targetContainerSelector: "#target-list",
            url: ""
        }, options);

        var onSuccess = function (data) {
            $(settings.targetContainerSelector).html(data);
        }

         var getAjaxParameters = function (htmlControl) {
             
             if ($(settings.targetContainerSelector).length) {
                 $([document.documentElement, document.body]).animate({
                     scrollTop: $(settings.targetContainerSelector).offset().top - 200
                 }, 500);
             }

            var $form = $(htmlControl).closest("form");
             //$form.find(htmlControl.id).remove();
             //$form.append("<input type='hidden' id='" + htmlControl.id + "' name='" + htmlControl.id + "' value='" + htmlControl.value + "' />");

            return {
                url: $form.attr("action"),
                method: $form.attr("method"),
                data: $form.serialize()
            }
        }

         var ajaxCall = function () {
            var ajaxParams = getAjaxParameters(this);
            $.ajax({
                method: ajaxParams.method,
                url: ajaxParams.url,
                data: ajaxParams.data,
                success: onSuccess
            });
        }

        return this.change(ajaxCall);
    };

}(jQuery));
