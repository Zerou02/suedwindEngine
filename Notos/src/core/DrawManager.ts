import { Circle } from "./Circle.js";
import { DrawableObjectManager } from "./DrawableObjectManager.js";
import { gKeyBoardManager, gLoopManager } from "./globals.js";
import { LayerManager } from "./LayerManager.js";
import { Line } from "./Line.js";
import { Rectangle } from "./Rectangle.js";
import { Scene } from "./Scene.js";
import { Sprite } from "./Sprite.js";

export class DrawManager {
  drawableObjectManager: DrawableObjectManager;
  layerManager: LayerManager;
  _intervalID: number;

  constructor(scene: Scene) {
    this.layerManager = scene.layerManager;
    this.drawableObjectManager = scene.drawableObjectManager;

    gLoopManager.addFn(() => this.redrawFn());
  }

  redrawFn() {
    this.layerManager.orderedLayers.forEach((x) => {
      let ctx = x.canvas.getContext("2d") as CanvasRenderingContext2D;
      if (x.shouldRedraw) {
        ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
      }
      if (x.redrawRequested) {
        x.redrawRequested = false;
        ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
      }
    });

    Object.values(this.drawableObjectManager.drawableObjects).forEach((x) => {
      if (x.visible) {
        x.draw();
      }
    });
  }

  deconstruct() {
    clearInterval(this._intervalID);
    const canvases = Object.values(this.layerManager.layers);
    for (let a = 0; a < canvases.length; a++) {
      canvases[a].canvas.remove();
    }
  }
}
