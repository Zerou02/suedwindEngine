import { KeyboardManager } from "./KeyBoardManager.js";
import { LoopManager } from "./LoopManager.js";
export const gAssetPath = "./assets/";
export const gLoopManager = new LoopManager();
export const gKeyBoardManager = new KeyboardManager();
window.requestAnimationFrame(gLoopManager.evalFns);
