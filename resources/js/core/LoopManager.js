export class LoopManager {
    constructor() {
        this.lastTime = 0;
        this._fpstarget = 30;
        this.addFn = (fn) => {
            this.loopFns.push(fn);
        };
        this.loopFns = [];
        this.lastTime = 0;
    }
    evalFns(time) {
        const delta = time - this.lastTime;
        if (delta >= 1000 / 30) {
            this.loopFns.forEach((x) => {
                x();
            });
            this.lastTime = time;
        }
        window.requestAnimationFrame(this.evalFns);
    }
}
