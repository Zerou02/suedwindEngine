import { draw } from "./Graphics.js";
const FPSTARGET = 30;
let end = false;
let lastTime = 0;
const Loop = (time) => {
    const delta = time - lastTime;
    if (delta >= 1000 / FPSTARGET)
        update();
    if (!end)
        window.requestAnimationFrame(Loop);
};
const update = () => {
    draw();
};
export { Loop };
