import { body } from "./index.js";
import { pressedKeys } from "./Loop.js";
import pos, { Position } from "./Position.js";

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
};

const setViewDimension = (
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
};

type WorldObjects = {
  type: string;
  origin: Position;
  end: Position;
};

const w = {
  origin: pos.new(100, 100),
  //Keeps track of all the things in the world, sorted in Layers
  components: {
    0: [{ type: "rect", origin: pos.new(-100, -100), end: pos.new(900, 500) }],
  } as { [keys: number]: WorldObjects[] },
};

const draw = () => {
  if ("w" in pressedKeys) w.origin = pos.add(w.origin, pos.new(0, -1));
  if ("s" in pressedKeys) w.origin = pos.add(w.origin, pos.new(0, 1));
  if ("a" in pressedKeys) w.origin = pos.add(w.origin, pos.new(-1, 0));
  if ("d" in pressedKeys) w.origin = pos.add(w.origin, pos.new(1, 0));
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
          let e = pos.add(o, pos.add(comp.end, pos.negate(comp.origin)));
          if (e.x > end.x) e.x = end.x;
          if (e.y > end.y) e.y = end.y;
          context.fillRect(o.x, o.y, e.x - o.x, e.y - o.y);
          break;
      }
    })
  );
};

const CoordConversion = {
  ScreenToWorld: (pScreen: Position) =>
    pos.add(
      pos.add(CoordConversion.ScreenToView(pScreen), pos.negate(w.origin)),
      g.origin
    ),
  ScreenToView: (pScreen: Position) =>
    pos.scale(1 / g.scale, pos.add(pScreen, pos.negate(g.origin))),
  ViewToScreen: (pView: Position) =>
    pos.add(g.origin, pos.scale(g.scale, pView)),
  ViewToWorld: (pView: Position) =>
    CoordConversion.ScreenToWorld(CoordConversion.ViewToScreen(pView)),
  WorldToScreen: (pWorld: Position) => pos.add(pWorld, w.origin),
  WorldToView: (pWorld: Position) =>
    CoordConversion.ScreenToView(CoordConversion.WorldToScreen(pWorld)),
};

export { setViewDimension, draw, CoordConversion };
