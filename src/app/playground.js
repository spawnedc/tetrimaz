import {Container, Rectangle, Graphics, Sprite, BaseTexture, Texture} from 'pixi.js';
import {TILE_SIZE, NUM_TILES} from './tiles/tile-data.js';
import {ASSETS} from './config.js';

class Playground extends Container {
  constructor(rows, cols, tileSize) {
    super();

    this.numCols = cols;
    this.numRows = rows;

    this.playground = new Rectangle(0, 0, tileSize * this.numCols, tileSize * this.numRows);

    this.field = this.createField();
    this.blocks = [];

    this.visiblePG = new Graphics();
    this.visiblePG.beginFill(0xFFFF00);
    this.visiblePG.drawRect(0, 0, this.playground.width, this.playground.height);

    this.addChild(this.visiblePG);
  }

  createField() {
    let field = new Array(this.numRows).fill(0);

    field.forEach((row, idx) => {
      field[idx] = new Array(this.numCols).fill(0);
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
          this.renderBlock(shape[row][col], pos.row + row, pos.col + col);
        }
      });
    });
  }

  renderBlock(idx, row, col) {
    let texture = new Texture(BaseTexture.fromImage(ASSETS.BLOCKS));
    let xPos = ((idx - 1) % NUM_TILES) * TILE_SIZE;
    texture.frame = new Rectangle(xPos, 0, TILE_SIZE, TILE_SIZE);
    let block = new Sprite(texture);
    block.x = col * TILE_SIZE;
    block.y = row * TILE_SIZE;
    // This is for easier row cleaning
    block.row = row;
    this.blocks.push(block);
    this.addChild(block);
  }

  checkForClearedLines() {
    this.field.forEach((row, rowIndex) => {
      let isRowFilled = true;
      row.forEach((block) => {
        if(block === 0) {
          isRowFilled = false;
        }
      });

      if(isRowFilled) {
        this.clearRow(rowIndex);
      }
    });
  }

  clearRow(rowIndex) {
    let blocksToClear = this.blocks.filter((block) => {
      return block.row === rowIndex;
    });

    blocksToClear.forEach((block) => {
      this.removeChild(block);
    });

    this.field.splice(rowIndex, 1);
    this.field.unshift(new Array(this.numCols).fill(0));
    this.reRender();
  }

  reRender() {
    this.blocks.forEach((block) => this.removeChild(block));
    this.field.forEach((row, rowIndex) => {
      row.forEach((block, colIndex) => {
        if(block !== 0) {
          this.renderBlock(block, rowIndex, colIndex);
        }
      });
    });
  }
}

export {Playground};
