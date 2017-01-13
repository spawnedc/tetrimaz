import {Graphics} from 'pixi.js';

class PIXIGraphics {
  constructor() {
    this.container = new Graphics();
  }

  beginFill(colour) {
    this.container.beginFill(colour);
  }

  drawRect(x, y, width, height) {
    this.container.drawRect(x, y, width, height);
  }
}

export {PIXIGraphics};
