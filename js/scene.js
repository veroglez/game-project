function Scene( identifier ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
}

Scene.prototype.startGame = function(){
  player.init( $("#ground"), 25, 20 );
  badGuy.init( $("#final-plat"), 50, 50 );
  miniBadGuy1.init( $("#plat3"), 35, $("#plat3").css('left') );
  miniBadGuy2.init( $("#plat1"), 35, $("#plat1").css('left') );
};

Scene.prototype.resetGame = function(){
  player.speedY = 0; player.onPlatform = false; player.died = false;
  badGuy.died = false;
  miniBadGuy1.died = false;
  miniBadGuy2.died = false;
};
