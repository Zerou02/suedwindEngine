import { setViewDimension } from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
window.Neutralino.init();
const body = document.getElementsByTagName("body")[0];
initMenuBars((origin, end) => setViewDimension(origin, end, 1), {
    borderThickness: 2,
});
window.requestAnimationFrame(Loop);
export { body };
