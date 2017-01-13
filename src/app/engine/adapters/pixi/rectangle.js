import {Rectangle} from 'pixi.js';

class PIXIRectangle {
  constructor(x, y, width, height) {
    this.rectangle = new Rectangle(x, y, width, height);
  }

  get width() {
    return this.rectangle.width;
  }

  get height() {
    return this.rectangle.height;
  }

}

export {PIXIRectangle};
