class KeyboardManager {
  constructor() {
    this.left = this.setupKey(37);
    this.up = this.setupKey(38);
    this.right = this.setupKey(39);
    this.down = this.setupKey(40);
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
            key.onKeyDown();
          }
          key.isDown = true;
          key.isUp = false;
        }
        event.preventDefault();
      },
      onKeyUpHandler: (event) => {
        if (event.keyCode === key.code) {
          if (key.isDown && key.onKeyUp) {
            key.onKeyUp();
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
