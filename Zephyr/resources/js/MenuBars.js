import { createElement, positionElement, sizeElement } from "./DOM.js";
import { body } from "./index.js";
import pos from "./Position.js";
let borderThickness = 2;
const Controller = {
    MenuBarDimensions: {
        topHeight: 50,
        leftWidth: 100,
        rightWidth: 200,
        bottomHeight: 300,
    },
    MinDimensions: {
        topHeight: 50,
        leftWidth: 50,
        rightWidth: 50,
        bottomHeight: 50,
    },
    setBorderThickness: (thickness) => {
        borderThickness = thickness;
        body.style.setProperty("--borderThickness", `${thickness}px`);
    },
    pause: () => {
        window.removeEventListener("mousemove", handleMouseMoveNearBorder);
        window.removeEventListener("mousedown", startResize);
        window.removeEventListener("mouseup", resetResizeState);
        window.removeEventListener("dblclick", minMaxOnDoubleClickNearBorder);
    },
    start: () => {
        window.addEventListener("resize", sizeMenuBars);
        window.addEventListener("mousemove", handleMouseMoveNearBorder);
        window.addEventListener("mousedown", startResize);
        window.addEventListener("mouseup", resetResizeState);
        window.addEventListener("dblclick", minMaxOnDoubleClickNearBorder);
    },
    close: () => {
        Controller.pause();
        window.removeEventListener("resize", sizeMenuBars);
        topMenu.remove();
        leftMenu.remove();
        rightMenu.remove();
        bottomMenu.remove();
    },
    appendToMenuBar: (menuBar, element) => document.getElementById(menuBar)?.append(element),
    toggleMenuBarResize: (menubar) => resizableMenuBars.includes(menubar)
        ? resizableMenuBars.filter((id) => id !== menubar)
        : resizableMenuBars.push(menubar),
};
const idToDimensionKey = {
    left: "leftWidth",
    right: "rightWidth",
    top: "topHeight",
    bottom: "bottomHeight",
};
let resizableMenuBars = ["left", "bottom", "right", "top"];
const topMenu = createElement("top", "div", "menuBar");
topMenu.draggable = false;
const leftMenu = createElement("left", "div", "menuBar");
leftMenu.draggable = false;
const rightMenu = createElement("right", "div", "menuBar");
rightMenu.draggable = false;
const bottomMenu = createElement("bottom", "div", "menuBar");
bottomMenu.draggable = false;
let resizeCallback = (origin, end) => {
    console.log("No resizeCallback set.");
    console.log(origin, end);
};
const sizeMenuBars = () => {
    sizeElement(topMenu, window.innerWidth - 4, Controller.MenuBarDimensions.topHeight);
    positionElement(topMenu, 0, 0);
    sizeElement(leftMenu, Controller.MenuBarDimensions.leftWidth, window.innerHeight -
        Controller.MenuBarDimensions.topHeight -
        3 * borderThickness);
    positionElement(leftMenu, 0, Controller.MenuBarDimensions.topHeight + borderThickness);
    sizeElement(rightMenu, Controller.MenuBarDimensions.rightWidth, window.innerHeight -
        Controller.MenuBarDimensions.topHeight -
        3 * borderThickness);
    positionElement(rightMenu, window.innerWidth -
        Controller.MenuBarDimensions.rightWidth -
        2 * borderThickness, Controller.MenuBarDimensions.topHeight + borderThickness);
    sizeElement(bottomMenu, window.innerWidth -
        Controller.MenuBarDimensions.leftWidth -
        Controller.MenuBarDimensions.rightWidth -
        4 * borderThickness, Controller.MenuBarDimensions.bottomHeight);
    positionElement(bottomMenu, Controller.MenuBarDimensions.leftWidth + borderThickness, window.innerHeight -
        Controller.MenuBarDimensions.bottomHeight -
        2 * borderThickness);
    resizeCallback(pos.new(leftMenu.getBoundingClientRect().width, topMenu.getBoundingClientRect().height), pos.new(-rightMenu.getBoundingClientRect().width, -bottomMenu.getBoundingClientRect().height));
};
const LastDimension = {
    topHeight: 100,
    leftWidth: 100,
    rightWidth: 100,
    bottomHeight: 100,
};
const minMaxOnDoubleClickNearBorder = () => {
    if (!menuResizeTarget)
        return;
    const id = menuResizeTarget.id;
    const border = idToDimensionKey[id];
    if (Controller.MenuBarDimensions[border] >= Controller.MinDimensions[border]) {
        LastDimension[border] = Controller.MenuBarDimensions[border];
        Controller.MenuBarDimensions[border] = 10;
    }
    else
        Controller.MenuBarDimensions[border] = LastDimension[border];
};
let menuResizeTarget = null;
const handleMouseMoveNearBorder = (event) => {
    if (resetResizeStateFlag) {
        resizeStart = null;
        menuResizeTarget = null;
        resetResizeStateFlag = false;
    }
    const p = pos.new(event.clientX, event.clientY);
    const left = leftMenu.getBoundingClientRect();
    const top = topMenu.getBoundingClientRect();
    const right = rightMenu.getBoundingClientRect();
    const bottom = bottomMenu.getBoundingClientRect();
    const leftBorder = Math.abs(p.x - left.width) <= 3;
    const rightBorder = Math.abs(p.x - right.x) <= 3;
    const topBorder = Math.abs(p.y - top.height) <= 3;
    const bottomBorder = Math.abs(p.y - bottom.y) <= 3;
    if (!menuResizeTarget && (leftBorder || rightBorder) && p.y > top.height) {
        body.style.cursor = "ew-resize";
        menuResizeTarget = leftBorder ? leftMenu : rightMenu;
    }
    else if (!menuResizeTarget &&
        (topBorder || bottomBorder) &&
        (bottomBorder ? p.x > left.width && p.x < right.x : true)) {
        body.style.cursor = "ns-resize";
        menuResizeTarget = topBorder ? topMenu : bottomMenu;
    }
    else if (!resizeStart) {
        body.style.cursor = "default";
        menuResizeTarget = null;
    }
    if (menuResizeTarget &&
        !resizableMenuBars.includes(menuResizeTarget.id)) {
        body.style.cursor = "default";
        menuResizeTarget = null;
    }
    if (!resizeStart || !menuResizeTarget)
        return;
    const id = menuResizeTarget.id;
    const border = idToDimensionKey[id];
    const shift = (border.includes("left") || border.includes("top") ? -1 : 1) *
        (border.includes("Width")
            ? resizeStart.x - event.clientX
            : resizeStart.y - event.clientY);
    if (Controller.MenuBarDimensions[border] <= Controller.MinDimensions[border] &&
        shift < 0)
        return;
    Controller.MenuBarDimensions[border] += shift;
    const distance = border.includes("Width")
        ? window.innerWidth -
            Controller.MenuBarDimensions.leftWidth -
            Controller.MenuBarDimensions.rightWidth
        : window.innerHeight -
            Controller.MenuBarDimensions.bottomHeight -
            Controller.MenuBarDimensions.topHeight;
    if (distance < 20) {
        Controller.MenuBarDimensions[border] -= shift;
        return;
    }
    resizeStart = pos.new(event.clientX, event.clientY);
};
let resizeStart = null;
const startResize = (event) => {
    if (!menuResizeTarget)
        return;
    if (!resizeStart)
        resizeStart = pos.new(event.clientX, event.clientY);
};
let resetResizeStateFlag = false;
const resetResizeState = () => {
    resetResizeStateFlag = true;
};
const initMenuBars = (onResize, options = {
    MinDimensions: Controller.MinDimensions,
    borderThickness: borderThickness,
    resizableMenus: resizableMenuBars,
}) => {
    if (options.MinDimensions)
        Controller.MinDimensions = options.MinDimensions;
    Object.freeze(Controller.MinDimensions);
    Object.seal(Controller);
    Object.seal(Controller.MenuBarDimensions);
    Controller.start();
    resizeCallback = onResize;
    if (options.resizableMenus)
        resizableMenuBars = options.resizableMenus;
    if (options.borderThickness)
        Controller.setBorderThickness(options.borderThickness);
    body.append(topMenu, leftMenu, rightMenu, bottomMenu);
    sizeMenuBars();
    return Controller;
};
export { sizeMenuBars };
export default initMenuBars;
