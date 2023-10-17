
//map Customization
var GMap;
var directionsService; //Direction Services
var directionsDisplay;
var UseInfoBubble = false;

var markers = [];
var EnableHoverWindow = false;

var UserLocationAvilable = false; //indecates if the user location is avilable or not
var UserPosition; //User detected Position

var GoogleMaps_map = null;

$(document).ready(function () {

    function initMap() {
        var myOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            scaleControl: true,
            navigationControl: true,
            keyboardShortcuts: false,
            draggable: true,
            navigationControlOptions: {
                style: google.maps.NavigationControlStyle.DEFAULT
            }
        };

        GoogleMaps_map = new google.maps.Map(document.getElementById("map"), myOptions);
        GoogleMaps_map.setZoom(6);
        GoogleMaps_map.setCenter(new google.maps.LatLng(24.6852434, 43.5681353));
    }

    initMap();

});



var ShowUserLocation = function (title, content, iconurl, notsupportedmessage, errormessage) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);

            var marker = new google.maps.Marker({
                map: GMap,
                position: pos,
                title: title,
                icon: iconurl,
                animation: google.maps.Animation.DROP
            });

            var infowindow = new google.maps.InfoWindow({
                //map: GMap,
                //position: pos,

                content: content
            });

            infowindow.open(GMap, marker);
            UserLocationAvilable = true;
            directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(GMap);
            GMap.setCenter(pos);
            smoothZoom(GMap, 12, GMap.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level

            UserPosition = pos;

        }, function () {
            handleNoGeolocation(errormessage);
        });
    }
    else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(notsupportedmessage);
    }
}

function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function () { map.setZoom(cnt) }, 250); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function handleNoGeolocation(message) {
    //if (errorFlag) {
    //    var content = 'لم نتمكن من تحديد موقعك.';
    //    //'Error: The Geolocation service failed.';
    //    jQuery('.nouserlocation .alert-label').html(content);
    //    jQuery('.nouserlocation').show();
    //} else {
    //    var content = 'عذراً, المتصفح المستخدم لا يدعم تحديد الموقع الجغرافى.';
    //    //'Error: Your browser doesn\'t support geolocation.';
    //    jQuery('.nouserlocation .alert-label').html(content);
    //    jQuery('.nouserlocation').show();
    //}

    //  var options = {
    //    map: map,
    //    position: new google.maps.LatLng(60, 105),
    //    content: content
    //  };

    //var infowindow = new google.maps.InfoWindow(options);
    //map.setCenter(options.position);

    var content = message;
    //'Error: The Geolocation service failed.';
    jQuery('.nouserlocation .alert-label').html(content);
    jQuery('.nouserlocation').show();
}

// Sets the map on all markers in the array.
function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    //markers=[];
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setAllMap(null);
    //console.log('Clear All Markers');
}

// Shows any markers currently in the array.
function showMarkers() {
    setAllMap(GMap);
    console.log('Show All Markers');
}

function setMapLocation(latitude, longitude) {
    var point = new google.maps.LatLng(latitude, longitude);
    GMap.panTo(point);
}

function addGoogleMarker(map, latitude, longitude, title, content, zoom, iconURL) {

    var DirectionAdded = false;

    GMap = map;

    // Initialize point coordinates
    var point = new google.maps.LatLng(latitude, longitude);

    // Create Marker object
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        title: title,
        icon: "/_custom/images/marker4.png" //iconURL
    });

    // Create info window object
    var infoWindowsVisible = false;
    //New styled window
    var wname = new google.maps.InfoWindow({
        content: content
    });

    if (UseInfoBubble) {
        wname = infoBubble = new InfoBubble({
            map: map,
            content: content,
            position: point,
            shadowStyle: 1,
            padding: 0,
            //backgroundColor: 'rgb(57,57,57)',
            borderRadius: 5,
            arrowSize: 10,
            borderWidth: 1,
            borderColor: '#2c2c2c',
            disableAutoPan: true,
            hideCloseButton: false,
            arrowPosition: 30,
            backgroundClassName: 'MapWindow',
            arrowStyle: 2,
            maxWidth: 300,
            maxHeight: 200
        });
    }


    var hoverwindow = new google.maps.InfoWindow({
        content: '<span class="name">' + title + '</span>'
    });

    // Register click event
    google.maps.event.addListener(marker, 'click', function () {
        map.setCenter(point);
        var oZoom = map.getZoom();
        if (oZoom != zoom) { map.setZoom(zoom); }
        if (UserLocationAvilable) {
            if (DirectionAdded === false) {
                console.log('info name content get.');
                wname.setContent(wname.getContent() + "<a href='javascript:void(0)' onclick='ShowDirectionsTo(" + latitude + "," + longitude + ");' class='getdirections'>Directions</a>");
                DirectionAdded = true;
                console.log('Directions added....');
            }
        }
        wname.open(map, marker);
        infoWindowsVisible = true;
        if (EnableHoverWindow)
            hoverwindow.close(map, marker);

        jQuery('.MapWindow').parent().parent().addClass('InformatioWindow');
    });

    //register close InfoWindow click
    google.maps.event.addListener(wname, 'closeclick', function () {
        infoWindowsVisible = false;
    });

    //register hover on Map PinPoint
    google.maps.event.addListener(marker, 'mouseover', function () {
        if (EnableHoverWindow) {
            console.log('wname visible = ' + infoWindowsVisible);
            if (!infoWindowsVisible) {
                hoverwindow.open(map, marker);
            }
        }
    });

    //register mouse out on Map PinPoint
    google.maps.event.addListener(marker, 'mouseout', function () {
        if (EnableHoverWindow) {
            hoverwindow.close(map, marker);
        }
    });

    markers.push(marker);
    //console.log('Add Maker Called GMap');
}

function ShowDirectionsTo(latitude, longitude) {
    if (directionsService != null && UserLocationAvilable) {
        var start = UserPosition;
        var end = new google.maps.LatLng(latitude, longitude);
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }
    return false;
}

function ShowMarker(latitude, longitude) {
    var point = new google.maps.LatLng(latitude, longitude);


    for (var i = 0; i < markers.length; i++) {
        if (markers[i].getPosition().equals(point)) {
            markers[i].setMap(GMap);
            console.log('Marker Shwed...............');
        }
    }
}


//Customization



