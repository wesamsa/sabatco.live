(function (url, culture) { var xmlhttp = new XMLHttpRequest(); xmlhttp.open("POST", url, !0); xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); xmlhttp.send("url=" + encodeURIComponent(window.location.href) + "&culture=" + encodeURIComponent(culture)); })('/kentico.abtest/pagevisitconversionlogger/log', 'ar-sa');