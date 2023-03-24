import { Dimensions } from "./types.js";
import { Layer } from "./LayerManager.js";
import { Scene } from "./Scene.js";
export class Rectangle {
  dimension: Dimensions;
  layer: Layer;
  scene: Scene;
  colour: string;

  constructor(
    dimensions: Dimensions,
    colour: string,
    scene: Scene | null = null,
    layer: Layer | null = null
  ) {
    this.dimension = dimensions;
    this.colour = colour;
    if (scene && layer) this.addToScene(scene, layer);
  }

  addToScene = (scene: Scene, layer: Layer) => {
    this.layer = layer;
    this.scene = scene;
    scene.drawableObjectManager.addDrawable(this);
  };

  draw = () => {
    let ctx = this.layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    let { h, w, x, y } = this.dimension;
    ctx.fillStyle = this.colour;
    ctx.fillRect(x, y, w, h);
  };
}
