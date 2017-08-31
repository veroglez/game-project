function Army(monkeys) {
  this.team = [];
  this._createArmy(monkeys);
}

Army.prototype._createArmy = function(number) {
  for (var i = 0; i < number; i++) {
    this.team.push(new MiniBadGuy($('#miniBadGuy' + i)));
    this.team[i].actions($('#' + game.randomPlatforms[i]));
  }
};

Army.prototype.initArmy = function(number) {
  for (var i = 0; i < number; i++) {
    this.team[i].init($("#" + game.randomPlatforms[i]), 40, $("#" + game.randomPlatforms[i]).css('left'));
    if ( game.randomPlatforms[i]==('plat8') || game.randomPlatforms[i]==('plat9') ){
      this.team[i].identity.addClass('flying');
    }
  }
};
