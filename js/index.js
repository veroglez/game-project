var scene;
var player;
var badGuy;
var keys = {};

function movePaddle(){
  if (keys[81]) {
    paddle.moveUp();
  }else if (keys[65]){
    paddle.moveDown();
  }
}

//********************************************************************//
$( document ).ready(function() {
  scene = new Scene();
  player = new Player( $('#player') );
  badGuy = new BadGuy( $('#badGuy') );

  // Function to read the Code of the each key
  $(document).on('keydown', function(e){
    keys[e.keyCode] = true;
    }).keyup(function(e){
    delete keys[e.keyCode];
  });

  //player._identifyID( $('#player') );


  // Start the game
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


    //console.log('¿Estas muerto?', player.died);
    player.move();
    badGuy.move();
    if(keys[38]){       // Jump
      player.jump();
    }else if(keys[39]){ // Move right
      player.moveRight();
    }else if(keys[37]){ // Move left
      player.moveLeft();
    }

    //badGuy.move();

  }, 30);

});
