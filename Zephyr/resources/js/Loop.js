import { draw, shiftWorld } from "./Graphics.js";
import { sizeMenuBars } from "./MenuBars.js";
import pos from "./Position.js";
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
    if ("w" in pressedKeys)
        shiftWorld(pos.new(0, -1));
    if ("s" in pressedKeys)
        shiftWorld(pos.new(0, 1));
    if ("a" in pressedKeys)
        shiftWorld(pos.new(-1, 0));
    if ("d" in pressedKeys)
        shiftWorld(pos.new(1, 0));
};
export { Loop, pressedKeys };
