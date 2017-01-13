import {BaseState} from './base.js';
import {TileManager} from '../tiles/tile-manager.js';
import {KEYS} from '../constants.js';

class PlayState extends BaseState {
  constructor(stage, playground) {
    super();
    this.renderables = [];
    this.tm = new TileManager();
    this.tile = this.tm.getRandomTile();
    this.stage = stage;
    this.playground = playground;

    this.renderables.push(this.tile.container);
  }

  loop() {}

  tick() {
    let potentialPos = {
      row: this.tile.pos.row + 1,
      col: this.tile.pos.col
    };
    let canMoveToPos = this.playground.canMoveToPos(this.tile.shape, potentialPos);
    if(canMoveToPos) {
      this.tile.moveDown();
    } else {
      this.playground.updateField(this.tile.shape, this.tile.pos);
      this.stage.removeChild(this.tile.container);
      this.playground.checkForClearedLines();
      this.tile = this.tm.getRandomTile();
      this.stage.addChild(this.tile.container);
    }
  }

  onKeyDown(keyCode) {
    if(keyCode === KEYS.LEFT || keyCode === KEYS.RIGHT) {
      this.moveTile(keyCode);
    } else if(keyCode === KEYS.DOWN || keyCode === KEYS.UP) {
      this.rotateTile(keyCode);
    }
  }

  moveTile(keyCode) {
    let direction = keyCode === KEYS.LEFT ? -1 : 1;
    let potentialPos = {
      row: this.tile.pos.row,
      col: this.tile.pos.col + direction
    };
    let canMoveToPos = this.playground.canMoveToPos(this.tile.shape, potentialPos);
    if(canMoveToPos) {
      this.tile.moveHorizontal(direction);
    }
  }

  rotateTile(keyCode) {
    // -1: CCW, 1: CW
    let direction = keyCode === KEYS.LEFT ? -1 : 1;
    let {shape} = this.tile.getRotatedShape(direction);
    let canMoveToPos = this.playground.canMoveToPos(shape, this.tile.pos);
    if(canMoveToPos) {
      this.tile.rotate(direction);
    }
  }
}

export {PlayState};
