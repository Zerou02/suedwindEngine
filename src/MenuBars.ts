import { createElement, positionElement, sizeElement } from "./DOM.js";
import { body } from "./index.js";
import pos, { Position } from "./Position.js";

const Controller = {
  borderThickness: 2,
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
  pause: () => {
    window.removeEventListener("mousemove", handleMouseMoveNearBorder);
    window.removeEventListener("mousedown", startResize);
    window.removeEventListener("mouseup", resetResizeState);
  },
  start: () => {
    window.addEventListener("resize", sizeMenuBars);
    window.addEventListener("mousemove", handleMouseMoveNearBorder);
    window.addEventListener("mousedown", startResize);
    window.addEventListener("mouseup", resetResizeState);
  },
  close: () => {
    Controller.pause();
    window.removeEventListener("resize", sizeMenuBars);
    topMenu.remove();
    leftMenu.remove();
    rightMenu.remove();
    bottomMenu.remove();
  },
};

const topMenu = createElement("top", "div", "menuBar") as HTMLDivElement;
const leftMenu = createElement("left", "div", "menuBar") as HTMLDivElement;
const rightMenu = createElement("right", "div", "menuBar") as HTMLDivElement;
const bottomMenu = createElement("bottom", "div", "menuBar") as HTMLDivElement;

let resizeCallback: (origin: Position, end: Position) => void = (
  origin: Position,
  end: Position
) => {
  console.log("No resizeCallback set.");
  console.log(origin, end);
};
const sizeMenuBars = () => {
  sizeElement(
    topMenu,
    window.innerWidth - 4,
    Controller.MenuBarDimensions.topHeight
  );
  positionElement(topMenu, 0, 0);
  sizeElement(
    leftMenu,
    Controller.MenuBarDimensions.leftWidth,
    window.innerHeight -
      Controller.MenuBarDimensions.topHeight -
      3 * Controller.borderThickness
  );
  positionElement(
    leftMenu,
    0,
    Controller.MenuBarDimensions.topHeight + Controller.borderThickness
  );
  sizeElement(
    rightMenu,
    Controller.MenuBarDimensions.rightWidth,
    window.innerHeight -
      Controller.MenuBarDimensions.topHeight -
      3 * Controller.borderThickness
  );
  positionElement(
    rightMenu,
    window.innerWidth -
      Controller.MenuBarDimensions.rightWidth -
      2 * Controller.borderThickness,
    Controller.MenuBarDimensions.topHeight + Controller.borderThickness
  );
  sizeElement(
    bottomMenu,
    window.innerWidth -
      Controller.MenuBarDimensions.leftWidth -
      Controller.MenuBarDimensions.rightWidth -
      4 * Controller.borderThickness,
    Controller.MenuBarDimensions.bottomHeight
  );
  positionElement(
    bottomMenu,
    Controller.MenuBarDimensions.leftWidth + Controller.borderThickness,
    window.innerHeight -
      Controller.MenuBarDimensions.bottomHeight -
      2 * Controller.borderThickness
  );
  resizeCallback(
    pos.new(
      leftMenu.getBoundingClientRect().width,
      topMenu.getBoundingClientRect().height
    ),
    pos.new(
      -rightMenu.getBoundingClientRect().width,
      -bottomMenu.getBoundingClientRect().height
    )
  );
};

let menuResizeTarget: HTMLDivElement | null = null;
const handleMouseMoveNearBorder = (event: MouseEvent) => {
  const p = pos.new(event.clientX, event.clientY);
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
  } else if ((topBorder || bottomBorder) && p.x > left.width && p.x < right.x) {
    body.style.cursor = "ns-resize";
    menuResizeTarget = topBorder ? topMenu : bottomMenu;
  } else {
    body.style.cursor = "default";
    if (!resizeStart) menuResizeTarget = null;
  }
  if (!resizeStart || !menuResizeTarget) return;
  const id = menuResizeTarget.id;
  const border = (id +
    (id === "left" || id === "right" ? "Width" : "Height")) as
    | "leftWidth"
    | "rightWidth"
    | "topHeight"
    | "bottomHeight";
  const shift =
    (border.includes("left") || border.includes("top") ? -1 : 1) *
    (border.includes("Width")
      ? resizeStart.x - event.clientX
      : resizeStart.y - event.clientY);
  if (
    Controller.MenuBarDimensions[border] <= Controller.MinDimensions[border] &&
    shift < 0
  )
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
  sizeMenuBars();
};

let resizeStart: Position | null = null;
const startResize = (event: MouseEvent) => {
  if (!menuResizeTarget) return;
  if (!resizeStart) resizeStart = pos.new(event.clientX, event.clientY);
};

const resetResizeState = () => {
  resizeStart = null;
  menuResizeTarget = null;
};

const initMenuBars = (
  onResize: (origin: Position, end: Position) => void,
  MinDimensions: {
    leftWidth: number;
    rightWidth: number;
    topHeight: number;
    bottomHeight: number;
  } = Controller.MinDimensions
) => {
  Controller.MinDimensions = MinDimensions;
  Object.freeze(Controller.MinDimensions);
  Object.freeze(Controller.start);
  Object.freeze(Controller.pause);
  Object.freeze(Controller.close);
  Object.seal(Controller);
  Object.seal(Controller.MenuBarDimensions);
  Controller.start();
  resizeCallback = onResize;

  body.append(topMenu, leftMenu, rightMenu, bottomMenu);

  sizeMenuBars();

  return Controller;
};

export default initMenuBars;
