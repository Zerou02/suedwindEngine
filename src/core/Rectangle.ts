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
  }
}
