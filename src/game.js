const Character = require("./character/char");
function Game() {
  this.players = new Array(6);
  this.enemies = [];
  this.turns = [];
}

Game.DIM_X = 1534;
Game.DIM_Y = 900;
Game.FPS = 60;

Game.prototype.add = function(object) {
  if (object.side = "player"){
    this.players.push(object);
  } else {
    this.enemies.push(object);
  }
};

Game.prototype.setTurn = function(){
  this.players.forEach((player) => {
    this.turns.push(player);
  });
  this.enemies.forEach((enemy) => {
    this.turns.push(enemy);
  });

  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);
  this.turns = this.turns.reverse;
};

Game.prototype.checkTurn = function(){
  for (let i = 0; i < this.turns.length; i++){
    if (this.turns[i] !== undefined && !this.turns[i].alive) delete this.turns[i];
  }
}

Game.prototype.win = function(){
  for (let i = 0; i < this.enemies.length; i++){
    if (this.enemies[i].alive) return false;
  }
  return true;
};

Game.prototype.lose = function(){
  for (let i = 0; i < this.players.length; i++){
    if (this.players[i].alive) return false;
  }
  return true;
}

module.exports = Game;
