import { assignID } from "./utils.js";
export const createCanvas = (x, y, width, height) => {
    let canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.left = x.toString() + "px";
    canvas.style.top = y.toString() + "px";
    canvas.width = width;
    canvas.height = height;
    return canvas;
};
export const createButton = (dimensions, text, onClickFn) => {
    const button = document.createElement("button");
    button.style.position = "absolute";
    button.style.left = dimensions.x + "px";
    button.style.top = dimensions.y + "px";
    button.style.width = dimensions.w + "px";
    button.style.height = dimensions.h + "px";
    button.textContent = text;
    button.id = assignID().toString();
    button.onclick = (e) => onClickFn(e);
    return button;
};
export const createLabel = (dimensions, text, id = null) => {
    const item = document.createElement("p");
    item.style.position = "absolute";
    item.style.left = dimensions.x + "px";
    item.style.top = dimensions.y + "px";
    item.style.width = dimensions.w + "px";
    item.style.height = dimensions.h + "px";
    item.id = id || assignID().toString();
    item.textContent = text;
    return item;
};
export const createDiv = (dimensions) => {
    const item = document.createElement("div");
    item.style.position = "absolute";
    item.style.left = dimensions.x + "px";
    item.style.top = dimensions.y + "px";
    item.id = assignID().toString();
    return item;
};
