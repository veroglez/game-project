var scene;

var badGuy;
var miniBadGuy;
var keys = {};
var count = 0;
var platforms = [];
var element;


$( document ).ready(function() {

  scene = new Scene( $('#scene'), 10, 6);
  badGuy = new BadGuy( $('#badGuy') );
  army = new Army(6);

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  scene.startGame($("#ground"), $("#final-plat"));
  platforms = scene.randomPlatforms;

  var game = setInterval(gameInit, 30);

  function gameInit(){
    scene._counter( $('#counter') );

    for (var i = 0; i < 6; i++) {
      army.team[i].actions($('#'+platforms[i]));
    }

    if(player.died || badGuy.died){
      clearInterval(game);
      scene.showFinalScore(count*30);
    }

    scene.player.move();
    badGuy.actions();

    if(keys[38])
      scene.player.jump();
    else if(keys[39])
      scene.player.moveRight();
    else if(keys[37])
      scene.player.moveLeft();

    count++;
  }

});
