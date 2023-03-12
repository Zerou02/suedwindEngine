import { body } from "./index.js";
import pos, { Position } from "./Position.js";

const createElement = (
  id: string = "",
  tag: string = "div",
  ...classes: string[]
) => {
  const el = document.createElement(tag);
  el.id = id;
  el.classList.add(...classes);
  return el;
};

const sizeElement = (el: HTMLElement, width: number, height: number) => {
  el.style.width = `${width}px`;
  el.style.height = `${height}px`;
};

const positionElement = (el: HTMLElement, left: number, top: number) => {
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
};

const c = document.createElement("canvas");
const context = c.getContext("2d") as CanvasRenderingContext2D;

const g = {
  origin: pos.new(15, 100),
  scale: 100,
  viewWidth: 100,
  viewHeight: 100,
  setSize: (width: number, height: number) => {
    g.viewWidth = width;
    g.viewHeight = height;
  },
  setOrigin: (x: number, y: number) => (g.origin = pos.new(x, y)),
  setScale: (scale: number) => (g.scale = scale),
  getScreenCoordinates: (xBoard: number, yBoard: number) =>
    pos.add(g.origin, pos.scale(g.scale, pos.new(xBoard, yBoard))),
};

type WorldObjects = {
  type: string;
  origin: Position;
  width: number;
  height: number;
};

const w = {
  origin: pos.new(0, 0),
  //Keeps track of all the things in the world, sorted in Layers
  components: {
    0: [
      { type: "rect", origin: pos.new(-100, -100), width: 1000, height: 600 },
    ],
  } as { [keys: number]: WorldObjects[] },
};
window.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "w":
      w.origin = pos.add(w.origin, pos.new(0, -1));
      break;
    case "s":
      w.origin = pos.add(w.origin, pos.new(0, 1));
      break;
    case "a":
      w.origin = pos.add(w.origin, pos.new(-1, 0));
      break;
    case "d":
      w.origin = pos.add(w.origin, pos.new(1, 0));
      break;
  }
});

const getViewPos = (x: number, y: number) => {
  return pos.new(
    ...(Object.values(
      pos.scale(1 / g.scale, pos.add(pos.new(x, y), pos.scale(-1, g.origin)))
    ).filter((_, i) => i < 2) as [number, number])
  );
};

const getWorldPos = (x: number, y: number) => {
  return pos.add(pos.add(getViewPos(x, y), pos.scale(-1, w.origin)), g.origin);
};

const initGraphic = (
  viewOrigin: Position = pos.new(100, 15),
  viewEnd: Position = pos.new(-100, -15),
  scale: number = -1
) => {
  const width = window.innerWidth - viewOrigin.x + viewEnd.x;
  const height = window.innerHeight - viewOrigin.y + viewEnd.y;
  body.append(c);
  g.setSize(width, height);
  const sizeC = () => {
    c.style.width = `${window.innerWidth}px`;
    c.style.height = `${window.innerHeight}px`;
    c.width = window.innerWidth * window.devicePixelRatio;
    c.height = window.innerHeight * window.devicePixelRatio;
  };
  const scaleG = () => {
    g.setOrigin(viewOrigin.x, viewOrigin.y);
    if (scale === -1) {
      g.setScale(
        Math.min(
          (c.width - g.origin.x * 2) / width,
          (c.height - g.origin.y * 2) / height
        )
      );
      g.setOrigin(
        (c.width - g.scale * width) / 2,
        (c.height - g.scale * height) / 2
      );
    } else g.setScale(scale);
    context.font = `${g.scale / 2}px serif`;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  sizeC();
  scaleG();
  w.origin = pos.new(
    g.origin.x + g.viewWidth / 2,
    g.origin.y + g.viewHeight / 2
  );
};

const draw = () => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "red";
  let origin = pos.new(
    w.origin.x >= g.origin.x ? w.origin.x : g.origin.x,
    w.origin.y >= g.origin.y ? w.origin.y : g.origin.y
  );
  let end = pos.add(
    g.origin,
    pos.new(g.scale * g.viewWidth, g.scale * g.viewHeight)
  );
  Object.values(w.components).forEach((comps) =>
    comps.forEach((comp) => {
      switch (comp.type) {
        case "rect":
          let o = pos.add(comp.origin, origin);
          if (o.x <= g.origin.x) o.x = g.origin.x;
          if (o.y <= g.origin.y) o.y = g.origin.y;
          let e = pos.add(o, pos.new(comp.width, comp.height));
          if (e.x > end.x) e.x = end.x;
          if (e.y > end.y) e.y = end.y;
          context.fillRect(o.x, o.y, e.x - o.x, e.y - o.y);
          break;
      }
    })
  );
};

export {
  initGraphic,
  createElement,
  sizeElement,
  positionElement,
  draw,
  getWorldPos,
};
