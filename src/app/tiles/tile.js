import {TILE_SIZE} from './tile-data.js';
import {ENGINE} from '../engine/engine.js';

class Tile {
  constructor(tileData, texture) {
    this.container = new ENGINE.Container();
    this.texture = texture;
    this.pos = {row: 0, col: 0};
    this.rotationData = tileData;
    this.rotationIndex = 0;
    this.setShape(this.rotationIndex);
  }

  render() {
    this.container.removeChildren();
    this.totalRows = this.shape.length;
    this.totalCols = 0;

    for (let row = 0; row < this.shape.length; ++row) {
      let rowData = this.shape[row];
      if (rowData.length > this.totalCols) {
        this.totalCols = rowData.length;
      }
      for (let col = 0; col < rowData.length; ++col) {
        let colData = rowData[col];
        if (colData !== 0) {
          let block = new ENGINE.Sprite(this.texture);
          block.x = col * TILE_SIZE;
          block.y = row * TILE_SIZE;
          this.container.addChild(block);
        }
      }
    }
  }

  setShape(index) {
    this.rotationIndex = index;
    this.shape = this.rotationData[this.rotationIndex];
    this.render();
  }

  rotate(direction) {
    let {rotationIndex} = this.getRotatedShape(direction);
    this.setShape(rotationIndex);
  }

  getRotatedShape(direction) {
    let rotationIndex = this.rotationIndex + direction;
    if(rotationIndex === this.rotationData.length) {
      rotationIndex = 0;
    } else if(rotationIndex < 0) {
      rotationIndex = this.rotationData.length - 1;
    }

    let shape = this.rotationData[rotationIndex];

    return {rotationIndex, shape};
  }

  moveDown() {
    this.pos.row++;
    this._move();
  }

  moveHorizontal(direction) {
    this.pos.col += direction;
    this._move();
  }

  _move() {
    this.container.x = this.pos.col * TILE_SIZE;
    this.container.y = this.pos.row * TILE_SIZE;
  }
}

export {Tile};
