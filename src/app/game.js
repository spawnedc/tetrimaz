import * as PIXI from 'pixi.js';
import {ASSETS} from './config.js';
import {TileManager} from './tile-manager.js';
import {KeyboardManager} from './keyboard-manager.js';
import {Playground} from './playground.js';
import {TILE_SIZE} from './tile-data.js';
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
      this.tile.x -= TILE_SIZE;
    };

    this.km.right.onKeyDown = () => {
      this.tile.x += TILE_SIZE;
    };

    this.state = this.play;

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(() => {
      let bounds = this.tile.getBounds();
      if (bounds.bottom >= this.playground.height) {
        this.tile = this.tm.getRandomTile();
        this.stage.addChild(this.tile);
      } else {
        this.tile.y += TILE_SIZE;
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
