import {BaseTexture, Texture} from 'pixi.js';

class PIXITexture {
  constructor(image) {
    this.texture = new Texture(BaseTexture.fromImage(image));
  }

  get frame() {
    return this.texture.frame;
  }

  set frame(frame) {
    this.texture.frame = frame;
  }
}

export {PIXITexture};
