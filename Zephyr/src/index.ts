import { createElement } from "./DOM.js";
import {
  hoveredWorldObject,
  initGraphic,
  registerComp,
  setViewDimension,
  updateComp,
} from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
//@ts-ignore
import colorValues from "../colorValues.json" assert { type: "json" };
// //@ts-ignore
// import { saveWorld, loadWorld } from "../../../EoS/Eos.js";

//@ts-ignore
window.Neutralino.init();

const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
initGraphic();
const MenuBars = initMenuBars(
  (origin, end) => setViewDimension(origin, end, 1),
  {
    hiddenMenus: ["top"],
    leftWidth: 300,
  }
);

const left = createElement("leftMenuBarContentHolder", "div", "contentHolder");
const addRect = createElement("addRect", "div", "button");
addRect.innerText = "add Rectangle";
addRect.addEventListener("click", () => registerComp("", "rect"));
left.append(addRect);

let clickedWorldObjectPropertyMenu: HTMLDivElement | null = null;
const clickOnWorldObject = () => {
  if (!hoveredWorldObject) return;
  const id = hoveredWorldObject.id;
  if (clickedWorldObjectPropertyMenu) clickedWorldObjectPropertyMenu.remove();
  clickedWorldObjectPropertyMenu = createElement(
    "rightMenuBarContentHolder",
    "div",
    "contentHolder"
  ) as HTMLDivElement;
  Object.entries(hoveredWorldObject)
    .sort((a) => {
      if (a[0] === "type") return -1;
      else return 1;
    })
    .forEach(([property, value]) => {
      if (property === "type") {
        const title = createElement(property, "div", "title");
        const t =
          (value as string)[0].toUpperCase() + (value as string).slice(1);
        title.innerText = t;
        clickedWorldObjectPropertyMenu?.append(title);
        return;
      }
      const holder = createElement(property, "div", "propertyHolder");
      const name = createElement(`${property}-name`, "span", "propertyName");
      name.innerText = `${property}: `;
      let val: HTMLInputElement | null = null;
      if (typeof value === "string") {
        val = createElement(
          `${property}-value`,
          "input",
          "propertyValue"
        ) as HTMLInputElement;
        if (property === "color") {
          val.type = "color";
          if (value.startsWith("rgb"))
            val.value = value
              .slice(value.indexOf("(") + 1, value.length - 1)
              .split(",")
              .reduce(
                (last, curr) =>
                  last + ("0" + parseInt(curr).toString(16)).slice(-2),
                "#"
              );
          else if (value.startsWith("#")) val.value = value;
          else val.value = colorValues[value];
          val.addEventListener("input", () => {
            updateComp(id, {
              property,
              value: (val as HTMLInputElement).value as string,
            });
          });
        } else {
          val.value = value;
          val.addEventListener("keypress", (event) => {
            if (event.key !== "Enter") return;
            updateComp(id, {
              property,
              value: (val as HTMLInputElement).value as string,
            });
          });
        }
      } else if (typeof value === "object") {
        
      }
      if (val) holder.append(name, val);
      else holder.append(name);
      clickedWorldObjectPropertyMenu?.append(holder);
    });
  MenuBars.appendToMenuBar("right", clickedWorldObjectPropertyMenu);
  console.log(hoveredWorldObject);
};

document.addEventListener("click", clickOnWorldObject);

MenuBars.appendToMenuBar("left", left);

window.requestAnimationFrame(Loop);

// const run = async () => {
//   return new Promise(async (resolve) => {
//     //@ts-ignore
//     await saveWorld(w.components);
//     //@ts-ignore
//     const runTime = await Neutralino.os.spawnProcess("run Notos");
//     //@ts-ignore
//     console.log(await loadWorld());
//     resolve(runTime);
//   });
// };

// //@ts-ignore
// const runTime = await run();
// //@ts-ignore
// setTimeout(() => Neutralino.os.updateSpawnedProcess(runTime.id, "exit"), 5000);

export { body };
