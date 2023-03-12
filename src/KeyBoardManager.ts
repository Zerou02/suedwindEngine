interface KeyMap {
  [key: string]: {
    pressed: boolean;
    fn: CallableFunction;
    singleExecution: boolean;
  };
}

export class KeyboardManager {
  keys: KeyMap = {};
  pressedKeys: {};
  debug: boolean = false;

  constructor() {
    window.addEventListener("keydown", (e) => {
      if (this.debug) {
        console.log(
          "Key: ",
          e.key,
          "  n Event:",
          e,
          "time: ",
          new Date().getMilliseconds()
        );
      }
      if (!this.keys[e.key]) return;

      this.keys[e.key].pressed = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.key].pressed = false;
    });
    setInterval(() => {
      Object.values(this.keys).forEach((x) => {
        if (x.pressed) x.fn();
        if (x.singleExecution) x.pressed = false;
      });
    }, 1000 / 30);
  }

  addFunction = (
    key: string,
    functi: CallableFunction,
    singleExecution: boolean = true
  ) => {
    this.keys[key] = { pressed: false, fn: functi, singleExecution };
  };
}
