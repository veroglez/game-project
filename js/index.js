var scene;
var player;
var badGuy;
var miniBadGuy;
var keys = {};
var count = 0;
var platforms = ['plat1','plat2','plat3','plat4','plat5','plat6','plat7','plat8','plat9'];

function mixPlatforms( platforms ){
  return _.shuffle(platforms);
}

$( document ).ready(function() {
  scene = new Scene( $('#scene') );
  player = new Player( $('#player') );
  badGuy = new BadGuy( $('#badGuy') );
  miniBadGuy1 = new MiniBadGuy( $('#miniBadGuy1') );
  miniBadGuy2 = new MiniBadGuy( $('#miniBadGuy2') );
  platforms = mixPlatforms(platforms);

  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  scene.startGame(platforms);

  var game = setInterval(function(){

    if(player.died){
      alert('You die!');
      clearInterval(game);
      scene.resetGame();
    }
    if(badGuy.died || miniBadGuy2.died || miniBadGuy1.died){
      console.log('Malo muere!');
      if(badGuy.died){
        alert('you win!');
        scene.resetGame();
        clearInterval(game);
      }
      if(miniBadGuy1.died)
        miniBadGuy1.die();
      if(miniBadGuy2.died)
        miniBadGuy2.die();
    }

    player.move();
    badGuy.actions();
    if(!miniBadGuy1.died)
      miniBadGuy1.actions( $('#'+platforms[1]) );
    if(!miniBadGuy2.died)
      miniBadGuy2.actions( $("#"+platforms[2]) );

    if(keys[38])
      player.jump();
    else if(keys[39])
      player.moveRight();
    else if(keys[37])
      player.moveLeft();


  count++;
  //console.log(count*30 + 'sec');
  }, 30);

});
