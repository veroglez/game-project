function Game( identifier, numPlatforms, numEnemies ) {
  this.width = parseInt( identifier.width() );
  this.height = parseInt( identifier.height() );
  this.platforms = [];
  this.numPlatforms = numPlatforms;
  this.numEnemies = numEnemies;
  this.identity = identifier;
  this._initScene();
  this.time = 0;
  this.audioJump = new Audio('audio/jump.wav');
  this.audioHit = new Audio('audio/hit.ogg');
  this.audioSong = new Audio('audio/alien_swamp.ogg');
  this.score = 0;
  this.count = 0;
}

Game.prototype.startGame = function(elemGround, elemFinalPlat, elemPlayer, elemBadGuy){
  this.player = new Player( elemPlayer );
  this.badGuy = new BadGuy( elemBadGuy );
  this.army = new Army( this.numEnemies );
  this.player.init( elemGround, 25, 20 );
  this.badGuy.init( elemFinalPlat, 79, 50 );
  this.army.initArmy( this.numEnemies );
  this.audioSong.play();
  this.start = setInterval(this.gameInit.bind(this), 30);
};

Game.prototype.gameInit = function(){
  if(keys[38])
    this.player.jump();
  else if(keys[39])
    this.player.moveRight();
  else if(keys[37])
    this.player.moveLeft();

  this._counter( $('#counter') );

  for (var i = 0; i < 6; i++) {
    this.army.team[i].actions($('#'+this.randomPlatforms[i]));
  }

  this.player.move();
  this.badGuy.actions();

  if(this.player.died || this.badGuy.died){
    clearInterval(this.start);
    this.showFinalScore(this.count*30);
  }

  this.count++;
};

Game.prototype._createPlatforms = function(){
  for (var i = 0; i < this.numPlatforms; i++) {
    this.platforms.push('plat'+i);
  }
  for (i = 0; i < this.numPlatforms; i++) {
    $board = $('<div>');
    $board.attr('id', this.platforms[i]);
    $board.addClass('platform');
    this.identity.append($board);
  }
};
Game.prototype._createElementsScene = function( number, idName, classNames ){
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

Game.prototype._mixPlatforms = function(){
   this.randomPlatforms = _.shuffle(this.platforms);
};

Game.prototype._initScene = function(){
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

Game.prototype._counter = function( counter ){
  counter.text(this.score);
};

Game.prototype.showFinalScore = function( counter ){
  this._createElementsScene(1, 'show-counter');
  this.time = this._convertSecondsToMinutes( counter );
  $('#show-counter').append('<h4>'+ this.time +'<br>Score: '+ this.score+'</h4>');
  $('#show-counter').append('<div class="stars">').append('<a href="game.html"><button id="reset">Reset');
  this._getStars( counter );

};

Game.prototype._convertSecondsToMinutes = function( millis ){
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

Game.prototype._getStars = function( counter ){
  if(this.badGuy.died){
    if( this.score > 20 && counter < 20000){
      $('.stars').css('background-image', 'url("../game-project/img/gold-star.png")');
    }else if( this.score > 10 && counter < 20000){
      $('.stars').css('background-image', 'url("../game-project/img/silver-star.png")');
    }else{
      $('.stars').css('background-image', 'url("../game-project/img/bronze-star.png")');
    }
  }
};

Game.prototype._sumScore = function( attaked ){
  this.score += attaked.hasClass('plusPoints') ? 10 : 5;
};
