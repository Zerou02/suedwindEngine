import { body } from "./index.js";
import pos, { Position } from "./Position.js";

let idCount = 0;
const getUniqueId = (prefix: string = "") => {
  idCount++;
  return `${prefix}-${idCount}`;
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
};

const initGraphic = () => {
  body.addEventListener("mousemove", handleMouseMoveOnCanvas);
  body.append(c);
};

const setViewDimension = (
  viewOrigin: Position = pos.new(100, 15),
  viewEnd: Position = pos.new(-100, -15),
  scale: number = -1
) => {
  const width = window.innerWidth - viewOrigin.x + viewEnd.x;
  const height = window.innerHeight - viewOrigin.y + viewEnd.y;
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

type WorldObject = {
  id: string;
  type: string;
  origin: Position;
  end: Position;
  color?: string;
};

const w = {
  origin: pos.new(100, 100),
  //Keeps track of all the things in the world, sorted in Layers
  components: {
    0: [
      {
        id: "test",
        type: "rect",
        origin: pos.new(-100, -100),
        end: pos.new(900, 500),
        color: "red",
      },
    ],
  } as { [keys: number]: WorldObject[] },
};

const registerComp = (
  id: string = "",
  type: "rect",
  origin: Position = pos.new(0, 0),
  end: Position = pos.new(200, 200),
  zIndex: number = 0
) => {
  if (!w.components[zIndex]) w.components[zIndex] = [];
  w.components[zIndex].push({
    id: id ? id : getUniqueId(type),
    type,
    origin,
    end,
    color: "blue",
  });
};

const updateComp = (
  id: string,
  ...changes: { property: string; value: any }[]
) => {
  Object.values(w.components).forEach((layer) =>
    layer.forEach((comp) => {
      if (comp.id !== id) return;
      changes.forEach((change) => {
        if ((comp as any)[change.property])
          (comp as any)[change.property] = change.value;
      });
    })
  );
};

const shiftWorld = (shift: Position) => {
  w.origin = pos.add(w.origin, shift);
};

const draw = () => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "black";
  let origin = g.origin;
  let end = CoordConversion.ViewToScreen(pos.new(g.viewWidth, g.viewHeight));
  Object.entries(w.components)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .forEach(([_, comps]) =>
      comps.forEach((comp) => {
        switch (comp.type) {
          case "rect":
            if (comp.color) context.fillStyle = comp.color;
            let o = CoordConversion.WorldToScreen(comp.origin);
            if (o.x <= origin.x) o.x = origin.x;
            if (o.y <= origin.y) o.y = origin.y;
            let e = CoordConversion.WorldToScreen(comp.end);
            if (e.x > end.x) e.x = end.x;
            if (e.y > end.y) e.y = end.y;
            context.fillRect(o.x, o.y, e.x - o.x, e.y - o.y);
            break;
        }
      })
    );
};

const isInRect = (p: Position, rectOrigin: Position, rectEnd: Position) => {
  return (
    p.x <= rectEnd.x &&
    p.x >= rectOrigin.x &&
    p.y <= rectEnd.y &&
    p.y >= rectOrigin.y
  );
};

const getWorldComponent = (pWorld: Position) => {
  let target: WorldObject | null = null;
  const layers = Object.entries(w.components).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  for (let i = 0; i < layers.length; i++) {
    const comps = layers[i][1];
    comps.forEach((comp) => {
      if (isInRect(pWorld, comp.origin, comp.end)) target = comp;
    });
    if (target) break;
  }
  return target;
};

let hoveredWorldObject: WorldObject | null = null;
const handleMouseMoveOnCanvas = (event: MouseEvent) => {
  const p = pos.new(event.clientX, event.clientY);
  if (
    !isInRect(
      p,
      g.origin,
      CoordConversion.ViewToScreen(pos.new(g.viewWidth, g.viewHeight))
    )
  ) {
    hoveredWorldObject = null;
  } else
    hoveredWorldObject = getWorldComponent(CoordConversion.ScreenToWorld(p));
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

export {
  setViewDimension,
  draw,
  CoordConversion,
  registerComp,
  updateComp,
  shiftWorld,
  hoveredWorldObject,
  initGraphic,
};
