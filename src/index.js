const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(){
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
  const gameView = new GameView(game);
  music.menuMusic.volume = 0.2;

  startButton.addEventListener('click', () => {
    menuModal[0].classList.add("hidden");
    if (!game.start){
      game.start = true;
      game.addAllies();
      game.addEnemy();
      game.setTurn();
      gameView.setupView();
    } else {
      menuModal[0].value = 'Resume Game';
    }
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

  soundButton.addEventListener("click", (song) => {
    music.playAudio(music.menuMusic);
    if (music.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
});
