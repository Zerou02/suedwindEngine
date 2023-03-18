export class LoopManager {
  loopFns: Array<() => void>;
  lastTime: number = 0;
  _fpstarget = 30;

  constructor() {
    this.loopFns = [];
    this.lastTime = 0;
    window.requestAnimationFrame((w) => this.evalFns(w));
  }

  addFn = (fn: () => void) => {
    this.loopFns.push(fn);
  };

  evalFns(time: number) {
    const delta = time - this.lastTime;
    if (delta >= 1000 / 30) {
      this.loopFns.forEach((x) => {
        x();
      });
      this.lastTime = time;
    }
    window.requestAnimationFrame((w) => this.evalFns(w));
  }
}
