import {KEYS} from './constants.js';

class KeyboardManager {
  constructor() {
    this.left = this.setupKey(KEYS.LEFT);
    this.up = this.setupKey(KEYS.UP);
    this.right = this.setupKey(KEYS.RIGHT);
    this.down = this.setupKey(KEYS.DOWN);
  }

  setupKey(keyCode) {
    let key = {
      code: keyCode,
      isDown: false,
      isUp: true,
      onKeyDown: undefined,
      onKeyUp: undefined,
      onKeyDownHandler: (event) => {
        if (event.keyCode === key.code) {
          if (key.isUp && key.onKeyDown) {
            key.onKeyDown(key.code);
          }
          key.isDown = true;
          key.isUp = false;
        }
        event.preventDefault();
      },
      onKeyUpHandler: (event) => {
        if (event.keyCode === key.code) {
          if (key.isDown && key.onKeyUp) {
            key.onKeyUp(key.code);
          }
          key.isDown = false;
          key.isUp = true;
        }
        event.preventDefault();
      }
    };

    //Attach event listeners
    window.addEventListener('keydown', key.onKeyDownHandler.bind(key), false);
    window.addEventListener('keyup', key.onKeyUpHandler.bind(key), false);
    return key;
  }
}

export {KeyboardManager};
