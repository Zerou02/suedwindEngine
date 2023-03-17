import { Coordinate2d, Dimensions } from "./types";

export const createCanvas = (width: number, height: number) => {
  let canvas = document.createElement("canvas") as HTMLCanvasElement;
  canvas.style.position = "absolute";
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const createButton = (
  dimensions: Dimensions,
  text: string,
  onClickFn: (e: MouseEvent) => void,
  id: string
) => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.style.position = "absolute";
  button.style.left = dimensions.x + "px";
  button.style.top = dimensions.y + "px";
  button.style.width = dimensions.w + "px";
  button.style.height = dimensions.h + "px";
  button.textContent = text;
  button.id = id;
  button.onclick = (e) => onClickFn(e);
  return button;
};

export const createLabel = (
  dimensions: Dimensions,
  text: string,
  id: string
) => {
  const item = document.createElement("p");
  item.style.position = "absolute";
  item.style.left = dimensions.x + "px";
  item.style.top = dimensions.y + "px";
  item.style.width = dimensions.w + "px";
  item.style.height = dimensions.h + "px";
  item.id = id;
  item.textContent = text;
  return item;
};

export const createDiv = (dimensions: Coordinate2d, id: string) => {
  const item = document.createElement("div");
  item.style.position = "absolute";
  item.style.left = dimensions.x + "px";
  item.style.top = dimensions.y + "px";
  item.id = id;
  return item;
};
