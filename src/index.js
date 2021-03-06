const Game = require("./game.js");
const Sound = require("./sound.js");
const GameView = require("./game_view.js");

window.MUSIC = new Sound;
window.GAME = new Game;
window.GAME_VIEW = new GameView(GAME);

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
  MUSIC.menuMusic.volume = 0.2;

  startButton.addEventListener('click', () => {
    menuModal[0].classList.add("hidden");
    if (!GAME.start){
      GAME.start = true;
      GAME.addAllies();
      GAME.addEnemy();
      GAME.setTurn();
      GAME_VIEW.setupView();
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

  soundButton.addEventListener("click", () => {
    MUSIC.playAudio(MUSIC.menuMusic);
    if (MUSIC.menuMusic.paused){
      soundButton.value = "Unmute";
    } else {
      soundButton.value = "Mute";
    }
  })
});
