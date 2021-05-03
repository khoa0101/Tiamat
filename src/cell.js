const Util = require('./util.js');
const Game = require('./game.js');

class Cell {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }

  draw(){
    if (Game.MOUSE.x && Game.MOUSE.y && Util.collision(this, Game.MOUSE)){
      this.ctx.strokeStyle = 'white';
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
};

module.exports = Cell;