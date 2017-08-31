var game;

var keys = {};
var count = 0;

$( document ).ready(function() {

  game = new Game( $('#scene'), 10, 6);

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  game.startGame($("#ground"), $("#final-plat"));

  var start = setInterval(gameInit, 30);

  function gameInit(){
    game._counter( $('#counter') );

    for (var i = 0; i < 6; i++) {
      game.army.team[i].actions($('#'+game.randomPlatforms[i]));
    }

    if(player.died || badGuy.died){
      clearInterval(start);
      game.showFinalScore(count*30);
    }

    game.player.move();
    game.badGuy.actions();

    if(keys[38])
      game.player.jump();
    else if(keys[39])
      game.player.moveRight();
    else if(keys[37])
      game.player.moveLeft();

    count++;
  }

});
