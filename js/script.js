$(function() { //equivalent to document.ready

      $("#slides").slidesjs({
     navigation: {
      active: false,
      effect: "slide"
    },
      pagination: {
      active: false,
      effect: "slide"
    },
  play: {
      active: false,
      auto: true,
      interval: 4000,
      swap: true,
      pauseOnHover: true,
      restartDelay: 2500
   },
          width: 300,
          height: 480
    });


$("#selectable li").on("click", function() {
  if ($(this).hasClass("available") === true) {
  $(this).addClass("active").siblings().removeClass("active");
  }
});

 var reservations = [];
 var currentSeat;
 $(".seat").click(seatClick());
//takes user info and pushes it into an array
 function seatClick() {
   var seatNum;
   $(".seat").on("click",function(event){
     if ($(this).hasClass("available") === true) {
       $("#thanks").hide();
       $("form").slideDown().show();
       currentSeat = this;
       seatNum = currentSeat.id;
   }
   });
   $("form").on("submit", function(event) {
     event.preventDefault();
     var name = $("#nameField").val();
     reservations.push(
       {name: name,
       number: seatNum}
     ); //creates array in case you wanted to check total # of reservations
     $(currentSeat).addClass("reserved").removeClass("available active");
     $(currentSeat).text("Reserved");
     $(currentSeat).data({name: name}); //associates name with seat
     $("#nameField").val("");
     $("#thanks").show().html("<p>Thank you for your reservation, "+name+"!");
     $("form").hide();
   });
 } //end seatclick function

//hover with price information for VIP seats
 $(".vip").hover(
  function() {
    if ($(event.target).hasClass("reserved") === true) {
      $.noop();
    } else {
   $(this).append("<span></br>VIP $25</span>");
  }
  }, function() {
   $(this).find("span:last").remove();
 });
//hover with price info for other seats
 $(".available").hover(
  function() {
    if ($(event.target).hasClass("reserved") === true || $(event.target).hasClass("vip") === true) {
      $.noop();
    } else {
   $(this).append("<span></br>General Admission $10</span>");
  }
  }, function() {
   $(this).find("span:last").remove();
 });
 //end price info
 //hover with reserved info
 $(".seat").hover(
  function() {
    if ($(event.target).hasClass("reserved") === true && $(event.target).hasClass("vip") === true) {
      $(this).append("<span></br>by: "+$(this).data().name+"</br>VIP</span>");
    } else if ($(event.target).hasClass("reserved") === true) {
      $(this).append("<span></br>by: "+$(this).data().name+"</span>");
    } else {
   $.noop;
  }
  }, function() {
   $(this).find("span:last").remove();
 });


});
