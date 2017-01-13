import {ticker} from 'pixi.js';

class PIXITicker {
  constructor() {
    this.ticker = new ticker.Ticker();
  }

  add(fn) {
    this.ticker.add(fn);
  }

  get lastTime() {
    return this.ticker.lastTime;
  }

  update(time) {
    this.ticker.update(time);
  }
}

export {PIXITicker};
