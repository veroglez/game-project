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
    this.team[i].init($("#" + scene.randomPlatforms[i]), 35, $("#" + scene.randomPlatforms[i]).css('left'));
  }
};
