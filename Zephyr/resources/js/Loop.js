import { draw } from "./Graphics.js";
import { sizeMenuBars } from "./MenuBars.js";
const FPSTARGET = 30;
let pressedKeys = {};
window.addEventListener("keydown", (event) => {
    pressedKeys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    delete pressedKeys[event.key];
});
let end = false;
let lastTime = 0;
const Loop = (time) => {
    const delta = time - lastTime;
    if (delta >= 1000 / FPSTARGET) {
        lastTime = time;
        update();
    }
    if (!end)
        window.requestAnimationFrame(Loop);
};
const update = () => {
    sizeMenuBars();
    draw();
};
export { Loop, pressedKeys };
