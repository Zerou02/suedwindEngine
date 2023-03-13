import { initGraphic } from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
window.Neutralino.init();
const body = document.getElementsByTagName("body")[0];
initMenuBars((origin, end) => initGraphic(origin, end, 1));
window.requestAnimationFrame(Loop);
export { body };
