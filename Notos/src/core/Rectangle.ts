import { Dimensions } from "./types.js";
import { Layer } from "./Layer.js";
import { Scene } from "./Scene.js";
import { Drawable } from "./Drawable.js";
export class Rectangle extends Drawable {
  layer: Layer;
  scene: Scene;
  colour: string;
  mode: "filled" | "outline";

  constructor(
    dimensions: Dimensions,
    colour: string,
    scene: Scene | null = null,
    layer: Layer | null = null,
    mode: "filled" | "outline" = "filled"
  ) {
    super(dimensions);
    this.colour = colour;
    this.mode = mode;
    if (scene && layer) this.addToScene(scene, layer);
  }

  addToScene = (scene: Scene, layer: Layer) => {
    this.layer = layer;
    this.scene = scene;
    scene.drawableObjectManager.addDrawable(this);
  };

  setMode(mode: "filled" | "outline") {
    this.mode = mode;
  }

  draw = () => {
    let ctx = this.layer.canvas.getContext("2d") as CanvasRenderingContext2D;
    let { h, w, x, y } = this.dimensions;
    if (this.mode === "filled") {
      ctx.fillStyle = this.colour;
      ctx.fillRect(x, y, w, h);
    } else {
      ctx.strokeStyle = this.colour;
      ctx.strokeRect(x, y, w, h);
    }
  };
}
