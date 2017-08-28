function Player( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.onPlatform = true;
  this.speedY = 0;
  this.gravity = 1;
}
Player.prototype = Object.create(Actor.prototype);


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
      if (that._collisionEnvironment($(this), that.identity) && that.y <= $topPlatform) {
        that._update(that.identity, 'top', $topPlatform - that.height);
        that.onPlatform = true; that.speedY = 0;
      }
    });
  }

  if(!badGuy.died){
    this.kill();
  }

};

Player.prototype.kill = function(){
  if( this._collisionTop() ){
    badGuy.died = true;
    this._update(this.identity,'top', this.y);
  }
};

Player.prototype._collisionTop = function(){
  return (this.y + this.height >= badGuy.y) && (this.y <= badGuy.y+badGuy.height) && (this.x + this.width >= badGuy.x) && (this.x <= badGuy.x + badGuy.width);
};
