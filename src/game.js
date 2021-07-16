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
  this.currentTurn.startTurn();
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

Game.prototype.restart = function(){
  for (let i = 0; i < this.players.length; i++){
    for (let j = 0; j < this.players[i].conditions.length; j++){
      this.players[i].conditions[j].remove(this.players[i]);
    }

    for (let j = 0; j < this.players[i].skills.length; j++){
      this.players[i].skills[j].remainingCD = 0;
    }

    this.players[i].conditions.splice(0, this.players[i].conditions.length);
    this.players[i].currentHealth = this.players[i].maxHealth;
    this.players[i].armor = this.players[i].maxArmor;
    this.players[i].barrier = 0;
    this.players[i].maxBarrier = this.players[i].regen;
    this.players[i].AP = 4;
    this.players[i].alive = true;
  }

  for (let i = 0; i < this.enemies.length; i++){
    for (let j = 0; j < this.enemies[i].conditions.length; j++){
      this.enemies[i].conditions[j].remove(this.enemies[i]);
    }

    for (let j = 0; j < this.enemies[i].skills.length; j++){
      this.enemies[i].skills[j].remainingCD = 0;
    }

    this.enemies[i].conditions.splice(0, this.enemies[i].conditions.length);
    this.enemies[i].currentHealth = this.enemies[i].maxHealth;
    this.enemies[i].armor = this.enemies[i].maxArmor;
    this.enemies[i].barrier = 0;
    this.enemies[i].maxBarrier = this.enemies[i].regen;
    this.enemies[i].AP = 4;
    this.enemies[i].alive = true;
  }

  this.turns.splice(0, this.turns.length);

  if(this.currentTurn.side === `player`){
    const currentTurnSkills = document.getElementById(`${this.currentTurn.charType}-${this.currentTurn.id}-skills`);
    GAME_VIEW.endTurn(currentTurnSkills);
  }

  this.setTurn();

  if (this.currentTurn.side === 'player'){
    const currentTurnSkills = document.getElementById(`${this.currentTurn.charType}-${this.currentTurn.id}-skills`);
    GAME_VIEW.currentTurn(currentTurnSkills);
  } else {
    this.currentTurn.aiTurn();
  }

  this.gameOver = false;

  GAME_VIEW.renderFrame();
}

module.exports = Game;
