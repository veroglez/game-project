function Scene( identifier ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
}

Scene.prototype.startGame = function(){
  player.init( $("#ground"), 25, 20 );
  badGuy.init( $("#final-plat"), 50, 50 );
};

Scene.prototype.resetGame = function(){
  player.speedY = 0; player.onPlatform = false; player.died = false;
  badGuy.died = false;
};
