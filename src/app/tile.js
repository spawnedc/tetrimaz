import {Container, Sprite} from 'pixi.js';
const BLOCK_WIDTH = 30;
const BLOCK_HEIGHT = 30;

class Tile extends Container {
  constructor(tileData, texture) {
    super();
    this.shape = tileData;
    this.texture = texture;
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
          block.x = col * BLOCK_WIDTH;
          block.y = row * BLOCK_HEIGHT;
          this.addChild(block);
        }
      }
    }
  }
}

export {Tile};
