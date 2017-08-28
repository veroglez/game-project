function BadGuy( identifier ){
  Actor.call(this, 0, 0, 0, 0, 5, {}, false);
  this.identity = identifier;
  this.speedShot = 15;
  this.gunShoot = true;
  this.shotX = 0;
  this.shotY = 0;
}
BadGuy.prototype = Object.create(Actor.prototype);


BadGuy.prototype.init = function(){
  this._identifyID( $('#badGuy') );
  this.y = parseInt(this.identity.css('top'));
  this.x = parseInt(this.identity.css('left'));
  this.width = parseInt(this.identity.width());
  this.height = parseInt(this.identity.height());
};

BadGuy.prototype._identifyID = function(indetifier){
  this.identity = indetifier;
};

BadGuy.prototype.killPlayer = function(){
  if( (player.x+player.width >= this.x) && (player.x <= this.x+this.width) && (player.y >= this.y) && (player.y <= this.y+this.height) ){
    player.died = true;
  }
};

BadGuy.prototype.move = function(){
  if(!player.died){
    this.killPlayer();
  }

  if(this.gunShoot){
    this.shoot();
  }
};


BadGuy.prototype.shoot = function(){
    var rand = Math.round(Math.random()*10);

    if (rand <= 1){
      $('#scene').append('<div class="bullet"></div>');
    }

    that = this;
    $('.bullet').each(function(e) {
      $posBulletY = parseInt($(this).css('top'));
      $posBulletX = parseInt($(this).css('left'));
      $posBulletY += that.speedShot;
      $(this).css('top', $posBulletY);

      if( $posBulletY >= 600){
        $(this).remove();
      }
      if (that._collisionPlatforms($(this), $('#player')) ) {
        player.died = true;
      }
    });

};


BadGuy.prototype._collisionPlatforms = function(a, b){
  var posA = $(a).position(); var wA = $(a).width(); var hA = $(a).height();
  var posB = $(b).position(); var wB = $(b).width(); var hB = $(b).height();
  return !(posA.left > posB.left + wB || posB.left > posA.left + wA || posA.top > posB.top + hB || posB.top > posA.top + hA);
};
