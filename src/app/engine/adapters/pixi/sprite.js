import {Sprite} from 'pixi.js';

class PIXISprite {
  constructor(texture) {
    this.container = new Sprite(texture);
  }

  get x() {
    return this.container.x;
  }

  set x(xVal) {
    this.container.x = xVal;
  }

  get y() {
    return this.container.y;
  }

  set y(yVal) {
    this.container.y = yVal;
  }
}

export {PIXISprite};
