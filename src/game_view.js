const Game = require("./game.js");

class GameView{
  constructor(game){
    this.game = game;
    this.setupView();
  }

  setupView(){
    const grid = document.getElementById('game-view');
    const endTurn = document.createElement('button');
    const returnToMenu = document.createElement('button');
    endTurn.setAttribute('id', 'end-turn');
    returnToMenu.setAttribute('id', 'return-to-menu');
    const navBar = document.getElementById('nav-bar');
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
  }
}

module.exports = GameView;