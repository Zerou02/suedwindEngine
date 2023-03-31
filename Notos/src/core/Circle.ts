import { Coordinate2d, Dimensions } from "./types.js";
import { Layer } from "./Layer.js";
import { Scene } from "./Scene.js";

export class Circle {
  dimension: Dimensions;
  centre: Coordinate2d;
  radius: number;
  layer: Layer;
  scene: Scene;
  colour: string;

  constructor(
    centre: Coordinate2d,
    radius: number,
    colour: string,
    scene: Scene | null = null,
    layer: Layer | null = null
  ) {
    this.centre = centre;
    this.radius = radius;
    this.calcDimensionsFromRadius();
    this.colour = colour;
    if (scene && layer) this.addToScene(scene, layer);
  }

  calcDimensionsFromRadius() {
    this.dimension = {
      x: this.centre.x - this.radius,
      y: this.centre.y - this.radius,
      w: 2 * this.radius,
      h: 2 * this.radius,
    };
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
    ctx.beginPath();
    ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  };
}
