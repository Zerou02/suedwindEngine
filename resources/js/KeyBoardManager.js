export class KeyboardManager {
    constructor() {
        this.keys = {};
        this.debug = false;
        this.addFunction = (key, functi, singleExecution = true) => {
            this.keys[key] = { pressed: false, fn: functi, singleExecution };
        };
        window.addEventListener("keydown", (e) => {
            if (this.debug) {
                console.log("Key: ", e.key, "  n Event:", e, "time: ", new Date().getMilliseconds());
            }
            if (!this.keys[e.key])
                return;
            this.keys[e.key].pressed = true;
        });
        window.addEventListener("keyup", (e) => {
            this.keys[e.key].pressed = false;
        });
        setInterval(() => {
            Object.values(this.keys).forEach((x) => {
                if (x.pressed)
                    x.fn();
                if (x.singleExecution)
                    x.pressed = false;
            });
        }, 1000 / 30);
    }
}
