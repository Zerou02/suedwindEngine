import { createElement } from "./DOM.js";
import { hoveredWorldObject, initGraphic, registerComp, setViewDimension, updateComp, w, } from "./Graphics.js";
import { Loop } from "./Loop.js";
import initMenuBars from "./MenuBars.js";
import colorValues from "../colorValues.json" assert { type: "json" };
import pos from "./Position.js";
window.Neutralino.init();
const body = document.getElementsByTagName("body")[0];
initGraphic();
const MenuBars = initMenuBars((origin, end) => setViewDimension(origin, end, 1), {
    hiddenMenus: ["top"],
    leftWidth: 300,
});
const left = createElement("leftMenuBarContentHolder", "div", "contentHolder");
const addRect = createElement("addRect", "div", "button");
addRect.innerText = "add Rectangle";
addRect.addEventListener("click", () => registerComp("", "rect"));
left.append(addRect);
let clickedWorldObjectPropertyMenu = null;
const clickOnWorldObject = () => {
    console.log(w.components);
    if (!hoveredWorldObject)
        return;
    const id = hoveredWorldObject.id;
    if (clickedWorldObjectPropertyMenu)
        clickedWorldObjectPropertyMenu.remove();
    clickedWorldObjectPropertyMenu = createElement("rightMenuBarContentHolder", "div", "contentHolder");
    Object.entries(hoveredWorldObject)
        .sort((a) => {
        if (a[0] === "type")
            return -1;
        else
            return 1;
    })
        .forEach(([property, value]) => {
        if (property === "type") {
            const title = createElement(property, "div", "title");
            const t = value[0].toUpperCase() + value.slice(1);
            title.innerText = t;
            clickedWorldObjectPropertyMenu?.append(title);
            return;
        }
        const holder = createElement(property, "div", "propertyHolder");
        const name = createElement(`${property}-name`, "span", "propertyName");
        name.innerText = `${property}: `;
        let val = null;
        if (typeof value === "string") {
            val = createElement(`${property}-value`, "input", "propertyValue");
            if (property === "color") {
                val.type = "color";
                if (value.startsWith("rgb"))
                    val.value = value
                        .slice(value.indexOf("(") + 1, value.length - 1)
                        .split(",")
                        .reduce((last, curr) => last + ("0" + parseInt(curr).toString(16)).slice(-2), "#");
                else if (value.startsWith("#"))
                    val.value = value;
                else
                    val.value = colorValues[value];
                val.addEventListener("input", () => {
                    updateComp(id, {
                        property,
                        value: val.value,
                    });
                });
            }
            else {
                val.value = value;
                val.addEventListener("keypress", (event) => {
                    if (event.key !== "Enter")
                        return;
                    updateComp(id, {
                        property,
                        value: val.value,
                    });
                });
            }
        }
        else if (typeof value === "object" &&
            value.x !== undefined &&
            value.y !== undefined) {
            name.style.minWidth = `100%`;
            name.style.textAlign = "left";
            name.style.borderBottom = "1px solid aliceblue";
            val = createElement(`${property}Coords`, "div", "holder");
            val.style.display = "block";
            const x = createElement(`${property}X`, "div", "holder");
            const xName = createElement(`${property}X-name`, "span", "propertyName");
            xName.innerText = `x: `;
            const xValue = createElement(`${property}X-value`, "input", "propertyValue");
            xValue.value = `${value.x}`;
            xValue.addEventListener("keypress", (event) => {
                if (event.key !== "Enter")
                    return;
                updateComp(id, {
                    property,
                    value: pos.new(Number(xValue.value), Number(yValue.value)),
                });
            });
            const y = createElement(`${property}Y`, "div", "holder");
            const yName = createElement(`${property}Y-name`, "span", "propertyName");
            yName.innerText = `y: `;
            const yValue = createElement(`${property}Y-value`, "input", "propertyValue");
            yValue.value = `${value.y}`;
            yValue.addEventListener("keypress", (event) => {
                if (event.key !== "Enter")
                    return;
                updateComp(id, {
                    property,
                    value: pos.new(Number(xValue.value), Number(yValue.value)),
                });
            });
            x.append(xName, xValue);
            y.append(yName, yValue);
            val.append(x, y);
        }
        if (val)
            holder.append(name, val);
        else
            holder.append(name);
        clickedWorldObjectPropertyMenu?.append(holder);
    });
    MenuBars.appendToMenuBar("right", clickedWorldObjectPropertyMenu);
    console.log(hoveredWorldObject);
};
document.addEventListener("click", clickOnWorldObject);
MenuBars.appendToMenuBar("left", left);
window.requestAnimationFrame(Loop);
export { body };
