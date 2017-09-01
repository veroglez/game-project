var game;
var keys = [];

$( document ).ready(function() {

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  game = new Game( $('#scene'), 10, 6);
  game.startGame($("#ground"), $("#final-plat"), $('#player'), $('#badGuy'));


});
