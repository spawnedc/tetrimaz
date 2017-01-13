import {adapter} from '../settings.js';

const ENGINE = {
  Container: adapter.Container,
  Ticker: adapter.Ticker,
  Graphics: adapter.Graphics,
  Rectangle: adapter.Rectangle,
  Sprite: adapter.Sprite,
  Texture: adapter.Texture,
  preload: adapter.preload,
  getRenderer: adapter.getRenderer
};

export {ENGINE};
