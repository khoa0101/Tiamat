const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const menuModal = document.getElementsByClassName("menu");
  const soundButton = document.getElementById("music");
  const startButton = document.getElementById("start");
  const music = new Sound;
  const game = new Game;
  canvasEl.width = Game.DIM_X;
  canvasEl.height= Game.DIM_Y;
  music.menuMusic.volume = 0.2;

  let canvasPosition = canvasEl.getBoundingClientRect();
  canvasEl.addEventListener('mousemove', function(e){
    Game.MOUSE.x = e.x - canvasPosition.left;
    Game.MOUSE.y = e.y - canvasPosition.top;
  });

  canvasEl.addEventListener('mouseleave', function(){
    Game.MOUSE.x = undefined;
    Game.MOUSE.y = undefined;
  });

  const ctx = canvasEl.getContext("2d");
  const gameView = new GameView(game, ctx);

  startButton.addEventListener('click', () => {
    menuModal[0].classList.add("hidden");
    game.addEnemy();
    game.setTurn();
    gameView.animate();
    gameView.createGrid();
  })

  soundButton.addEventListener("click", () => {
    music.playAudio(music.menuMusic);
    if (music.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
});
