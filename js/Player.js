function Player( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.onPlatform = true;
  this.speedY = 0;
  this.gravity = 1;
  this.score = 0;
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;


Player.prototype.jump = function(){
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
    $topMiniBadGuy = parseInt($(this).css('top'));
    if (that._collisionTop($(this), that.identity) && that.y <= $topMiniBadGuy ) {
      $(this).died=true;
      $(this).remove();
      that.sumScore( $(this) );
    }
  });
};

Player.prototype.sumScore = function( attaked ){
  if( attaked.hasClass('bird1') ){
    this.score +=1;
  }else{
    this.score +=2;
  }
};
