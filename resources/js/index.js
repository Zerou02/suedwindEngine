import { createElement, getWorldPos, initGraphic, positionElement, sizeElement, } from "./Graphics.js";
import { Loop } from "./Loop.js";
import pos from "./Position.js";
window.Neutralino.init();
const body = document.getElementsByTagName("body")[0];
const borderThickness = Number(getComputedStyle(body).getPropertyValue("--borderThickness").split("px")[0]);
const MenuBarDimensions = {
    topHeight: 50,
    leftWidth: 100,
    rightWidth: 200,
    bottomHeight: 300,
};
const topMenu = createElement("top", "div", "menu");
const leftMenu = createElement("left", "div", "menu");
const rightMenu = createElement("right", "div", "menu");
const bottomMenu = createElement("bottom", "div", "menu");
const sizeMenuBars = () => {
    sizeElement(topMenu, window.innerWidth - 4, MenuBarDimensions.topHeight);
    positionElement(topMenu, 0, 0);
    sizeElement(leftMenu, MenuBarDimensions.leftWidth, window.innerHeight - MenuBarDimensions.topHeight - 3 * borderThickness);
    positionElement(leftMenu, 0, MenuBarDimensions.topHeight + borderThickness);
    sizeElement(rightMenu, MenuBarDimensions.rightWidth, window.innerHeight - MenuBarDimensions.topHeight - 3 * borderThickness);
    positionElement(rightMenu, window.innerWidth - MenuBarDimensions.rightWidth - 2 * borderThickness, MenuBarDimensions.topHeight + borderThickness);
    sizeElement(bottomMenu, window.innerWidth -
        MenuBarDimensions.leftWidth -
        MenuBarDimensions.rightWidth -
        4 * borderThickness, MenuBarDimensions.bottomHeight);
    positionElement(bottomMenu, MenuBarDimensions.leftWidth + borderThickness, window.innerHeight - MenuBarDimensions.bottomHeight - 2 * borderThickness);
    initGraphic(pos.new(leftMenu.getBoundingClientRect().width, topMenu.getBoundingClientRect().height), pos.new(-rightMenu.getBoundingClientRect().width, -bottomMenu.getBoundingClientRect().height), 1);
};
window.addEventListener("resize", sizeMenuBars);
let menuResizeTarget = null;
window.addEventListener("mousemove", (event) => {
    const p = pos.new(event.clientX, event.clientY);
    console.log(getWorldPos(p.x, p.y));
    const left = leftMenu.getBoundingClientRect();
    const top = topMenu.getBoundingClientRect();
    const right = rightMenu.getBoundingClientRect();
    const bottom = bottomMenu.getBoundingClientRect();
    const leftBorder = Math.abs(p.x - left.width) <= 2;
    const rightBorder = Math.abs(p.x - right.x) <= 2;
    const topBorder = Math.abs(p.y - top.height) <= 2;
    const bottomBorder = Math.abs(p.y - bottom.y) <= 2;
    if ((leftBorder || rightBorder) && p.y > top.height && p.y < bottom.y) {
        body.style.cursor = "ew-resize";
        menuResizeTarget = leftBorder ? leftMenu : rightMenu;
    }
    else if ((topBorder || bottomBorder) && p.x > left.width && p.x < right.x) {
        body.style.cursor = "ns-resize";
        menuResizeTarget = topBorder ? topMenu : bottomMenu;
    }
    else {
        body.style.cursor = "default";
        if (!resizeStart)
            menuResizeTarget = null;
    }
    if (!resizeStart)
        return;
    let border = "leftWidth";
    switch (menuResizeTarget) {
        case leftMenu:
            border = "leftWidth";
            break;
        case rightMenu:
            border = "rightWidth";
            break;
        case topMenu:
            border = "topHeight";
            break;
        case bottomMenu:
            border = "bottomHeight";
            break;
    }
    MenuBarDimensions[border] +=
        (border.includes("left") || border.includes("top") ? -1 : 1) *
            (border.includes("Width")
                ? resizeStart.x - event.clientX
                : resizeStart.y - event.clientY);
    resizeStart = pos.new(event.clientX, event.clientY);
    sizeMenuBars();
});
let resizeStart = null;
window.addEventListener("mousedown", (event) => {
    if (!menuResizeTarget)
        return;
    if (!resizeStart)
        resizeStart = pos.new(event.clientX, event.clientY);
});
window.addEventListener("mouseup", () => {
    resizeStart = null;
    menuResizeTarget = null;
});
body.append(topMenu, leftMenu, rightMenu, bottomMenu);
sizeMenuBars();
window.requestAnimationFrame(Loop);
export { body };
