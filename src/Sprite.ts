import { drawImage } from "./canvasUtils.js";
import { gSpriteManager } from "./globals.js";
import { Layer } from "./LayerManager.js";
import { SpriteManager } from "./SpriteManager.js";
import { Coordinate2d, Transform } from "./types.js";
import { assignID } from "./utils.js";

export class Sprite {
  transform: Transform;
  src: string;

  id: number;
  imgElement: HTMLImageElement;
  layer: Layer;
  ctx: CanvasRenderingContext2D;
  spriteManager: SpriteManager;

  constructor(
    src: string,
    layer: Layer,
    position: Coordinate2d = { x: 0, y: 0 },
    size: Coordinate2d = { x: 0, y: 0 }
  ) {
    this.src = src;
    this.layer = layer;
    this.imgElement = new Image();
    this.imgElement.src = src;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    drawImage(this.ctx, src, position, (img) => {
      this.imgElement = img;
      this.transform = {
        dimensions: {
          x: position.x,
          y: position.y,
          h: size.y || this.imgElement.naturalHeight,
          w: size.x || this.imgElement.naturalWidth,
          rotationDegrees: 0,
        },
        layer: 0,
      };
      gSpriteManager.addSprite(this);
    });
    this.id = assignID();
  }

  move = (vector: Coordinate2d) => {
    this.transform.dimensions.x += vector.x;
    this.transform.dimensions.y += vector.y;
  };

  setSize = (w: number, h: number) => {
    this.transform.dimensions.h = w;
    this.transform.dimensions.w = h;
  };

  increaseSize = (rect: Coordinate2d) => {
    this.transform.dimensions.h += rect.y;
    this.transform.dimensions.w += rect.x;
  };

  rotate = (rotationDegrees: number) => {
    this.transform.dimensions.rotationDegrees = rotationDegrees;
  };

  setLayer = (layer: Layer) => {
    this.layer = layer;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
  };
  // TODO: Rotation zeichnen
  draw = () => {
    const d = this.transform.dimensions;
    this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
  };
}
