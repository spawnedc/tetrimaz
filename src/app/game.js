import * as PIXI from 'pixi.js';
import {ASSETS} from './config.js';
import {TileManager} from './tiles/tile-manager.js';
import {KeyboardManager} from './keyboard-manager.js';
import {Playground} from './playground.js';
import {TILE_SIZE} from './tiles/tile-data.js';
import {PLAY_AREA, DEFAULT_SPEED} from './constants.js';


class Game {
  constructor(canvas) {
    this.renderer = PIXI.autoDetectRenderer(960, 540, {
      resolution: 1,
      view: canvas
    });

    this.renderer.view.style.position = "absolute";
    this.renderer.view.style.display = "block";
    this.renderer.autoResize = true;
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  run() {
    this.preload();
  }

  preload() {
    PIXI.loader
      .add(Object.values(ASSETS))
      .load(() => {
        this.setup();
      });
  }

  setup() {
    this.tm = new TileManager();
    this.km = new KeyboardManager();
    this.stage = new PIXI.Container();

    this.playground = new Playground(PLAY_AREA.ROWS, PLAY_AREA.COLS, TILE_SIZE);

    this.stage.addChild(this.playground);

    this.tile = this.tm.getRandomTile();
    this.stage.addChild(this.tile);

    this.km.left.onKeyDown = () => {
      let potentialPos = {
        row: this.tile.pos.row,
        col: this.tile.pos.col - 1
      };
      let canMoveToPos = this.playground.canMoveToPos(this.tile.shape, potentialPos);
      if(canMoveToPos) {
        this.tile.moveLeft();
      }
    };

    this.km.right.onKeyDown = () => {
      let potentialPos = {
        row: this.tile.pos.row,
        col: this.tile.pos.col + 1
      };
      let canMoveToPos = this.playground.canMoveToPos(this.tile.shape, potentialPos);
      if(canMoveToPos) {
        this.tile.moveRight();
      }
    };

    this.km.up.onKeyDown = () => {
      let {shape} = this.tile.getRotatedShapeCW();
      let canMoveToPos = this.playground.canMoveToPos(shape, this.tile.pos);
      if(canMoveToPos) {
        this.tile.rotateCW();
      }
    };

    this.km.down.onKeyDown = () => {
      let {shape} = this.tile.getRotatedShapeCCW();
      let canMoveToPos = this.playground.canMoveToPos(shape, this.tile.pos);
      if(canMoveToPos) {
        this.tile.rotateCCW();
      }
    };

    this.state = this.play;

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(() => {
      let potentialPos = {
        row: this.tile.pos.row + 1,
        col: this.tile.pos.col
      };
      let canMoveToPos = this.playground.canMoveToPos(this.tile.shape, potentialPos);
      if(canMoveToPos) {
        this.tile.moveDown();
      } else {
        this.playground.updateField(this.tile.shape, this.tile.pos);
        this.tile = this.tm.getRandomTile();
        this.stage.addChild(this.tile);
      }
    });

    this.gameLoop();
  }

  gameLoop(time) {
    let delta = 0;
    if (time) {
      delta = time - this.ticker.lastTime;
      if (delta >= DEFAULT_SPEED) {
        this.ticker.update(time);
        this.lastTime = time;
      }
    }

    requestAnimationFrame(this.gameLoop.bind(this));

    this.state();

    this.renderer.render(this.stage);
  }

  play() {

  }
}

export {Game};
