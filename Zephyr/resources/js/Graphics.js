import { body } from "./index.js";
import pos from "./Position.js";
let idCount = 0;
const getUniqueId = (prefix = "") => {
    idCount++;
    return `${prefix}-${idCount}`;
};
const c = document.createElement("canvas");
const context = c.getContext("2d");
const g = {
    origin: pos.new(15, 100),
    scale: 100,
    viewWidth: 100,
    viewHeight: 100,
    setSize: (width, height) => {
        g.viewWidth = width;
        g.viewHeight = height;
    },
    setOrigin: (x, y) => (g.origin = pos.new(x, y)),
    setScale: (scale) => (g.scale = scale),
};
const initGraphic = () => {
    body.addEventListener("mousemove", handleMouseMoveOnCanvas);
    body.append(c);
};
const setViewDimension = (viewOrigin = pos.new(100, 15), viewEnd = pos.new(-100, -15), scale = -1) => {
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
            g.setScale(Math.min((c.width - g.origin.x * 2) / width, (c.height - g.origin.y * 2) / height));
            g.setOrigin((c.width - g.scale * width) / 2, (c.height - g.scale * height) / 2);
        }
        else
            g.setScale(scale);
        context.font = `${g.scale / 2}px serif`;
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    sizeC();
    scaleG();
};
const w = {
    origin: pos.new(100, 100),
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
    },
};
const registerComp = (id = "", type, origin = pos.new(0, 0), end = pos.new(200, 200), zIndex = 0) => {
    if (!w.components[zIndex])
        w.components[zIndex] = [];
    w.components[zIndex].push({
        id: id ? id : getUniqueId(type),
        type,
        origin,
        end,
        color: "blue",
    });
};
const updateComp = (id, ...changes) => {
    Object.values(w.components).forEach((layer) => layer.forEach((comp) => {
        if (comp.id !== id)
            return;
        changes.forEach((change) => {
            if (comp[change.property])
                comp[change.property] = change.value;
        });
    }));
};
const shiftWorld = (shift) => {
    w.origin = pos.add(w.origin, shift);
};
const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "black";
    let origin = g.origin;
    let end = CoordConversion.ViewToScreen(pos.new(g.viewWidth, g.viewHeight));
    Object.entries(w.components)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .forEach(([_, comps]) => comps.forEach((comp) => {
        switch (comp.type) {
            case "rect":
                if (comp.color)
                    context.fillStyle = comp.color;
                let o = CoordConversion.WorldToScreen(comp.origin);
                if (o.x <= origin.x)
                    o.x = origin.x;
                if (o.y <= origin.y)
                    o.y = origin.y;
                let e = CoordConversion.WorldToScreen(comp.end);
                if (e.x > end.x)
                    e.x = end.x;
                if (e.y > end.y)
                    e.y = end.y;
                context.fillRect(o.x, o.y, e.x - o.x, e.y - o.y);
                break;
        }
    }));
};
const isInRect = (p, rectOrigin, rectEnd) => {
    return (p.x <= rectEnd.x &&
        p.x >= rectOrigin.x &&
        p.y <= rectEnd.y &&
        p.y >= rectOrigin.y);
};
const getWorldComponent = (pWorld) => {
    let target = null;
    const layers = Object.entries(w.components).sort((a, b) => Number(a[0]) - Number(b[0]));
    for (let i = 0; i < layers.length; i++) {
        const comps = layers[i][1];
        comps.forEach((comp) => {
            if (isInRect(pWorld, comp.origin, comp.end))
                target = comp;
        });
        if (target)
            break;
    }
    return target;
};
let hoveredWorldObject = null;
const handleMouseMoveOnCanvas = (event) => {
    const p = pos.new(event.clientX, event.clientY);
    if (!isInRect(p, g.origin, CoordConversion.ViewToScreen(pos.new(g.viewWidth, g.viewHeight)))) {
        hoveredWorldObject = null;
    }
    else
        hoveredWorldObject = getWorldComponent(CoordConversion.ScreenToWorld(p));
};
const CoordConversion = {
    ScreenToWorld: (pScreen) => pos.add(pos.add(CoordConversion.ScreenToView(pScreen), pos.negate(w.origin)), g.origin),
    ScreenToView: (pScreen) => pos.scale(1 / g.scale, pos.add(pScreen, pos.negate(g.origin))),
    ViewToScreen: (pView) => pos.add(g.origin, pos.scale(g.scale, pView)),
    ViewToWorld: (pView) => CoordConversion.ScreenToWorld(CoordConversion.ViewToScreen(pView)),
    WorldToScreen: (pWorld) => pos.add(pWorld, w.origin),
    WorldToView: (pWorld) => CoordConversion.ScreenToView(CoordConversion.WorldToScreen(pWorld)),
};
export { setViewDimension, draw, CoordConversion, registerComp, updateComp, shiftWorld, hoveredWorldObject, initGraphic, w, };
