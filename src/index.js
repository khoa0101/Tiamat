const Game = require("./game.js");
// const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const game = new Game;
  canvasEl.width = Game.DIM_X;
  canvasEl.height= Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  console.log("Webpack")
  // new GameView(game, ctx).start();
})
