function BadGuy( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.speedShot = 15;
  this.gunShoot = true;
  this.shotX = 0;
  this.shotY = 0;
}
BadGuy.prototype = Object.create(Actor.prototype);

BadGuy.prototype.killPlayer = function(){
  if(this._collisionLat( $('#badGuy'), $('#player') )){
    player.died = true;
  }
};

BadGuy.prototype._collisionLat = function(a,b){ //b = player a = budguy
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return (posA.top + hA >= posB.top) && (posA.top <= posB.top) && (posA.left + wA >= posB.left) && (posA.left <= posB.left + wB);
};

BadGuy.prototype.move = function(){
  if(!player.died)
    this.killPlayer();

  if(this.gunShoot)
    this.shoot();

};

BadGuy.prototype.randomNumber = function(max){
  return Math.round(Math.random()*max);
};

BadGuy.prototype.shoot = function(){

    if (this.randomNumber(10) <= 1){
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

      if (that._collisionEnvironment($(this), $('#player')) )
        player.died = true;

    });
};
