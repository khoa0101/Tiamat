const Game = require("./game.js");
const Cell = require("./cell.js");

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.controlsBar = {
    width: Game.DIM_X,
    height: 100,
  }
};

GameView.prototype.createGrid = function(){
  for (let y = 100; y < Game.DIM_Y; y += 100){
    for (let x = 0; x < Game.DIM_X; x += 100){
      this.game.grid.push(new Cell(this.ctx, x, y));
    }
  }
}; 

GameView.prototype.handleGameGrid = function(){
  for (let i = 0; i < this.game.grid.length; i++){
    this.game.grid[i].draw();
  }
};

GameView.prototype.renderEnemies = function(){
  let x = 100;
  for (let i = 0; i < this.game.enemies.length; i++){
    this.game.enemies[i].draw(this.ctx, x, 200);
    x += 200; 
  }
};

GameView.prototype.renderTurn = function(){
  let x = 300;
  for (let i = 0; i < this.game.turns.length && i < 7; i++){
    this.game.turns[i].draw(this.ctx, x, 500);
    x += 100;
  }
}

GameView.prototype.animate = function(){
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
  this.handleGameGrid();
  this.renderEnemies();
  this.renderTurn();
  this.game.checkTurn();
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;