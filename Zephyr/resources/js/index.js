import { setViewDimension, w } from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
import { saveWorld, loadWorld } from "../../../EoS/Eos.js";
window.Neutralino.init();
const body = document.getElementsByTagName("body")[0];
initMenuBars((origin, end) => setViewDimension(origin, end, 1));
console.log("change");
window.requestAnimationFrame(Loop);
const run = async () => {
    return new Promise(async (resolve) => {
        await saveWorld(w.components);
        const runTime = await Neutralino.os.spawnProcess("run Notos");
        console.log(await loadWorld());
        resolve(runTime);
    });
};
const runTime = await run();
setTimeout(() => Neutralino.os.updateSpawnedProcess(runTime.id, "exit"), 5000);
export { body };
