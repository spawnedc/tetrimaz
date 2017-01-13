import {Container} from 'pixi.js';

class PIXIContainer {
  constructor() {
    this.container = new Container();
  }

  addChild(...children) {
    let pixiContainers = children.map((child) => child.container);
    this.container.addChild(...pixiContainers);
  }

  removeChild(...children) {
    let pixiContainers = children.map((child) => child.container);
    this.container.removeChild(...pixiContainers);
  }

  removeChildren(beginIndex, endIndex) {
    this.container.removeChildren(beginIndex, endIndex);
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

export {PIXIContainer};
