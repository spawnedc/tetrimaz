import {tilesData, TILE_SIZE, NUM_TILES} from './tile-data.js';
import {ASSETS} from '../config.js';
import {Tile} from './tile.js';
import {randomInt} from '../utils.js';
import {ENGINE} from '../engine/engine.js';

class TileManager {
  constructor() {}

  getRandomTile() {
    let idx = randomInt(0, tilesData.length - 1);
    return this.getTileAt(idx);
  }

  getTileAt(idx) {
    let tileData = tilesData[idx];
    let texture = new ENGINE.Texture(ASSETS.BLOCKS);
    let xPos = (idx % NUM_TILES) * TILE_SIZE;
    texture.frame = new ENGINE.Rectangle(xPos, 0, TILE_SIZE, TILE_SIZE).rectangle;
    return new Tile(tileData, texture);
  }
}

export {TileManager};
