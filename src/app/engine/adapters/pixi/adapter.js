import * as PIXI from 'pixi.js';
import {PIXIContainer} from './container.js';
import {PIXIGraphics} from './graphics.js';
import {PIXISprite} from './sprite.js';
import {PIXITexture} from './texture.js';

class PIXIAdapter {
  constructor() {
    this.Container = PIXIContainer;
    this.Graphics = PIXIGraphics;
    this.Sprite = PIXISprite;
    this.Texture = PIXITexture;
    this.Ticker = PIXI.ticker.Ticker;
    this.Rectangle = PIXI.Rectangle;
  }

  getRenderer(canvas, width, height) {
    let renderer = PIXI.autoDetectRenderer(width, height, {
      resolution: 1,
      view: canvas
    });

    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);

    return renderer;
  }

  preload(assets) {
    let loader = PIXI.loader;
    return new Promise((resolve, reject) => {
      loader
        .add(assets)
        .load(() => {
          resolve();
        });

      loader.onError.add(reject);
    });
  }
}

export {PIXIAdapter};
