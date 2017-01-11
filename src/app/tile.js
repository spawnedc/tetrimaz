import {Container, Sprite} from 'pixi.js';
import {TILE_SIZE} from './tile-data.js';

class Tile extends Container {
  constructor(tileData, texture) {
    super();
    this.shape = tileData;
    this.texture = texture;
    this.pos = {row: 0, col: 0};
    this.setup();
  }

  setup() {
    this.totalRows = this.shape.length;
    this.totalCols = 0;

    for (let row = 0; row < this.shape.length; ++row) {
      let rowData = this.shape[row];
      if (rowData.length > this.totalCols) {
        this.totalCols = rowData.length;
      }
      for (let col = 0; col < rowData.length; ++col) {
        let colData = rowData[col];
        if (colData === 1) {
          let block = new Sprite(this.texture);
          block.x = col * TILE_SIZE;
          block.y = row * TILE_SIZE;
          this.addChild(block);
        }
      }
    }
  }

  moveDown() {
    this.pos.row++;
    this._move();
  }

  moveLeft() {
    this.pos.col--;
    this._move();
  }

  moveRight() {
    this.pos.col++;
    this._move();
  }

  _move() {
    this.x = this.pos.col * TILE_SIZE;
    this.y = this.pos.row * TILE_SIZE;
  }
}

export {Tile};
