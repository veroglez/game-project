function BadGuy( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.speedShot = 15;
  this.gunShoot = true;
  this.shotX = 0;
  this.shotY = 0;
  this.speedX = 2;
  this.rand1 = 400;
  this.rand2 = 10;
  this.control = false;
}
BadGuy.prototype = Object.create(Actor.prototype);
BadGuy.prototype.constructor = BadGuy;


BadGuy.prototype._randomNumber = function(min, max){
  return Math.round(Math.random()*(max-min) + min);
};

BadGuy.prototype._killPlayer = function(){
  if(this._collisionLat( this.identity, player.identity )){
    player.died = true;
  }
};

BadGuy.prototype._collisionLat = function(a, b){
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return (posA.top + hA >= posB.top) && (posA.top <= posB.top) && (posA.left + wA >= posB.left) && (posA.left <= posB.left + wB);
};

BadGuy.prototype._move = function(){
  this.x += (this.control) ? this.speedX : this.speedX*(-1);
  this._moveLimits();
  this._update(this.identity,'left', this.x);
};

BadGuy.prototype._moveLimits = function(){
  $maxPlat = parseInt($('#final-plat').width()-this.width)/10;
  if(this.x >= this.rand1){
    this.control = false;
    this.rand2 = $maxPlat*this._randomNumber(0, 5);
  }else if(this.x <= this.rand2){
    this.control = true;
    this.rand1 = $maxPlat*this._randomNumber(5, 10);
  }
};

BadGuy.prototype.actions = function(){
  if(!player.died)
    this._killPlayer();
  if(this.gunShoot)
    //this._shoot();

  this._move();
};


BadGuy.prototype._shoot = function(){

    if (this._randomNumber(0, 10) < 1){
      $('#scene').append('<div class="bullet"></div>');
      $('.bullet').css('left', this.x+17);
    }

    that = this;
    $('.bullet').each(function(e) {
      $posBulletY = parseInt($(this).css('top'));
      $posBulletY += that.speedShot;
      that._update($(this), 'top', $posBulletY);
      if( $posBulletY >= scene.height )
        $(this).remove();
      if (that._collisionTop($(this), $('#player')) )
        player.died = true;

    });
};
