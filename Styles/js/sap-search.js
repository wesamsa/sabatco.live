// choose station

$("#book-your-trip .station-control .control_field_input").click(function () {
  $(".sap-search").addClass("search-station-opened");
  $(".stations").removeClass("d-none");
  $(".choose-date").addClass("d-none");
  $(".passengers").addClass("d-none");

  $(".sap-search").removeClass("search-date-opened");
  $(".sap-search").removeClass("search-pax-opened");
});

// choose date

$("#book-your-trip .date-control .control_field_button").click(function () {
  $(".sap-search").addClass("search-date-opened");
  $(".choose-date").removeClass("d-none");

  $(".sap-search").removeClass("search-station-opened");
  $(".sap-search").removeClass("search-pax-opened");

  $(".stations").addClass("d-none");
  $(".passengers").addClass("d-none");
});

// choose passangers

$("#book-your-trip .pax-control .control_field_button").click(function () {
  $(".stations").addClass("d-none");
  $(".choose-date").addClass("d-none");
  $(".passengers").removeClass("d-none");

  $(".sap-search").addClass("search-pax-opened");

  $(".sap-search").removeClass("search-station-opened");
  $(".sap-search").removeClass("search-date-opened");
});

// close control options

$("#book-your-trip .control_options_close_button").click(function () {
  $(".stations").addClass("d-none");
  $(".choose-date").addClass("d-none");
  $(".passengers").addClass("d-none");

  $(".sap-search").removeClass("search-station-opened");
  $(".sap-search").removeClass("search-date-opened");
  $(".sap-search").removeClass("search-pax-opened");
});

// insert promocode

$(".promocode-control_link").click(function () {
  $(".promocode-control_trigger").addClass("d-none");
  $(".promocode-control-open").removeClass("d-none");
});

$(".promocode_button_cancel").click(function () {
  $(".promocode-control_trigger").removeClass("d-none");
  $(".promocode-control-open").addClass("d-none");
});

  
// choose bus type

$("#rent-your-bus .buses-type .control_field_input").click(function () {
   
  $(".buses-type .bus-types").removeClass("d-none");
  $(".rent-date .choose-date").addClass("d-none"); 
  $(".rent-from-to .stations").addClass("d-none");
});

// choose date

$("#rent-your-bus .date-control .control_field_button").click(function () {
  $(".sap-search").addClass("search-date-opened");
  $(".rent-date .choose-date").removeClass("d-none");

  $(".sap-search").removeClass("search-station-opened");
 
  $(".buses-type .bus-types").addClass("d-none");
   
});

// choose rent from - to

$("#rent-your-bus .rent-from-to .control_field_input").click(function () {
   
  $(".rent-from-to .stations").removeClass("d-none");
  $(".buses-type .bus-types").addClass("d-none");
   
});

 
// close control options

$("#rent-your-bus .control_options_close_button").click(function () {
  $(".buses-type .bus-types").addClass("d-none");
  $(".rent-date .choose-date").addClass("d-none");
  $(".rent-from-to .stations").addClass("d-none");
   

  $(".sap-search").removeClass("search-station-opened");
  $(".sap-search").removeClass("search-date-opened");
  $(".sap-search").removeClass("search-pax-opened");
});



// bus rent type radio buttons

$('input[type=radio][name=rent-type]').change(function() {
  if (this.value == 'between-cities') {
    $(".inside-city").addClass("d-none");
    $(".between-cities").removeClass("d-none");
    $(".rent-from-to .stations").css("left", "70%");
  }
  else if (this.value == 'inside-city') {
    $(".between-cities").addClass("d-none");
    $(".inside-city").removeClass("d-none");
    $(".rent-from-to .stations").css("left", "77%");
  }
});

$("#rent-your-bus .inside-city .control_field_input").click(function () {
   
  $(".rent-from-to .stations").css("left", "77%");
   
});

$("#rent-your-bus .between-cities .control_field_input").click(function () {
   
  $(".rent-from-to .stations").css("left", "70%");
   
});



