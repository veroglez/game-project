var scene;
var player;
var badGuy;
var keys = {};

$( document ).ready(function() {
  scene = new Scene( $('#scene') );
  player = new Player( $('#player') );
  badGuy = new BadGuy( $('#badGuy') );

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  scene.startGame();

  var game = setInterval(function(){

    if(player.died){
      alert('You die!');
      clearInterval(game);
      scene.resetGame();
    }
    if(badGuy.died){
      alert('Malo muere!');
      clearInterval(game);
      scene.resetGame();
    }

    player.move();
    badGuy.move();
    if(keys[38])
      player.jump();
    else if(keys[39])
      player.moveRight();
    else if(keys[37])
      player.moveLeft();

  }, 30);

});
