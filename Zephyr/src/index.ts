import { setViewDimension, w } from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
//@ts-ignore
import { saveWorld, loadWorld } from "../../../EoS/Eos.js";

//@ts-ignore
window.Neutralino.init();

const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

initMenuBars((origin, end) => setViewDimension(origin, end, 1));
console.log("change");
window.requestAnimationFrame(Loop);

const run = async () => {
  return new Promise(async (resolve) => {
    //@ts-ignore
    await saveWorld(w.components);
    //@ts-ignore
    const runTime = await Neutralino.os.spawnProcess("run Notos");
    //@ts-ignore
    console.log(await loadWorld());
    resolve(runTime);
  });
};

//@ts-ignore
const runTime = await run();
//@ts-ignore
setTimeout(() => Neutralino.os.updateSpawnedProcess(runTime.id, "exit"), 5000);

export { body };
