const Slime = require("./character/enemies/slime.js");
const Rogue = require("./character/classes/rogue.js");
const Ranger = require("./character/classes/ranger");
const Cleric = require("./character/classes/cleric.js");
const Warrior = require("./character/classes/warrior.js");
const Wizard = require("./character/classes/wizard.js");

function Game(){
  this.start = false;
  this.players = new Array(4);
  this.enemies = new Array(4);
  this.turns = [];
  this.currentTurn = this.turns[0];
  this.gameOver = false;
}

Game.prototype.addEnemy = function(){
  for (let i = 0; i < this.enemies.length; i++){
    this.enemies[i] = new Slime(i);
  }
};

Game.prototype.addAllies = function(){
  this.players[0] = new Warrior(0);
  this.players[1] = new Cleric(1);
  this.players[2] = new Wizard(2);
  this.players[3] = new Rogue(3);
}

Game.prototype.setTurn = function(){
  this.players.forEach((player) => {
    this.turns.push(player);
  });
  this.enemies.forEach((enemy) => {
    this.turns.push(enemy);
  });

  this.reorderTurn();
  this.currentTurn = this.turns[0];
};

Game.prototype.reorderTurn = function(){
  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);
  this.turns = this.turns.reverse();
}

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
