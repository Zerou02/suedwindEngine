import { Coordinate2d, Dimensions } from "./types.js";
import { Scene } from "./Scene.js";
import { Layer } from "./Layer.js";

export class Line {
  startPoint: Coordinate2d;
  endPoint: Coordinate2d;
  layer: Layer;
  scene: Scene;
  colour: string;

  constructor(
    startPoint: Coordinate2d,
    endPoint: Coordinate2d,
    colour: string,
    scene: Scene | null = null,
    layer: Layer | null = null
  ) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
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
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
  };
}
