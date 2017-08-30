function Scene( identifier ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
}

Scene.prototype.startGame = function( platforms ){
  player.init( $("#ground"), 25, 20 );
  badGuy.init( $("#final-plat"), 50, 50 );
  miniBadGuy1.init( $("#"+platforms[1]), 35, $("#"+platforms[1]).css('left') );
  miniBadGuy2.init( $("#"+platforms[2]), 35, $("#"+platforms[2]).css('left') );
};

Scene.prototype.resetGame = function(){
  player.speedY = 0; player.onPlatform = false; player.died = false;
  badGuy.died = false;
  miniBadGuy1.died = false;
  miniBadGuy2.died = false;
};
