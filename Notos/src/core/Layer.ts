import { LayerManager } from "./LayerManager.js";
import { Line } from "./Line.js";
import { createCanvas } from "./menuItems.js";
import { Dimensions } from "./types";

export class Layer {
  dimensions: Dimensions;
  canvas: HTMLCanvasElement;
  name: String;
  // zIndex
  level: number;
  shouldRedraw: boolean;
  layerManager: LayerManager;

  constructor(
    dimensions: Dimensions,
    name: string,
    level: number,
    shouldRedraw: boolean,
    layerManager: LayerManager | null
  ) {
    this.dimensions = dimensions;
    this.canvas = createCanvas(
      dimensions.x,
      dimensions.y,
      dimensions.w,
      dimensions.h
    );
    this.canvas.style.zIndex = level.toString();
    this.name = name;
    this.level = level;
    this.shouldRedraw = shouldRedraw;
    if (layerManager) this.addToLayerManager(layerManager);
  }

  addToLayerManager(layerManager: LayerManager) {
    this.layerManager = layerManager;
    layerManager.addLayerL(this);
  }

  moveTo(x: number, y: number) {
    this.canvas.style.left = x.toString() + "px";
    this.canvas.style.top = y.toString() + "px";
  }

  addBorder() {
    this.canvas.style.border = "1px solid black";
  }
}
