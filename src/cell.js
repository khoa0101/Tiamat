class Cell {
  constructor(ctx, x, y){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
  }

  draw(){
    this.ctx.strokeStyle = 'black';
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
};

module.exports = Cell;