const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const menuModal = document.getElementsByClassName("menu");
  const soundButton = document.getElementById("music");
  const startButton = document.getElementById("start");
  const teamButton = document.getElementById("team");
  const tutorialButton = document.getElementById("tutorial");
  const creditButton = document.getElementById("credits");
  const closeX = document.getElementsByClassName("close-x");
  const tutorialPage = document.getElementById("tutorial-page");
  const creditPage = document.getElementById("credit-screen");
  const teamPage = document.getElementById("team-management");
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
  });

  creditButton.addEventListener('click', () => {
    creditPage.classList.remove("hidden");
    closeX[0].addEventListener('click', () => {
      creditPage.classList.add("hidden");
    });
  });

  teamButton.addEventListener('click', () => {
    teamPage.classList.remove("hidden");
    closeX[1].addEventListener('click', () => {
      teamPage.classList.add("hidden");
    });
  });

  tutorialButton.addEventListener('click', () => {
    tutorialPage.classList.remove("hidden");
    closeX[2].addEventListener('click', () => {
      tutorialPage.classList.add("hidden");
    });
  });

  soundButton.addEventListener("click", () => {
    music.playAudio(music.menuMusic);
    if (music.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
});
