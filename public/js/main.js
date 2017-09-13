
$(function() {
  $(".f1").click(function(){
    setTimeout(function(){
      $('#russianFactionPlayBtn').css('display', 'block');
    }, 1000);
    $('#germanFactionPlayBtn').css('display', 'none');
    $('#britishFactionPlayBtn').css('display', 'none');
    $('#JapaneseFactionPlayBtn').css('display', 'none');
    $('#americanFactionPlayBtn').css('display', 'none');
    // $('#russianFactionPlayBtn').css('opacity', '1');
    // $('#germanFactionPlayBtn').css('opacity', '0');
    // $('#britishFactionPlayBtn').css('opacity', '0');
    // $('#JapaneseFactionPlayBtn').css('opacity', '0');
    // $('#americanFactionPlayBtn').css('opacity', '0');
    // setTimeout(function(){
    //   $('#germanFactionPlayBtn').css('display', 'none');
    //   $('#britishFactionPlayBtn').css('display', 'none');
    //   $('#JapaneseFactionPlayBtn').css('display', 'none');
    //   $('#americanFactionPlayBtn').css('display', 'noen');
    // }, 1000);
  });
  $(".f2").click(function(){
    setTimeout(function(){
      $('#germanFactionPlayBtn').css('display', 'block');
    }, 1000);
    $('#russianFactionPlayBtn').css('display', 'none');
    $('#britishFactionPlayBtn').css('display', 'none');
    $('#JapaneseFactionPlayBtn').css('display', 'none');
    $('#americanFactionPlayBtn').css('display', 'none');
    // $('#russianFactionPlayBtn').css('opacity', '0');
    // $('#germanFactionPlayBtn').css('opacity', '1');
    // $('#britishFactionPlayBtn').css('opacity', '0');
    // $('#JapaneseFactionPlayBtn').css('opacity', '0');
    // $('#americanFactionPlayBtn').css('opacity', '0');
    // setTimeout(function(){
    //   $('#russianFactionPlayBtn').css('display', 'none');
    //   $('#britishFactionPlayBtn').css('display', 'none');
    //   $('#JapaneseFactionPlayBtn').css('display', 'none');
    //   $('#americanFactionPlayBtn').css('display', 'noen');
    // }, 1000);
  });
  $(".f3").click(function(){
    setTimeout(function(){
      $('#britishFactionPlayBtn').css('display', 'block');
    }, 1000);
    $('#germanFactionPlayBtn').css('display', 'none');
    $('#russianFactionPlayBtn').css('display', 'none');
    $('#JapaneseFactionPlayBtn').css('display', 'none');
    $('#americanFactionPlayBtn').css('display', 'none');
  });
  $(".f4").click(function(){
    setTimeout(function(){
      $('#JapaneseFactionPlayBtn').css('display', 'block');
    }, 1000);
    $('#germanFactionPlayBtn').css('display', 'none');
    $('#russianFactionPlayBtn').css('display', 'none');
    $('#britishFactionPlayBtn').css('display', 'none');
    $('#americanFactionPlayBtn').css('display', 'none');
  });
  $(".f5").click(function(){
    setTimeout(function(){
      $('#americanFactionPlayBtn').css('display', 'block');
    }, 1000);
    $('#germanFactionPlayBtn').css('display', 'none');
    $('#russianFactionPlayBtn').css('display', 'none');
    $('#britishFactionPlayBtn').css('display', 'none');
    $('#JapaneseFactionPlayBtn').css('display', 'none');
  });
  // $('#russianFactionPlayBtn').click(function(){})
  // $('#germanFactionPlayBtn').click(function(){})
  // $('#britishFactionPlayBtn').click(function(){})
  // $('#JapaneseFactionPlayBtn').click(function(){})
  // $('#americanFactionPlayBtn').click(function(){})

  $(".StartView").interactive_bg({
    strength: 25,              // Movement Strength when the cursor is moved. The higher, the faster it will reacts to your cursor. The default value is 25.
    scale: 1.05,               // The scale in which the background will be zoomed when hovering. Change this to 1 to stop scaling. The default value is 1.05.
    animationSpeed: "100ms",   // The time it takes for the scale to animate. This accepts CSS3 time function such as "100ms", "2.5s", etc. The default value is "100ms".
    contain: true,             // This option will prevent the scaled object/background from spilling out of its container. Keep this true for interactive background. Set it to false if you want to make an interactive object instead of a background. The default value is true.
    wrapContent: false         // This option let you choose whether you want everything inside to reacts to your cursor, or just the background. Toggle it to true to have every elements inside reacts the same way. The default value is false
  });

  var resizeTime = 100;     // total duration of the resize effect, 0 is instant
  var resizeDelay = 100;    // time to wait before checking the window size again
                            // the shorter the time, the more reactive it will be.
                            // short or 0 times could cause problems with old browsers.

  // Resize the map to fit within the boundaries provided
  //
  // function resize(maxWidth,maxHeight) {
  //    var image =  $('img'),
  //       imgWidth = image.width(),
  //       imgHeight = image.height(),
  //       newWidth=0,
  //       newHeight=0;
  //
  //   if (imgWidth/maxWidth>imgHeight/maxHeight) {
  //       newWidth = maxWidth;
  //   } else {
  //       newHeight = maxHeight;
  //   }
  //   image.mapster('resize',newWidth,newHeight,resizeTime);
  // }
  //
  // // Track window resizing events, but only actually call the map resize when the
  // // window isn't being resized any more
  //
  // function onWindowResize() {
  //
  //   var curWidth = $(window).width(),
  //       curHeight = $(window).height(),
  //       checking=false;
  //   if (checking) {
  //       return;
  //           }
  //   checking = true;
  //   window.setTimeout(function() {
  //       var newWidth = $(window).width(),
  //          newHeight = $(window).height();
  //       if (newWidth === curWidth &&
  //           newHeight === curHeight) {
  //           resize(newWidth,newHeight);
  //       }
  //       checking=false;
  //   },resizeDelay );
  // }
  //
  // $(window).bind('resize',onWindowResize);
  //

 //  $(window).resize(function() {
 //   $(".StartView").css({
 //     width: $(window).outerWidth(),
 //     height: $(window).outerHeight()
 //   })
 // })

    // $('#AAMAP41').maphilight();

    // $('#Brits').click(function(){
    //   var britishSelected = true;
    //   var germanySelected = false;
    //   var russiaSelected = false;
    //   var japsSelected = false;
    //   var usSelected = false;
    //
    //   // $('.ContainerUK').css('display', '');
    // })
});

// $('#FrenchWestAfrica').click(function(){
//   alert('You selected French West Africa with IPCS value of ' + $('#FrenchWestAfrica').attr('value'));
// })
