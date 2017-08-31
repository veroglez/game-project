function MiniBadGuy( identifier ){
  BadGuy.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.speedX = 2;
  this.control = false;
  this.control = false;
  this.x = parseInt(identifier.css('left'));
}
MiniBadGuy.prototype = Object.create(BadGuy.prototype);
MiniBadGuy.prototype.constructor = MiniBadGuy;


MiniBadGuy.prototype.actions = function( platform ){
  if(!player.died)
    this._killPlayer();

  this._move( platform );
};

MiniBadGuy.prototype._move = function( platform ){
  $platformWidth = platform.width();
  $platformLeft = parseInt(platform.css('left'));

  if(this.x >= $platformWidth + $platformLeft - 35){
    this.control = false;
  }else if(this.x <= $platformLeft){
    this.control = true;
  }
  this._moveDirections();
  this._update(this.identity,'left', this.x);
};

MiniBadGuy.prototype._moveDirections = function(){
  this.x += (this.control) ? this.speedX : this.speedX*(-1);
};
