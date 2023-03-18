import { Dimensions } from "./types.js";
import { Layer } from "./LayerManager.js";
import { Scene } from "./Scene.js";
export class Rectangle {
  dimension: Dimensions;
  type: string;
  layer: Layer;
  scene: Scene;
  colour: string;

  constructor(
    dimensions: Dimensions,
    layer: Layer,
    scene: Scene,
    colour: string
  ) {
    this.dimension = dimensions;
    this.layer = layer;
    this.scene = scene;
    this.colour = colour;

    scene.drawableObjectManager.addDrawable(this);
  }

  draw = () => {
    let ctx = this.layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    let { h, w, x, y } = this.dimension;
    ctx.fillStyle = this.colour;
    ctx.fillRect(x, y, w, h);
  };
}
