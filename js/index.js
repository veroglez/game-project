var scene;
var player;
var badGuy;
var miniBadGuy;
var keys = {};
var count = 0;
var platforms = [];
var element;


$( document ).ready(function() {

  scene = new Scene( $('#scene'), 10, 7);
  player = new Player( $('#player') );
  badGuy = new BadGuy( $('#badGuy') );
  army = new Army(7);

  // platforms = mixPlatforms(platforms);

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });


  scene.startGame($("#ground"), $("#final-plat"));
  platforms = scene.randomPlatforms;

  var game = setInterval(function(){
    scene._counter( $('#counter') );
    if(player.died){
      //alert('You die!');
      clearInterval(game);
      scene.resetGame();
      scene.showFinalScore(count*30);

    }

    if(badGuy.died){
      alert('you win!');
      scene.resetGame();
      clearInterval(game);
    }

    player.move();
    badGuy.actions();

    for (var i = 0; i < 7; i++) {
      army.team[i].actions($('#'+platforms[i]));
    }

    if(keys[38])
      player.jump();
    else if(keys[39])
      player.moveRight();
    else if(keys[37])
      player.moveLeft();


  count++;
  console.log(count*30 + 'sec');
  }, 30);

});
