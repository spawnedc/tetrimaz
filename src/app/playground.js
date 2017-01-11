import {Container, Rectangle, Graphics} from 'pixi.js';

class Playground extends Container {
  constructor(rows, cols, tileSize) {
    super();
    this.playground = new Rectangle(0, 0, tileSize * cols, tileSize * rows);

    this.field = [];
    for(let row = 0; row < rows; ++row) {
      this.field[row] = [];
      for(let col = 0; col < cols; ++col) {
        this.field[row][col] = 0;
      }
    }

    this.visiblePG = new Graphics();
    this.visiblePG.beginFill(0xFFFF00);
    this.visiblePG.drawRect(0, 0, this.playground.width, this.playground.height);

    this.addChild(this.visiblePG);
  }
}

export {Playground};
