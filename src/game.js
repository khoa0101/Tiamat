const Slime = require("./character/enemies/slime.js");

function Game() {
  this.grid = [];
  this.players = new Array(6);
  this.enemies = new Array(6);
  this.turns = [];
  this.currentTurn = this.turns[0];
  this.gameStart = false;
  this.gameOver = false;
}

Game.MOUSE = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
}

Game.DIM_X = 1300;
Game.DIM_Y = 600;
Game.FPS = 60;

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
  // this.turns = this.turns.reverse;
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
  let temp = this.turns.pop();
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
