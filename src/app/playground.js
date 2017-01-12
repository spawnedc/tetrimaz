import {Container, Rectangle, Graphics} from 'pixi.js';

class Playground extends Container {
  constructor(rows, cols, tileSize) {
    super();

    this.playground = new Rectangle(0, 0, tileSize * cols, tileSize * rows);

    this.field = this.createField(rows, cols);

    this.visiblePG = new Graphics();
    this.visiblePG.beginFill(0xFFFF00);
    this.visiblePG.drawRect(0, 0, this.playground.width, this.playground.height);

    this.addChild(this.visiblePG);
  }

  createField(rows, cols) {
    let field = new Array(rows).fill(0);

    field.forEach((row, idx) => {
      field[idx] = new Array(cols).fill(0);
    });

    return field;
  }

  canMoveToPos(shape, potentialPos) {
    let canMove = true;
    shape.forEach((rowData, row) => {
      rowData.forEach((colData, col) => {
        let shapeData = shape[row][col];
        if(shapeData !== 0) {
          if(potentialPos.row + row >= this.field.length) {
            // Tile hit the ground
            canMove = false;
          } else if(potentialPos.col + col < 0 || potentialPos.col + col >= this.field[potentialPos.row + row].length) {
            // Tile hit the left or right boundaries
            canMove = false;
          } else if(this.field[potentialPos.row + row][potentialPos.col + col] !== 0) {
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
        let shapeData = shape[row][col];
        if(shapeData !== 0) {
          this.field[pos.row + row][pos.col + col] = shape[row][col];
        }
      });
    });
  }
}

export {Playground};
