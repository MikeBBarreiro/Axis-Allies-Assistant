$(function() {
    // responsiveImageMap('#AAactualMap',1010);
    $('#AAMAP41').maphilight();
    // $('#AAMAP41').rwdImageMaps();
    // $('#AAMAP41').imageMapResize();
    $("#myModal1").modal();

    $('.btnCog').click(function(){$('.sideNav').css('display','block');})
    $('.btnCog_close').click(function(){$('.sideNav').css('display','none');})

    $('#Brits').click(function(){
      var britishSelected = true;
      var germanySelected = false;
      var russiaSelected = false;
      var japsSelected = false;
      var usSelected = false;
      // $('.ContainerUK').css('display', '');
    });

    $('.laptopMap').addClass('image-map-wrapper us-map');

    $("area").hover(function(){
      $('#CurrentTerfHovered').html($('#' + this.id)[0].alt);
    });

  //   var ImageMap = function (map, img) {
  //         var n,
  //             areas = map.getElementsByTagName('area'),
  //             len = areas.length,
  //             coords = [],
  //             previousWidth = 128;
  //         for (n = 0; n < len; n++) {
  //             coords[n] = areas[n].coords.split(',');
  //         }
  //         this.resize = function () {
  //             var n, m, clen,
  //                 x = img.offsetWidth / previousWidth;
  //             for (n = 0; n < len; n++) {
  //                 clen = coords[n].length;
  //                 for (m = 0; m < clen; m++) {
  //                     coords[n][m] *= x;
  //                 }
  //                 areas[n].coords = coords[n].join(',');
  //             }
  //             previousWidth = document.body.clientWidth;
  //             return true;
  //         };
  //         window.onresize = this.resize;
  //     },
  //     imageMap = new ImageMap(document.getElementById('AAMAP41'), document.getElementById('AAMAP41D'));
  // imageMap.resize();
  // return;
  //

  function responsiveImageMap(wrapper,originalwidth){
    var thisMap = $(wrapper).find('map');
    var thisArea = $(wrapper).find('area');
    var thisImage = $(wrapper).find('img');
    var originalCoords = [];
  	$(thisArea).each(function(i){
  		originalCoords[i] = $(this).attr('coords');
  		originalCoords[i] = originalCoords[i].split(',');
  	});
  	var newWidth = parseInt($(thisImage).width());
  	var percentDifference = newWidth / originalwidth;
  	$(thisArea).each(function(i){
  		var newCoords = [];
  		$.each(originalCoords[i],function(e){
  			newCoords.push(originalCoords[i][e] * percentDifference);
  		});
  		var newCoords = newCoords.join(',');
  		$(this).attr('coords', newCoords);
  	});
	// resize window
  	$(window).resize(function(){
  		var newWidth = parseInt($(thisImage).width());
  		var percentDifference = newWidth / originalwidth;
  		$(thisArea).each(function(i){
  			var newCoords = [];
  			$.each(originalCoords[i],function(e){
  				newCoords.push(originalCoords[i][e] * percentDifference);
  			});
  			var newCoords = newCoords.join(',');
  			$(this).attr('coords', newCoords);
  		});
  	});
  }

});


var globalIPC = 17
var currentIPC = 0;
var earnings = 0;
var earningsCount = 0;
var earningsSub = 0;
var lastipcNum = 0

// currentIPC = currentIPC + globalIPC;
$('#GlobalIPCCount').html(globalIPC);
$('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
$('#earningsCount').html();
$('#earningsSub').html();


// $('#FrenchWestAfrica').click(function(){
//   alert('You selected French West Africa with IPCS value of ' + $('#FrenchWestAfrica').attr('value'));
// })

$('area').click(function(e){
  var selectedTerf = this;

  if($(this).hasClass('cap')){
    if(selectedTerf.id === 'EasternUnitedStates'){
      swal({
      title: "General",
      text: "Did you lose this territory? If so, you now give all your IPC's to the opponent that has taken your capital. You now also dont earn points.",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#D33B3E",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: true,
      closeOnCancel: true,
      customClass: 'saCustomClass'
    },
    function(isConfirm){
      if (isConfirm) {
        // swal("Blast!", "Bolster the defences!");
        e.preventDefault();
        var data = $('#' + selectedTerf.id).data('maphilight') || {};
          data.fillColor = '89878B';
          data.strokeColor = '454346';
          data.fillOpacity = '0.4';
       //ata.alwaysOn = !data.alwaysOn;
       // This sets the new data, and finally checks for areas with alwaysOn set
        $('#' + selectedTerf.id).data('maphilight', data).trigger('alwaysOn.maphilight');

        earningsSub -= Number($('#' + selectedTerf.id).attr('value'))

        if(earningsSub < 0){
          $('#earningsSub').html("You've lost " + Math.abs(earningsSub) + " IPC's");
          // earningsSub = 0
        }

        earnings = $('#' + selectedTerf.id).attr('value');
        globalIPC = globalIPC - Number(earnings);

        globalIPC = 0;
        currentIPC = 0;

        $('#GlobalIPCCount').html(globalIPC);
        $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
        $('#' + selectedTerf.id).removeClass('cap');
      }
    });
  }else{
      var terr = selectedTerf
      // swal("no!", "You've captured " + selectedTerf.alt  , "success");
      swal({
          title: "General",
          text: "Did you lose " + selectedTerf.alt + "?",
          type: "info",
          showCancelButton: true,
          confirmButtonColor: "#D33B3E",
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          closeOnConfirm: true,
          closeOnCancel: true,
          customClass: 'saCustomClass'
        },
        function(isConfirm){
          if (isConfirm) {
            // swal("Blast!", "Bolster the defences!");
            e.preventDefault();
            var data = $('#' + selectedTerf.id).data('maphilight') || {};
              data.fillColor = '89878B';
              data.strokeColor = '454346';
              data.fillOpacity = '0.4';
           //ata.alwaysOn = !data.alwaysOn;
           // This sets the new data, and finally checks for areas with alwaysOn set
            $('#' + selectedTerf.id).data('maphilight', data).trigger('alwaysOn.maphilight');

            earningsSub -= Number($('#' + selectedTerf.id).attr('value'));

            if(earningsSub < 0){
              if(globalIPC <= 0){
                $('#earningsSub').html("You've lost " + Math.abs(earningsSub) + " IPC's worth");
              }else{
                $('#earningsSub').html("You've lost " + Math.abs(earningsSub) + " IPC's");
              }
              // earningsSub = 0
            }

            earnings = $('#' + selectedTerf.id).attr('value');
            globalIPC = globalIPC - Number(earnings);
            if(globalIPC <= 0){
              $('#GlobalIPCCount').html(0);
            }else{
              $('#GlobalIPCCount').html(globalIPC);
            }
            $('#' + selectedTerf.id).removeClass('cap');

          }

        });
    }
}else{
    swal({
      title: "General",
      text: "Did you capture " + selectedTerf.alt + "?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#30BD44",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true,
      customClass: 'saCustomClass'
    },
    function(isConfirm){
      if (isConfirm) {
        e.preventDefault();
        if(selectedTerf.id === 'EasternUnitedStates'){
          $('#' + selectedTerf.id).addClass('cap');
          var dood = [];
          swal({
            title: "Good job!",
            type: "success",
            text: "You've taken back Your Captial! You can now earn IPC's, and All your captured territories that your allies have, are now liberated and belong to you. Although, the territories that the enemy has captured remains theirs. Please select those territories, if there are any!",
            // timer: 6000,
            customClass: 'saCustomClass'
          });
          // $(".American").each(function(){
          //   $(this).addClass('cap');
          //   globalIPC += Number($(this).attr('value'));
          // });
          $(".American").each(function(){
            // var americanIPCsCap = Number($(this).attr('value'));
            if($(this).hasClass('cap')){
              globalIPC += Number($(this).attr('value'));
            }else{
              globalIPC += Number($(this).attr('value'));
              $(this).addClass('cap');
            }

            var data = $(this).data('maphilight') || {};
              data.fillColor = '1871B5'; // Sample color
              data.strokeColor = '020100';
              data.fillOpacity = '0.7';
            $(this).data('maphilight', data).trigger('alwaysOn.maphilight');


          });

          $(".cap").each(function(){
            if(this.className !== 'American cap'){
              var value = $('#' + this.id).attr('value');

              globalIPC = globalIPC + Number(value);
              // var data = $(this).data('maphilight') || {};
              //   data.fillColor = '1A1B23'; // Sample color
              //   data.strokeColor = '020100';
              //   data.fillOpacity = '0.7';
              // $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
              $('#GlobalIPCCount').html(globalIPC);
            }
          });

          if(earningsCount > 0){
            $('#earningsCount').html("You've earned " + Math.abs(earningsCount) + " IPC's");
            // earningsCount = 0
          }
          $('#GlobalIPCCount').html(globalIPC);
          return;
        }else if(selectedTerf.id === 'Germany'){
          // swal({
          //   title: "Outstanding!",
          //   type: "success",
          //   text: "You've taken Germany's Captial! You take all the Germans IPC's and they now cannot earn IPC's.",
          //   // timer: 6000,
          //   customClass: 'saCustomClass'
          // })
          swal({
            title: "Outstanding!",
            text: "You've taken Germany's Captial! You take all the Germans IPC's and they now cannot earn IPC's. How many IPC's did you take from the Germans? Please write a number, as this will be added to your current IPC's",
            type: "input",
            showCancelButton: false,
            closeOnConfirm: false,
            animation: "slide-from-top",
            customClass: 'saCustomClass',
            inputPlaceholder: "How Many IPC's did you take?"
          },
          function(inputValue){
            if (inputValue === false) {return false;}

            if (inputValue === "") {
              swal.showInputError("You must write how many IPC's you have taken as a number, even if its the number 0.");
              return false
            }

            // swal("General", "You have earned " + inputValue + " IPC's", "success");
            swal({
              title: "General!",
              type: "success",
              text: "You've taken Germany's Captial! You have earned " + inputValue + " IPC's",
              // timer: 6000,
              customClass: 'saCustomClass'
            });

            currentIPC = Number(inputValue) + currentIPC;
            $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
          });
        }else if(selectedTerf.id === 'Japan'){
          // swal({
          //   title: "Outstanding!",
          //   type: "success",
          //   text: "You've taken the Japaneas Captial! You take all the Japaneas IPC's and they now cannot earn IPC's.",
          //   // timer: 6000,
          //   customClass: 'saCustomClass'
          // })
          swal({
            title: "Outstanding!",
            text: "You've taken the Japaneas Captial! You take all the Japaneas IPC's and they now cannot earn IPC's. How many IPC's did you take from the Japanese? Please write a number, as this will be added to your current IPC's",
            type: "input",
            showCancelButton: false,
            closeOnConfirm: false,
            animation: "slide-from-top",
            customClass: 'saCustomClass',
            inputPlaceholder: "How Many IPC's did you take?"
          },
          function(inputValue){
            if (inputValue === false) {return false;}

            if (inputValue === "") {
              swal.showInputError("You must write how many IPC's you have taken as a number, even if its the number 0.");
              return false
            }

            // swal("General", "You have earned " + inputValue + " IPC's", "success");
            swal({
              title: "General!",
              type: "success",
              text: "You've taken Japan's Captial! You have earned " + inputValue + " IPC's",
              // timer: 6000,
              customClass: 'saCustomClass'
            });

            currentIPC = Number(inputValue) + currentIPC;
            $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
          });
        }else if(selectedTerf.id === 'Russia'){
          swal({
            title: "Liberated!",
            type: "success",
            text: "You liberated the Russian captial! They can now start earning IPC's. All the USSR territories you captured, return to them. ",
            // timer: 6000,
            customClass: 'saCustomClass'
          });
          $(".Russian.cap").each(function(){
            var russianIPCsCap = Number($(this).attr('value'));
            globalIPC = globalIPC - russianIPCsCap;
            $('#GlobalIPCCount').html(globalIPC);
            var data = $(this).data('maphilight') || {};
            data.fillColor = '89878B'; // Sample color
            data.strokeColor = '454346';
            data.fillOpacity = '0.4';

            $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
            $(this).removeClass('cap');
          });
          return
        }else if(selectedTerf.id === 'UK'){
          swal({
            title: "Liberated!",
            type: "success",
            text: "You liberated the British captial! They can now start earning IPC's. All the British territories you captured, return to them. ",
            // timer: 6000,
            customClass: 'saCustomClass'
          });
          $(".uk.cap").each(function(){
            var russianIPCsCap = Number($(this).attr('value'));
            globalIPC = globalIPC - russianIPCsCap;
            $('#GlobalIPCCount').html(globalIPC);
            var data = $(this).data('maphilight') || {};
            data.fillColor = '89878B'; // Sample color
            data.strokeColor = '454346';
            data.fillOpacity = '0.4';

            $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
            $(this).removeClass('cap');
          });
          return
        }else{
          var terr = selectedTerf
          swal({
            title: "Good job!",
            type: "success",
            text: "You've captured " + selectedTerf.alt,
            // timer: 6000,
            customClass: 'saCustomClass'
          });
        }
        var data = $('#' + selectedTerf.id).data('maphilight') || {};
          data.fillColor = '1871B5'; // Sample color
          data.strokeColor = '020100';
          data.fillOpacity = '0.7';
        //  data.alwaysOn = !data.alwaysOn;
        // This sets the new data, and finally checks for areas with alwaysOn set
        $('#' + selectedTerf.id).data('maphilight', data).trigger('alwaysOn.maphilight');

        earningsCount += Number($('#' + selectedTerf.id).attr('value'));

        if(earningsCount > 0){
          $('#earningsCount').html("You've earned " + Math.abs(earningsCount) + " IPC's");
          // earningsCount = 0
        }

        earnings = $('#' + selectedTerf.id).attr('value');
        globalIPC = globalIPC + Number(earnings);
        //
        // $('#GlobalIPCCount').html(globalIPC);
        if(globalIPC <= 0){
          $('#GlobalIPCCount').html(0);
        }else{
          if($('#EasternUnitedStates').hasClass('cap')){
            $('#GlobalIPCCount').html(globalIPC);
          }else{
            globalIPC = 0;
            $('#GlobalIPCCount').html(globalIPC);
          }
        }
        $('#' + selectedTerf.id).addClass('cap');
      } else {
        // swal("Captured!", "You've captured the territory!", "success");
        // earnings = 8;
        // $('#Ipcs').html(IPC + earnings);
      }

    });
  }
});

var orderedUnits = [];
var predictedAmnt;
var lastPredictedAmnt;

$('.unitOrder').click(function(){
  var cost = Number($(this).attr('value'));
  if(orderedUnits.length === 0){
    predictedAmnt = currentIPC - cost;
  }else{
    lastPredictedAmnt = predictedAmnt
    predictedAmnt = predictedAmnt - cost;
  }

  if(predictedAmnt >= 0){
    $('#predictedAmnt').html('Predicted Amount: ' + predictedAmnt);
    orderedUnits.push($(this).attr('alt'));

    if(orderedUnits.length === 1){
      $("#sumofunits").append($(this).attr('alt'));
    }else if(orderedUnits.length > 1){
      $("#sumofunits").append(' + ' + $(this).attr('alt'));
    }
  }else{
    alert('insufficient funds');
    predictedAmnt = lastPredictedAmnt;
  }

  if(orderedUnits.length > 0){
    $('.clearEnlistment').css('display','block');
  }else{
    $('.clearEnlistment').css('display','none');
  }

})

$('.cancelBtn').click(function(){
  predictedAmnt = 0;
  lastPredictedAmnt = 0;
  orderedUnits = [];
  $("#sumofunits").text("");
  $('#predictedAmnt').html('Predicted Amount: 0');
  // $('#myModal').modal('hide');
})

$('.enlistBtn').click(function(){
  if(orderedUnits.length > 0){
    currentIPC = predictedAmnt;
    predictedAmnt = 0;
    lastPredictedAmnt = 0;
    orderedUnits = [];
    $("#sumofunits").text("");
    $('#predictedAmnt').html('Predicted Amount: 0');
    $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
    $('#myModal').modal('hide');
  }else{
      alert('You bought nothing');
  }
})

$('.clearEnlistment').click(function(){
  predictedAmnt = 0;
  lastPredictedAmnt = 0;
  orderedUnits = [];
  $("#sumofunits").text("");
  $('#predictedAmnt').html('Predicted Amount: 0');

  setTimeout(function(){
    if(orderedUnits.length === 0){

      $('.clearEnlistment').css('display','none');
    }else{
      $('.clearEnlistment').css('display','block');
    }
  }, 100);

});

$('#endTurnBtn').click(function(){
  if(globalIPC <= 0){
    earnings = 0;
    earningsCount = 0;
    earningsSub = 0;
    $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
    $('#earningsCount').html('');
    $('#earningsSub').html('');
    swal({
      title: "Your Turn!",
      // text: "I will close in 2 seconds.",
      type: 'success',
      timer: 1000,
      showConfirmButton: false,
      customClass: 'saCustomClass'
    });
  }else{
    var newCurrentIPC = globalIPC + currentIPC
    currentIPC = newCurrentIPC;
    $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);

    earnings = 0;
    earningsCount = 0;
    earningsSub = 0;

    $('#earningsCount').html('');
    $('#earningsSub').html('');

    swal({
      title: "Your Turn!",
      // text: "I will close in 2 seconds.",
      type: 'success',
      timer: 1000,
      showConfirmButton: false,
      customClass: 'saCustomClass'
    });
  }

});

$('.btnEditApply').click(function(){
  var value = Number($('.ip00 > input').val());
  if(value === '' || isNaN(value)){
    swal({
      title: "You must enter a number",
      // text: "I will close in 2 seconds.",
      type: 'info',
      timer: 2000,
      showConfirmButton: false,
      customClass: 'saCustomClass'
    });
  }else{
    currentIPC = value;
    $('#CurrentIPCCount').html("Current IPC's: " + currentIPC);
    $('#IPCEdit').modal('hide');
    $('.ip00 > input').val("");
  }
});

function play(){
   var audio = document.getElementById("march");
   audio.play();
 }
