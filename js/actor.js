function Actor(x,y){
  this.x = 0;
  this.y = 0;
  this.height = 0;
  this.width = 0;
  this.speedX = 5;
  this.identity = {};
  this.died = false;
}

Actor.prototype.init = function(container, top, left){
  this.identity.css('top', parseInt(container.css('top'))-top ).css('left', left);
  this.height = parseInt(this.identity.css('height'));
  this.width = parseInt(this.identity.css('width'));
  this.y = parseInt(this.identity.css('top'));
  this.x = parseInt(this.identity.css('left'));
};

Actor.prototype._identifyID = function(indetifier){
  this.identity = indetifier;
};
Actor.prototype._stateCollection = function(property){
  return parseInt(this.identity.css(property));
};

Actor.prototype.moveLeft = function(){
  this.x = this._stateCollection('left');
  if(this.x >= 0)
    this.x -= this.speedX;

  this._update(this.identity, 'left', this.x);
};

Actor.prototype.moveRight = function(){
  this.x = this._stateCollection('left');
  if(this.x <= scene.width - this.width)
    this.x += this.speedX;
  this._update(this.identity, 'left', this.x);
};

Actor.prototype._update = function(identifier, property, value){
  identifier.css(property, value +'px');
};

Actor.prototype._collisionTop = function(a, b){
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return !(posA.left > posB.left + wB || posB.left > posA.left + wA || posA.top > posB.top + hB || posB.top > posA.top + hA);
};
