function Player( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.onPlatform = true;
  this.speedY = 0;
  this.gravity = 1;
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

 
Player.prototype.jump = function(){
  game.audioJump.play();
  if (this.onPlatform) {
    this.onPlatform = false;
    this.speedY = -15;
  }
};

Player.prototype.move = function(){
  if (!this.onPlatform) {
    this.y = this._stateCollection('top');
    this.speedY += this.gravity;
    this.y += this.speedY;
    this._update(this.identity, 'top', this.y);
  }
  if (this.speedY >= 0 ) {
    this.onPlatform = false;
    that = this;
    $('.platform').each(function(e) {
      $topPlatform = parseInt($(this).css('top'));
      if (that._collisionTop($(this), that.identity) && that.y <= $topPlatform ) {
        that._update(that.identity, 'top', $topPlatform - that.height);
        that.onPlatform = true; that.speedY = 0;
      }
    });
  }
  this.kill();
};

Player.prototype.kill = function(){
  that = this;
  $('.mini').each(function(e) {
    $topBadGuy = parseInt($(this).css('top'));
    if (that._collisionTop($(this), that.identity) && that.y <= $topBadGuy ) {
      game.audioHit.play();
      $(this).remove();
      game._sumScore( $(this) );
    }
  });
  $topBadGuy = parseInt(game.badGuy.identity.css('top'));
  if (this._collisionTop(game.badGuy.identity, this.identity) && this.y <= $topBadGuy ) {
    game.badGuy.died=true;
  }
};
