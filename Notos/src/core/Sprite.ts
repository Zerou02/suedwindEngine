import { drawImage } from "./canvasUtils.js";
import { Drawable } from "./Drawable.js";
import { Layer } from "./Layer.js";
import { Scene } from "./Scene.js";
import { Coordinate2d, Dimensions } from "./types.js";
import { assignID } from "./utils.js";

export class Sprite extends Drawable {
  src: string;

  id: number;
  imgElement: HTMLImageElement;
  layer: Layer;
  ctx: CanvasRenderingContext2D;
  scene: Scene;

  constructor(
    src: string,
    position: Coordinate2d,
    size: Coordinate2d | null,
    scene: Scene | null = null,
    layer: Layer | null = null
  ) {
    super({
      x: position.x,
      y: position.y,
      h: size?.y || 0,
      w: size?.x || 0,
    });
    this.id = assignID();

    this.src = src;
    this.imgElement = new Image();
    this.imgElement.src = src;

    if (scene && layer) this.addToScene(scene, layer);
    return this;
  }

  addToScene = (scene: Scene, layer: Layer) => {
    this.layer = layer;
    this.scene = scene;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    let { x, y, w, h } = this.dimensions;
    drawImage(this.ctx, this.src, { x, y }, { x: w, y: h }, (img) => {
      this.imgElement = img;
      if (w === null || h === null) {
        this.dimensions.w = img.clientWidth;
        this.dimensions.h = img.clientHeight;
      }
      this.scene.drawableObjectManager.addDrawable(this);
    });
  };

  move = (vector: Coordinate2d) => {
    this.dimensions.x += vector.x;
    this.dimensions.y += vector.y;
  };

  setSize = (w: number, h: number) => {
    this.dimensions.h = w;
    this.dimensions.w = h;
  };

  increaseSize = (rect: Coordinate2d) => {
    this.dimensions.h += rect.y;
    this.dimensions.w += rect.x;
  };

  setLayer = (layer: Layer) => {
    this.layer = layer;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
  };

  draw = () => {
    const d = this.dimensions;
    this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
  };
}
