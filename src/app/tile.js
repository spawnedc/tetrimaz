import {Container, Sprite} from 'pixi.js';
import {TILE_SIZE} from './tile-data.js';

class Tile extends Container {
  constructor(tileData, texture) {
    super();
    this.texture = texture;
    this.pos = {row: 0, col: 0};
    this.rotationData = tileData;
    this.rotationIndex = 0;
    this.setShape(this.rotationIndex);
  }

  render() {
    this.removeChildren();
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

  setShape(index) {
    this.rotationIndex = index;
    this.shape = this.rotationData[this.rotationIndex];
    this.render();
  }

  rotateCW() {
    let {rotationIndex} = this.getRotatedShapeCW();
    this.setShape(rotationIndex);
  }

  rotateCCW() {
    let {rotationIndex} = this.getRotatedShapeCCW();
    this.setShape(rotationIndex);
  }

  getRotatedShapeCW() {
    let rotationIndex = this.rotationIndex + 1;
    if(rotationIndex === this.rotationData.length) {
      rotationIndex = 0;
    }

    let shape = this.rotationData[rotationIndex];

    return {rotationIndex, shape};
  }

  getRotatedShapeCCW() {
    let rotationIndex = this.rotationIndex - 1;
    if(rotationIndex < 0) {
      rotationIndex = this.rotationData.length - 1;
    }

    let shape = this.rotationData[rotationIndex];

    return {rotationIndex, shape};
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
