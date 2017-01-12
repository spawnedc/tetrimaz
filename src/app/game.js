import * as PIXI from 'pixi.js';
import {ASSETS} from './config.js';
import {KeyboardManager} from './keyboard-manager.js';
import {Playground} from './playground.js';
import {TILE_SIZE} from './tiles/tile-data.js';
import {PLAY_AREA, DEFAULT_SPEED} from './constants.js';
import {PlayState} from './states/play.js';


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
    this.km = new KeyboardManager();
    this.stage = new PIXI.Container();
    this.playground = new Playground(PLAY_AREA.ROWS, PLAY_AREA.COLS, TILE_SIZE);
    this.ticker = new PIXI.ticker.Ticker();

    this.stage.addChild(this.playground);

    this.states = {
      play: new PlayState(this.stage, this.playground)
    };

    this.setState(this.states.play);

    this.gameLoop();
  }

  setState(state) {
    this.currentState = state;
    this.stage.addChild.apply(this.stage, this.currentState.renderables);

    this.ticker.add(this.currentState.tick.bind(this.currentState));

    this.km.left.onKeyDown = this.currentState.onKeyDown.bind(this.currentState);
    this.km.right.onKeyDown = this.currentState.onKeyDown.bind(this.currentState);
    this.km.up.onKeyDown = this.currentState.onKeyDown.bind(this.currentState);
    this.km.down.onKeyDown = this.currentState.onKeyDown.bind(this.currentState);
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

    this.currentState.loop();

    this.renderer.render(this.stage);
  }
}

export {Game};
