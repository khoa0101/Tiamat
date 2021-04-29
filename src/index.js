const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const music = new Sound;
  const game = new Game;
  canvasEl.width = Game.DIM_X;
  canvasEl.height= Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  // document.addEventListener("click", () => {
  //   music.playAudio(music.menuMusic);
  // })
  new GameView(game, ctx).animate();
})
