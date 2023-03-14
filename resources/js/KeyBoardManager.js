export class KeyboardManager {
    constructor() {
        this.keys = {};
        this._keysArrayMapped = [];
        this.debug = false;
        this.addFunction = (key, functi, singleExecution = false) => {
            this.keys[key] = { pressed: false, fn: functi, singleExecution };
            this._keysArrayMapped = Object.values(this.keys);
        };
        window.addEventListener("keydown", (e) => {
            if (this.debug) {
                console.log("Key: ", e.key, "  n Event:", e, "time: ", new Date().getMilliseconds(), "keys:", this.keys);
            }
            if (!this.keys[e.key])
                return;
            this.keys[e.key].pressed = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keys[e.key].pressed = false;
        });
        setInterval(() => this.keyBoardEval(), 1000 / 30);
    }
    keyBoardEval() {
        this._keysArrayMapped.forEach((x) => {
            if (x.pressed)
                x.fn();
            if (x.singleExecution)
                x.pressed = false;
        });
    }
}
