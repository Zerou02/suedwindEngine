import { drawImage } from "./canvasUtils.js";
import { Layer } from "./Layer.js";
import { Scene } from "./Scene.js";
import { Coordinate2d, Dimensions } from "./types.js";
import { assignID } from "./utils.js";

export class Sprite {
  dimension: Dimensions;
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
    this.id = assignID();

    this.src = src;
    this.imgElement = new Image();
    this.imgElement.src = src;
    this.dimension = {
      x: position.x,
      y: position.y,
      h: size?.y || 0,
      w: size?.x || 0,
    };

    if (scene && layer) this.addToScene(scene, layer);
    return this;
  }

  addToScene = (scene: Scene, layer: Layer) => {
    this.layer = layer;
    this.scene = scene;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    let { x, y, w, h } = this.dimension;
    drawImage(this.ctx, this.src, { x, y }, { x: w, y: h }, (img) => {
      this.imgElement = img;
      if (w === null || h === null) {
        this.dimension.w = img.clientWidth;
        this.dimension.h = img.clientHeight;
      }
      this.scene.drawableObjectManager.addDrawable(this);
    });
  };

  move = (vector: Coordinate2d) => {
    this.dimension.x += vector.x;
    this.dimension.y += vector.y;
  };

  setSize = (w: number, h: number) => {
    this.dimension.h = w;
    this.dimension.w = h;
  };

  increaseSize = (rect: Coordinate2d) => {
    this.dimension.h += rect.y;
    this.dimension.w += rect.x;
  };

  setLayer = (layer: Layer) => {
    this.layer = layer;
    this.ctx = layer.canvas.getContext("2d") as CanvasRenderingContext2D;
  };

  draw = () => {
    const d = this.dimension;
    this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
  };
}
