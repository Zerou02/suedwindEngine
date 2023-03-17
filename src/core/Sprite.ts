import { drawImage } from "./canvasUtils.js";
import { Layer } from "./LayerManager.js";
import { Scene } from "./Scene.js";
import { Coordinate2d, Transform } from "./types.js";
import { assignID } from "./utils.js";

export class Sprite {
  transform: Transform;
  src: string;

  id: number;
  imgElement: HTMLImageElement;
  layer: Layer;
  ctx: CanvasRenderingContext2D;
  scene: Scene;

  constructor(
    src: string,
    layer: Layer,
    position: Coordinate2d,
    size: Coordinate2d | null,
    scene: Scene
  ) {
    this.src = src;
    this.layer = layer;
    this.imgElement = new Image();
    this.imgElement.src = src;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.scene = scene;
    this.transform = {
      dimensions: {
        x: position.x,
        y: position.y,
        h: size?.y || 0,
        w: size?.x || 0,
      },
      layer: 0,
    };

    console.log(this.transform);

    drawImage(this.ctx, src, position, size, (img) => {
      this.imgElement = img;
      if (size === null) {
        this.transform.dimensions.w = img.clientWidth;
        this.transform.dimensions.h = img.clientHeight;
      }
      this.scene.spriteManager.addSprite(this);
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

  setLayer = (layer: Layer) => {
    this.layer = layer;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
  };

  // TODO: Rotation zeichnen
  draw = () => {
    const d = this.transform.dimensions;
    console.log(d.w, d.h);

    this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
  };
}
