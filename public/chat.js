
//==============================================================================
// VARIABLES
//==============================================================================
var orbiter;
var chatRoom;
var frequencyNum;
var factionType;
var a
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


// On Load
$(function() {
  if(isSafari){
    $('#createLobby').addClass('CustomeDisableBtn');
    $('#createLobby').removeClass('hvr-shrink');
    $('#createLobby > p').html('Lobby disabled due to Safrai not allowing certain script loads through HTTPS');
    $("#createLobby").unbind("click");
  }
  $('#chatManagerOnLoad').modal();

  // This is Vlaue IPC of unit on hover NOTHING TO DO WITH CHAT LOGIC -START //
  $(".unitOrder").hover(function(){
    $('#unitValuePrint').html($('#' + this.id).attr('value'));
  });
  $(".unitOrder").mouseleave(function(){
    $('#unitValuePrint').html('');
  });
  // This is Vlaue IPC of unit on hover NOTHING TO DO WITH CHAT LOGIC -END //

  $('#joinLobby').click(function(){
    $('.joinLobbyInpContainer').css('display','inline-flex');
    factionType = $('#joinLobby').attr('value');
  });
  $('.btnLobbyNumApply').click(function(){
    frequencyNum = $('#joinLobbyInp').val();
    $('#chatManagerOnLoad').modal('hide');
    a = $('#createLobby').attr('value')
    init();
  })
  $('.noLobby').click(function(){
    $('#chatManagerOnLoad').modal('hide');
    $('#chatPane').css('display','none');
    $('#inputandBtnGroup').css('display','none');
  })
  // $('.modal-open').click(function(){
  //   // $('.sideNav').modal('hide');
  //   $('#chatManagerOnLoad').modal('hide');
  //   $('#chatPane').css('display','none');
  //   $('#inputandBtnGroup').css('display','none');
  // })
});

$('#createLobby').click(function(){
  frequencyNum = Math.floor(Math.random() * 2000) + 1000;
  verifyBrowserToastr()
  $('#chatManagerOnLoad').modal('hide');
  swal({
    title: "Lobby Created!",
    text: "Tell your teamate this number to join the lobby: " + frequencyNum,
    type: "success",
    // confirmButtonColor: "#DD6B55",
    confirmButtonText: "Ok",
    closeOnConfirm: true,
    customClass: 'saCustomClass'
  });
  // factionType = $('#createLobby').attr('value');
  a = $('#createLobby').attr('value')
  init();
});

$('#submitSend').click(function(){
  sendMessage()
})




//==============================================================================
// INITIALIZATION
//==============================================================================
function init () {
  // alert('frequency Number: ' + frequencyNum);
  // swal("Lobby Created!", "Tell your teamate this number to join the lobby: " + frequencyNum, "success")

  // Create the Orbiter instance, used to connect to and communicate with Union,
  // then enable automatic reconnection (one attempt every 15 seconds)
  orbiter = new net.user1.orbiter.Orbiter();
  orbiter.getConnectionMonitor().setAutoReconnectFrequency(15000);

  // Increase log level to maximum
  orbiter.getLog().setLevel(net.user1.logger.Logger.DEBUG);

  // If required JavaScript capabilities are missing, abort
  if (!orbiter.getSystem().isJavaScriptCompatible()) {
    displayChatMessage("Your browser is not supported.");
    return;
  }

  // Register for Orbiter's connection events
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);

  displayChatMessage("Connecting...");

  // Connect to Union Server
  orbiter.connect("tryunion.com", 80);
}

//==============================================================================
// ORBITER EVENT LISTENERS
//==============================================================================
// Triggered when the connection is ready
function readyListener (e) {
  displayChatMessage("Connected.");
  // displayChatMessage("Joining chat room...");

  // Create the chat room on the server
  chatRoom = orbiter.getRoomManager().createRoom(frequencyNum.toString());
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.JOIN, joinRoomListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.ADD_OCCUPANT, addOccupantListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.REMOVE_OCCUPANT, removeOccupantListener);

  // Listen for chat messages
  chatRoom.addMessageListener("CHAT_MESSAGE", chatMessageListener);

  // Join the chat room
  chatRoom.join();
}

// Triggered when the connection is closed
function closeListener (e) {
  displayChatMessage("Orbiter connection closed.");
}

//==============================================================================
// CHAT ROOM EVENT LISTENERS
//==============================================================================
// Triggered when the room is joined
function joinRoomListener (e) {
  // Join a random team
  // var a = prompt('axis or allies?');
  // var a = 'allies';
  // <!-- var team = teams[Math.floor(Math.random()*2)]; -->
  var team = a;
  orbiter.self().setAttribute("team", team, "chatRoom");

  // displayChatMessage("You joined the " + team + " team.");
  // displayChatMessage("Chat ready!");
  displayChatMessage("Number of people now in lobby: " + chatRoom.getNumOccupants());
}

// Triggered when another client joins the chat room
function addOccupantListener (e) {
  if (chatRoom.getSyncState() != net.user1.orbiter.SynchronizationState.SYNCHRONIZING) {

    displayChatMessage(
      "User" + e.getClientID() + " joined the chat." + " People chatting: " + chatRoom.getNumOccupants()
    );

  }
}

// Triggered when another client leaves the chat room
function removeOccupantListener (e) {
  displayChatMessage("User" + e.getClientID() + " left the chat.");
}

//==============================================================================
// CHAT SENDING AND RECEIVING
//==============================================================================
// Sends a chat message to everyone in the chat room
function sendMessage () {
  var outgoing = document.getElementById("outgoing");
  var filter = new net.user1.orbiter.filters.AttributeFilter();
  var comparison = new net.user1.orbiter.filters.AttributeComparison("chatRoom.team",
                                           orbiter.self().getAttribute("team", "chatRoom"),
                                           net.user1.orbiter.filters.CompareType.EQUAL);
  filter.addComparison(comparison);

  if (outgoing.value.length > 0) {
    // displayChatMessage("Sending message to the "
    //                    + orbiter.self().getAttribute("team", "chatRoom") + "team");
    chatRoom.sendMessage("CHAT_MESSAGE", "true", filter, outgoing.value, "true");
    outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
}

// Triggered when a chat message is received
function chatMessageListener (fromClient, message, isTeamChat) {
  if (isTeamChat == "true") {
    displayChatMessage(fromClient.getClientID() + ": " + message);
    // displayChatMessage("Team Member" + fromClient.getClientID() + ": " + message);
    // displayChatMessage(factionType + ": " + message);
  } else {
    displayChatMessage("User" + fromClient.getClientID() + ": " + message);
  }
}

// Displays a single chat message
function displayChatMessage (message) {
  // Make the new chat message element
  var msg = document.createElement("span");
  msg.appendChild(document.createTextNode(message));
  msg.appendChild(document.createElement("br"));

  // Append the new message to the chat
  var chatPane = document.getElementById("chatPane");
  chatPane.appendChild(msg);

  // Trim the chat to 500 messages
  if (chatPane.childNodes.length > 20) {
    chatPane.removeChild(chatPane.firstChild);
  }
  chatPane.scrollTop = chatPane.scrollHeight;
}

function verifyBrowserToastr(){
  // toastr["info"]("If the lobby is not connecting, select the shield on the right hand side of your address bar. Then click 'Load Unsafe Script' to load the file needed to allow the lobby to work.", "Attention!")
  if(isChrome){
    toastr.info("If the lobby is not connecting, select the shield on the right hand side of your address bar. Then click 'Load Unsafe Script' to load the file needed to allow the lobby to work.", "Attention!", {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "8000",
      "hideDuration": "5000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });
  }else if(isFirefox){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-top-left", //"toast-bottom-center",
      "preventDuplicates": false,
      // "onclick": function () {alert('스티키');},
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "10000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    toastr.info('If the lobby is not connecting, Select the green lock right side of the address bar. Then select the arrow to open more options and click "Disable Protection for Now." ', "Attention!")
  }


}
