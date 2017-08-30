function Scene( identifier, numPlatforms, numEnemies ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
  this.platforms = [];
  this.numPlatforms = numPlatforms;
  this.numEnemies = numEnemies;
  this.identity = identifier;
  this.randomPlatforms = [];
  this._initScene();
}

Scene.prototype.startGame = function(){
  player.init( $("#ground"), 25, 20 );
  badGuy.init( $("#final-plat"), 50, 50 );
  army.initArmy(6, platforms);

};

Scene.prototype.resetGame = function(){
  player.speedY = 0; player.onPlatform = false; player.died = false;
  badGuy.died = false;
  for (var i = 0; i < this.numEnemies; i++) {
    army.team[i].died = false;
  }
};

Scene.prototype._createPlatforms = function(){
  for (var i = 0; i < this.numPlatforms; i++) {
    this.platforms[i] = 'plat'+i;
  }
  for (i = 0; i < this.numPlatforms; i++) {
    $board = $('<div>');
    $board.attr('id', this.platforms[i]);
    $board.addClass('platform');
    this.identity.append($board);
  }
};
Scene.prototype._createElementsScene = function( number, idName, classNames ){
  for (var i = 0; i < number; i++) {
    $board = $('<div>');
    if(number === 1){
      $board.attr('id', idName);
    }else{
      $board.attr('id', idName+i);
    }
    $board.addClass(classNames);
    if(classNames==='mini' && i< Math.floor(number/2))
      $board.addClass('plusPoints');
    this.identity.append($board);
  }
};

Scene.prototype._mixPlatforms = function(){
   this.randomPlatforms = _.shuffle(this.platforms);
};

Scene.prototype._initScene = function(){
  this._createElementsScene(1, 'player');
  this._createElementsScene(1, 'ground', 'platform');
  this._createPlatforms();
  this._createElementsScene(1, 'final-plat', 'platform');
  this._createElementsScene(1, 'badGuy');
  this._mixPlatforms();
  this._createElementsScene(this.numEnemies, 'miniBadGuy', 'mini');

  $('#plat8').attr('class','hide-platform');
  $('#plat9').attr('class','hide-platform');
  $('#miniBadGuy1').addClass('plusPoints');
  $('#miniBadGuy2').addClass('plusPoints');
};
