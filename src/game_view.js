const Game = require("./game.js")

function GameView(game, ctx) {
  this.ctx = ctx;
  this.game = game;
  this.controlsBar = {
    width: Game.DIM_X,
    height: 100,
  }
};

GameView.prototype.animate = function(){
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;