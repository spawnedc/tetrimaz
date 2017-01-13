import {PIXIAdapter} from './engine/adapters/pixi/adapter.js';

const ADAPTERS = {
  PIXI: PIXIAdapter
};

let adapter = new ADAPTERS.PIXI();

export {adapter};
