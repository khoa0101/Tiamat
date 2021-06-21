const Game = require("./game.js");
const Util = require("./util.js");

class GameView{
  constructor(game){
    this.game = game;
  }

  setupView(){
    const grid = document.getElementById('game-view');
    const ap = document.getElementById('ap-display');
    const endTurn = document.createElement('button');
    const returnToMenu = document.createElement('button');
    ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
    endTurn.setAttribute('id', 'end-turn');
    endTurn.innerHTML = "End Turn"
    returnToMenu.setAttribute('id', 'return-to-menu');
    returnToMenu.innerHTML = "Return to menu";
    const navBar = document.getElementById('nav-bar');
    const turns = document.getElementById('turn-display');
    const ally = document.getElementById('ally-team');
    const enemy = document.getElementById('enemy-team');
    navBar.append(returnToMenu);
    grid.append(endTurn);
    for (let i = 0; i < this.game.players.length; i++){
      this.game.players[i].render(ally, i);
    }
    for (let i = 0; i < this.game.enemies.length; i++){
      this.game.enemies[i].render(enemy, i);
    }
    for (let i = 0; i < this.game.turns.length; i++){
      turns.appendChild(this.game.turns[i].renderPortrait());
    }
    returnToMenu.addEventListener('click', () => {
      const menuModal = document.getElementsByClassName("menu")[0];
      const startButton = document.getElementById("start");
      menuModal.classList.remove("hidden");
      if (this.game.start){
        startButton.value = "";
      }
    })
    endTurn.addEventListener('click', () => {
      this.game.nextTurn();
      for (let i = 0; i < this.game.players.length; i++){
        this.game.players[i].renderFrame(i);
      }
      for (let i = 0; i < this.game.enemies.length; i++){
        this.game.enemies[i].renderFrame(i);
      }
      ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
      if (this.game.currentTurn.side === `enemy`){
        ap.classList.add('hide');
      } else {
        ap.classList.remove('hide');
      }
      const temp = turns.firstChild;
      turns.removeChild(turns.firstChild);
      turns.appendChild(temp);
    });
    console.log(ally.childNodes);
  }
}

module.exports = GameView;