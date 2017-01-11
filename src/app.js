import {Game} from './app/game.js';

let canvas = document.getElementById('game-canvas');
let game = new Game(canvas);

game.run();
