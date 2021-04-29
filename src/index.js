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

  const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
  }

  let canvasPosition = canvasEl.getBoundingClientRect();
  canvasEl.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
    console.log(mouse.x + " " + mouse.y)
  });

  canvasEl.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
  });

  const ctx = canvasEl.getContext("2d");
  const gameView = new GameView(game, ctx);
  gameView.animate();
  gameView.createGrid();
  gameView.handleGameGrid();
  soundButton.addEventListener("click", () => {
    music.playAudio(music.menuMusic);
    console.log(music.menuMusic.paused);
    if (music.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
});
