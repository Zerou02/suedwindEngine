import { LayerManager } from "./LayerManager.js";
import { Scene } from "./Scene.js";
import { SpriteManager } from "./SpriteManager.js";

export class DrawManager {
  spriteManager: SpriteManager;
  layerManager: LayerManager;
  constructor(scene: Scene) {
    this.spriteManager = scene.spriteManager;
    this.layerManager = scene.layerManager;

    setInterval(() => this.redrawFn(), 1000 / 30);
  }

  redrawFn() {
    this.layerManager.orderedLayers.forEach((x) => {
      let ctx = x.canvas.getContext("2d") as CanvasRenderingContext2D;
      if (x.shouldRedraw) {
        ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
      }
    });

    Object.values(this.spriteManager.sprites).forEach((x) => {
      if (x.layer.shouldRedraw) x.draw();
    });
  }
}
