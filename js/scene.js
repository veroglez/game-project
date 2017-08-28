function Scene() {

}

Scene.prototype.startGame = function(){
  // Set a player in a initial position
  player.identity.css('top', parseInt($("#ground").css('top'))-25 ).css('left', 20);
  player.height = parseInt(player.identity.css('height'));
  player.width = parseInt(player.identity.css('width'));


  badGuy.init();

};

Scene.prototype.resetGame = function(){
  player.speedY = 0; player.onPlatform = false; player.died = false;
  badGuy.died = false;
//  this.startGame();
};
