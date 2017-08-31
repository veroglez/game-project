function Army(monkeys) {
  this.team = [];
  this._createArmy(monkeys);
}

Army.prototype._createArmy = function(number) {
  for (var i = 0; i < number; i++) {
    this.team.push(new MiniBadGuy($('#miniBadGuy' + i)));
    this.team[i].actions($('#' + scene.randomPlatforms[i]));
  }
};

Army.prototype.initArmy = function(number) {
  for (var i = 0; i < number; i++) {
    this.team[i].init($("#" + scene.randomPlatforms[i]), 40, $("#" + scene.randomPlatforms[i]).css('left'));
    if ( scene.randomPlatforms[i]==('plat8') || scene.randomPlatforms[i]==('plat9') ){
      this.team[i].identity.addClass('flying');
      console.log(this.team[i].identity);
    }
  }
};
