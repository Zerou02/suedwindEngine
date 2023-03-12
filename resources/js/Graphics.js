import { body } from "./index.js";
import pos from "./Position.js";
const createElement = (id = "", tag = "div", ...classes) => {
    const el = document.createElement(tag);
    el.id = id;
    el.classList.add(...classes);
    return el;
};
const sizeElement = (el, width, height) => {
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
};
const positionElement = (el, left, top) => {
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
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
    getScreenCoordinates: (xBoard, yBoard) => pos.add(g.origin, pos.scale(g.scale, pos.new(xBoard, yBoard))),
};
const w = {
    origin: pos.new(0, 0),
    components: {
        0: [
            { type: "rect", origin: pos.new(-100, -100), width: 1000, height: 600 },
        ],
    },
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
const getViewPos = (x, y) => {
    return pos.new(...Object.values(pos.scale(1 / g.scale, pos.add(pos.new(x, y), pos.scale(-1, g.origin)))).filter((_, i) => i < 2));
};
const getWorldPos = (x, y) => {
    return pos.add(pos.add(getViewPos(x, y), pos.scale(-1, w.origin)), g.origin);
};
const initGraphic = (viewOrigin = pos.new(100, 15), viewEnd = pos.new(-100, -15), scale = -1) => {
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
    w.origin = pos.new(g.origin.x + g.viewWidth / 2, g.origin.y + g.viewHeight / 2);
};
const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "red";
    let origin = pos.new(w.origin.x >= g.origin.x ? w.origin.x : g.origin.x, w.origin.y >= g.origin.y ? w.origin.y : g.origin.y);
    let end = pos.add(g.origin, pos.new(g.scale * g.viewWidth, g.scale * g.viewHeight));
    Object.values(w.components).forEach((comps) => comps.forEach((comp) => {
        switch (comp.type) {
            case "rect":
                let o = pos.add(comp.origin, origin);
                if (o.x <= g.origin.x)
                    o.x = g.origin.x;
                if (o.y <= g.origin.y)
                    o.y = g.origin.y;
                let e = pos.add(o, pos.new(comp.width, comp.height));
                if (e.x > end.x)
                    e.x = end.x;
                if (e.y > end.y)
                    e.y = end.y;
                context.fillRect(o.x, o.y, e.x - o.x, e.y - o.y);
                break;
        }
    }));
};
export { initGraphic, createElement, sizeElement, positionElement, draw, getWorldPos, };
