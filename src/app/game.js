import {ASSETS} from './config.js';
import {KeyboardManager} from './keyboard-manager.js';
import {Playground} from './playground.js';
import {TILE_SIZE} from './tiles/tile-data.js';
import {PLAY_AREA, DEFAULT_SPEED} from './constants.js';
import {PlayState} from './states/play.js';
import {ENGINE} from './engine/engine.js';


class Game {
  constructor(canvas) {
    this.renderer = ENGINE.getRenderer(canvas, 960, 540);
  }

  run() {
    this.preload();
  }

  preload() {
    ENGINE
      .preload(Object.values(ASSETS))
      .then(() => {
        this.setup();
      });
  }

  setup() {
    this.km = new KeyboardManager();
    this.stage = new ENGINE.Container();
    this.playground = new Playground(PLAY_AREA.ROWS, PLAY_AREA.COLS, TILE_SIZE);
    this.ticker = new ENGINE.Ticker();

    this.stage.addChild(this.playground.container);

    this.states = {
      play: new PlayState(this.stage, this.playground)
    };

    this.setState(this.states.play);

    this.gameLoop();
  }

  setState(state) {
    this.currentState = state;
    this.stage.addChild(...this.currentState.renderables);

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

    this.renderer.render(this.stage.container);
  }
}

export {Game};
