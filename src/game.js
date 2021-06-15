const Slime = require("./character/enemies/slime.js");

function Game() {
  this.grid = [];
  this.players = new Array(4);
  this.enemies = new Array(4);
  this.turns = [];
  this.currentTurn = this.turns[0];
  this.gameStart = false;
  this.gameOver = false;
}

Game.prototype.addEnemy = function(){
  for (let i = 0; i < this.enemies.length; i++){
    this.enemies[i] = new Slime();
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
};

Game.prototype.checkTurn = function(){
  for (let i = 0; i < this.turns.length; i++){
    if (!this.turns[i].alive){
      this.turns.splice(i, 1);
      i--;
    };
  }
};

Game.prototype.nextTurn = function(){
  let temp = this.turns.shift();
  temp.endTurn();
  this.turns.push(temp);
  this.currentTurn = this.turns[0];
};

Game.prototype.win = function(){
  for (let i = 0; i < this.enemies.length; i++){
    if (this.enemies[i].alive) return false;
  }
  this.gameOver = true;
  return true;
};

Game.prototype.lose = function(){
  for (let i = 0; i < this.players.length; i++){
    if (this.players[i].alive) return false;
  }
  this.gameOver = true;
  return true;
}

module.exports = Game;
