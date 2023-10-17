// search box
$(".search-link").click(function () {
  $("#searchbox").toggleClass("d-none");
});
$("#searchbox").focusout(function () {
  $("#searchbox").addClass("d-none");
});

// offers carousels

$("#offers-from").change(function () {
  if ($(this).val() === "abha") {
      $("#riyadh-offers").addClass("d-none");
      $("#abha-offers").removeClass("d-none");
  } else if ($(this).val() === "riyadh") {
      $("#abha-offers").addClass("d-none");
      $("#riyadh-offers").removeClass("d-none");
  }
});

// bus rent basis

$("input[type=radio][name=rent-basis]").change(function () {
  if (this.value == "daily-rent") {
      $(".numberOfHours").addClass("d-none");
      $(".numberOfDays").removeClass("d-none");
  } else if (this.value == "hour-rent") {
      $(".numberOfDays").addClass("d-none");
      $(".numberOfHours").removeClass("d-none");
  }
});

// bus trip type

$("input[type=radio][name=trip-type]").change(function () {
  if (this.value == "oneway") {
      $(".roundtrip").addClass("d-none");      
      $(".multi").addClass("d-none");
      $(".oneway").removeClass("d-none");
  } else if (this.value == "roundtrip") {
    $(".oneway").removeClass("d-none"); 
      $(".roundtrip").removeClass("d-none");
      $(".multi").addClass("d-none");
  } else if (this.value == "multi") {
    $(".oneway").addClass("d-none");
    $(".roundtrip").addClass("d-none");
    $(".multi").removeClass("d-none");
}
});

// trip schedule pop over
  
$(".bookTrip").on("show.bs.popover", function () {
   setTimeout(function () {
      $(".bookNow").attr("data-bs-toggle", "modal");
      $(".bookNow").attr("data-bs-target", "#editSearchTravel");

      $(".bookNow").click(function () {
          $(".bookTrip").popover("hide");
      });
  }, 100);
});

$(function () {
  $("[data-toggle='popover']").popover({
      placement: 'top',
      html: true,
      content: function () {
          var content = $(this).attr("data-content");
          return $(content).children(".popover-body").html();
      },
      title: function () {
          var title = $(this).attr("data-content");
          return $(title).children(".popover-heading").html();
      },
  });
});

$(document).mouseup(function (e) {
  var popcontainer = $(".popover");
  if (!popcontainer.is(e.target) && popcontainer.has(e.target).length === 0) {
      $(".bookTrip").popover("hide");
      $(".passengersTip").popover("hide");
  }
});


// search trips - passenger type

$("input[type=radio][name=passengerType]").change(function () {
  if (this.value == "registeredPassenger") {    
      $(".newPassenger").attr("disabled","");
      $(".registeredPassenger").removeClass("d-none");
  } else if (this.value == "newPassenger") {
    $(".newPassenger").removeAttr("disabled");
    $(".registeredPassenger").addClass("d-none");
  }
});


// search trips - add passengers 

$("#idType").change(function () {
  if ($(this).val() === "nid") {
      $(".nationalIdNumber").removeClass("d-none");
      $(".versionNumber").removeClass("d-none");
      
      $(".iqamaNumber").addClass("d-none");
      $(".passportNumber").addClass("d-none");
      $(".gccIdNumber").addClass("d-none");       
      $(".nationality").addClass("d-none");

  } else if ($(this).val() === "iqama") {
      $(".iqamaNumber").removeClass("d-none");      
      $(".versionNumber").removeClass("d-none");
      $(".nationality").removeClass("d-none");    
      
      $(".nationalIdNumber").addClass("d-none");
      $(".passportNumber").addClass("d-none");
      $(".gccIdNumber").addClass("d-none");             
      
  }  else if ($(this).val() === "passport") {

      $(".passportNumber").removeClass("d-none");            
      $(".nationality").removeClass("d-none");    
      
      $(".versionNumber").addClass("d-none");
      $(".nationalIdNumber").addClass("d-none");
      $(".iqamaNumber").addClass("d-none");
      $(".gccIdNumber").addClass("d-none");
     
    
} else if ($(this).val() === "gcc") {
      $(".gccIdNumber").removeClass("d-none");      
      $(".versionNumber").removeClass("d-none");
      $(".nationality").removeClass("d-none");    
      
      $(".nationalIdNumber").addClass("d-none");
      $(".iqamaNumber").addClass("d-none");
      $(".passportNumber").addClass("d-none");  
}

});


// sadad payment
$("img.sadad").click(function () {
  $(".sadad").toggleClass("d-none");
  $(".payment").addClass("d-none");
});
 
 // reservation search
$(".reservationSearch button").click(function () {
  $(".otpConfirm").removeClass("d-none");
  $(".reservationSearch").addClass("d-none");

});
 

// manage bookings calendar
   
$(".editSelectedTickets a").click(function () {
  $(".pleaseSelectDate").removeClass("d-none"); 

});

$(".pleaseSelectDate a").click(function () {
  $(".chooseTickets").removeClass("d-none"); 
  
  $(".ticketsResults").addClass("d-none");
  $(".pleaseSelectDate").addClass("d-none");

});



$(".transferConfirm .continueBtn").click(function () {
  $(".transferSummary").removeClass("d-none");  
  $(".transferConfirm").addClass("d-none");  
});