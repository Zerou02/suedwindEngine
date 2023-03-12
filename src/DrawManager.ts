import { LayerManager } from "./LayerManager.js";
import { SpriteManager } from "./SpriteManager.js";

export class DrawManager {
  spriteManager: SpriteManager;
  layerManager: LayerManager;
  constructor(spriteManager: SpriteManager, layerManager: LayerManager) {
    this.spriteManager = spriteManager;
    this.layerManager = layerManager;

    setInterval(() => {
      layerManager.layers.forEach((x) => {
        let ctx = x.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, x.width, x.height);
      });

      Object.values(this.spriteManager.orderedSprites).forEach((x) =>
        x.forEach((y) => y.draw())
      ),
        1000 / 30;
    });
  }
}
