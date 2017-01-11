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

  canMoveToPos(shape, potentialPos) {
    let canMove = true;
    shape.forEach((rowData, row) => {
      rowData.forEach((colData, col) => {
        let shapeData = shape[row][col];
        if(shapeData === 1) {
          if(potentialPos.row + row >= this.field.length) {
            // Tile hit the ground
            canMove = false;
          } else if(potentialPos.col + col < 0 || potentialPos.col + col >= this.field[potentialPos.row + row].length) {
            // Tile hit the left or right boundaries
            canMove = false;
          } else if(this.field[potentialPos.row + row][potentialPos.col + col] === 1) {
            // Tile hit occupied space
            canMove = false;
          }
        }
      })
    });

    return canMove;
  }

  updateField(shape, pos) {
    shape.forEach((rowData, row) => {
      rowData.forEach((colData, col) => {
        console.warn(pos.row + row, pos.col + col);
        this.field[pos.row + row][pos.col + col] = shape[row][col];
      });
    });
  }
}

export {Playground};
