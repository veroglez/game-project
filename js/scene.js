function Scene( identifier, numPlatforms, numEnemies, ground, finalPlat ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
  this.platforms = [];
  this.numPlatforms = numPlatforms;
  this.numEnemies = numEnemies;
  this.identity = identifier;
  this.randomPlatforms = [];
  this._initScene();
  this.time = 0;
  this.audioJump = new Audio('audio/jump_01.wav');
  // this.audioJump.play();
  this.player = new Player( $('#player') );
}

Scene.prototype.startGame = function(ground, finalPlat){
  this.player.init( ground, 25, 20 );
  badGuy.init( finalPlat, 65, 50 );
  army.initArmy( this.numEnemies );
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
  this._createElementsScene(1, 'counter');
};

Scene.prototype._counter = function( counter ){
  counter.text(this.player.score);
};

Scene.prototype.showFinalScore = function( counter ){
  this._createElementsScene(1, 'show-counter');
  this.time = this._convertSecondsToMinutes( counter );
  $('#show-counter').append('<h4>'+ this.time +'<br>Score: '+ player.score+'</h4>');
  $('#show-counter').append('<div class="stars">').append('<a href="index.html"><button id="reset">Reset');
  this.getStars( counter );

};

Scene.prototype._convertSecondsToMinutes = function( millis ){
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

Scene.prototype.getStars = function( counter ){
  if(badGuy.died){
    if( player.score > 20 && counter < 20000){
      $('.stars').css('background-image', 'url("../game-project/img/gold-star.png")');
    }else if( player.score > 10 && counter < 20000){
      $('.stars').css('background-image', 'url("../game-project/img/silver-star.png")');
    }else{
      $('.stars').css('background-image', 'url("../game-project/img/bronze-star.png")');
    }
  }
};
