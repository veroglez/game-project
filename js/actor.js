function Actor(x,y){
  this.x = 0;
  this.y = 0;
  this.height = 0;
  this.width = 0;
  this.speedX = 5;
  this.identity = {};
  this.died = false;
}

Actor.prototype.init = function(){
  this.identity.css('top', parseInt($("#ground").css('top'))-25 ).css('left', 20);
  this.height = parseInt(this.identity.css('height'));
  this.width = parseInt(this.identity.css('width'));
};

Actor.prototype._identifyID = function(indetifier){
  this.identity = indetifier;
};
Actor.prototype._stateCollection = function(property){
  return parseInt(this.identity.css(property));
};

Actor.prototype.moveLeft = function(){
  this.x = this._stateCollection('left');
  this.x -= this.speedX;
  this._update('left', this.x);
};

Actor.prototype.moveRight = function(){
  this.x = this._stateCollection('left');
  this.x += this.speedX;
  this._update('left', this.x);
};

Actor.prototype._update = function(property, variable){
  this.identity.css(property, variable +'px');
};
