import { gLoopManager } from "./globals.js";

interface KeyMapVal {
  pressed: boolean;
  fn: CallableFunction;
  singleExecution: boolean;
}

interface KeyMap {
  [key: string]: KeyMapVal;
}

export class KeyboardManager {
  keys: KeyMap = {};
  _keysArrayMapped: KeyMapVal[] = [];
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
          new Date().getMilliseconds(),
          "keys:",
          this.keys
        );
      }
      if (!this.keys[e.key]) return;

      this.keys[e.key].pressed = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.key].pressed = false;
    });

    gLoopManager.addFn(() => this.keyBoardEval());
  }

  keyBoardEval() {
    this._keysArrayMapped.forEach((x) => {
      if (x.pressed) x.fn();
      if (x.singleExecution) x.pressed = false;
    });
  }

  addFunction = (
    key: string,
    functi: (e: KeyboardEvent) => void,
    singleExecution: boolean = false
  ) => {
    this.keys[key] = { pressed: false, fn: functi, singleExecution };
    this._keysArrayMapped = Object.values(this.keys);
  };
}
