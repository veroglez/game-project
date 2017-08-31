$(document).ready(function(){

  effectsJquery();

  function playAudio(sound) {
    var x = new Audio(sound);
    x.play();
  }
  function effectsJquery(){
    $("#title").hide();
    $("#title2").hide();
    $(".subtitle").hide();
    $("#thanks").hide();
    $("button").hide();
    $("#title").fadeIn(3000);
    $("#title").fadeOut(3000);
    $("#title2").delay(6000).fadeIn('fast');
    $(".subtitle").delay(7000).fadeIn('fast');
    $("button").delay(8000).fadeIn();
    $("#thanks").delay(8000).fadeIn();

    setTimeout(function() {
          $('.container').css("background-image", "url('img/invasion.jpg')");
          playAudio('audio/alien_swamp.ogg');

    }, 6000);
    setTimeout(function() {
          playAudio('audio/thunder.flac');
    }, 5900);
  }

});
