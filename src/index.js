const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const music = new Sound;
  const soundButton = document.getElementById("music");
  const game = new Game;
  canvasEl.width = Game.DIM_X;
  canvasEl.height= Game.DIM_Y;
  music.menuMusic.volume = 0.2;

  const ctx = canvasEl.getContext("2d");
  new GameView(game, ctx).animate();
  soundButton.addEventListener("click", () => {
    music.playAudio(music.menuMusic);
    console.log(music.menuMusic.paused);
    if (music.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
})
