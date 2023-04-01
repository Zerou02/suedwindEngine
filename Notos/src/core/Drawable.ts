import { Dimensions } from "./types.js";

export class Drawable {
  dimensions: Dimensions;
  visible: boolean;

  constructor(dimensions: Dimensions | null) {
    if (dimensions) this.dimensions = dimensions;
    this.visible = true;
  }

  draw() {}

  setVisibility(vis: boolean) {
    this.visible = vis;
  }

  moveTo(x: number, y: number) {
    this.dimensions = { x, y, w: this.dimensions.w, h: this.dimensions.h };
  }
}
