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
      if (that._collisionEnvironment($(this), that.identity) && that.y <= $topPlatform ) {
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
  if( this._collisionTop( $('#player'), $('#badGuy')) ){
    badGuy.died = true;
    this._update(this.identity,'top', this.y);
  }
};

Player.prototype._collisionTop = function(a,b){
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return (posA.top + hA >= posB.top) && (posA.top <= posB.top+hB) && (posA.left + wA >= posB.left) && (posA.left <= posB.left + wB);
};


Actor.prototype._collisionEnvironment = function(a, b){
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return !(posA.left > posB.left + wB || posB.left > posA.left + wA || posA.top > posB.top + hB || posB.top > posA.top + hA);
};
