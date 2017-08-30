function MiniBadGuy( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.speedX = 2;
  this.control = false;
  this.control = false;
  this.x = parseInt(identifier.css('left'));
}
MiniBadGuy.prototype = Object.create(Actor.prototype);
MiniBadGuy.prototype.constructor = MiniBadGuy;


MiniBadGuy.prototype.actions = function( platform ){
  if(!player.died)
    this.killPlayer();

  this.move( platform );
};

MiniBadGuy.prototype.move = function( platform ){
  $platformWidth = platform.width();
  $platformLeft = parseInt(platform.css('left'));

  if(this.x >= $platformWidth + $platformLeft){
    this.control = false;
  }else if(this.x <= $platformLeft){
    this.control = true;
  }
  this.moveDirections();
  this._update(this.identity,'left', this.x);
};

MiniBadGuy.prototype.moveDirections = function(){
  this.x += (this.control) ? this.speedX : this.speedX*(-1);
};

MiniBadGuy.prototype.die = function(){
  this.identity.remove();
};



MiniBadGuy.prototype.killPlayer = function(){
  if(this._collisionLat( this.identity, $('#player') )){
    player.died = true;
  }
};
MiniBadGuy.prototype._collisionLat = function(a,b){ //b = player a = budguy
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return (posA.top + hA >= posB.top) && (posA.top <= posB.top) && (posA.left + wA >= posB.left) && (posA.left <= posB.left + wB);
};
