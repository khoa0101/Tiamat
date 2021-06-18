const Game = require("./game.js");
const Util = require("./util.js");

class GameView{
  constructor(game){
    this.game = game;
  }

  setupView(){
    const grid = document.getElementById('game-view');
    const endTurn = document.createElement('button');
    const returnToMenu = document.createElement('button');
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
      this.game.players[i].render(ally);
    }
    for (let i = 0; i < this.game.enemies.length; i++){
      this.game.enemies[i].render(enemy);
    }
    for (let i = 0; i < this.game.turns.length; i++){
      turns.appendChild(this.game.turns[i].renderPortrait(this.game.turns[i].charType, this.game.turns[i].side));
    }

    returnToMenu.addEventListener('click', () => {
      const menuModal = document.getElementsByClassName("menu");
      menuModal[0].classList.remove("hidden");
      
    })

    endTurn.addEventListener('click', () => {
      console.log("Clicked end turn!")
      this.game.nextTurn();
      console.log(this.game);
      const temp = turns.firstChild;
      turns.removeChild(turns.firstChild);
      turns.appendChild(temp);
    })
  }
}

module.exports = GameView;