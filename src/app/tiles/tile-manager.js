import {Texture, BaseTexture, Rectangle} from 'pixi.js';
import {tilesData, TILE_SIZE, NUM_TILES} from './tile-data.js';
import {ASSETS} from '../config.js';
import {Tile} from './tile.js';
import {randomInt} from '../utils.js';

class TileManager {
  constructor() {}

  getRandomTile() {
    let idx = randomInt(0, tilesData.length - 1);
    return this.getTileAt(idx);
  }

  getTileAt(idx) {
    let tileData = tilesData[idx];
    let texture = new Texture(BaseTexture.fromImage(ASSETS.BLOCKS));
    let xPos = (idx % NUM_TILES) * TILE_SIZE;
    texture.frame = new Rectangle(xPos, 0, TILE_SIZE, TILE_SIZE);
    return new Tile(tileData, texture);
  }
}

export {TileManager};
