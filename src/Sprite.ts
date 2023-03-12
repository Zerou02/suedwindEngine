import { drawImage } from "./canvasUtils.js";
import { gSpriteManager } from "./globals.js";
import { SpriteManager } from "./SpriteManager.js";
import { Coordinate2d, Transform } from "./types.js";
import { assignID } from "./utils.js";

export class Sprite {
  transform: Transform;
  src: string;

  id: number;
  imgElement: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  spriteManager: SpriteManager;

  constructor(
    src: string,
    ctx: CanvasRenderingContext2D,
    position: Coordinate2d = { x: 0, y: 0 }
  ) {
    this.src = src;
    this.ctx = ctx;
    this.imgElement = new Image();
    this.imgElement.src = src;
    drawImage(ctx, src, position, (img) => {
      this.imgElement = img;
      this.transform = {
        dimensions: {
          x: position.x,
          y: position.y,
          h: this.imgElement.naturalHeight,
          w: this.imgElement.naturalWidth,
        },
        layer: 0,
      };
      gSpriteManager.addSprite(this);
      console.log(this.transform);
    });
    this.id = assignID();
  }

  move = (vector: Coordinate2d) => {
    this.transform.dimensions.x += vector.x;
    this.transform.dimensions.y += vector.y;
  };

  draw = () => {
    const d = this.transform.dimensions;
    this.ctx.drawImage(this.imgElement, d.x, d.y);
  };
}
