import { DrawableObject } from "./types";

export class DrawableObjectManager {
  drawableObjects: DrawableObject[];

  constructor() {
    this.drawableObjects = [];
  }

  addDrawable = (drawable: DrawableObject) => {
    this.drawableObjects.push(drawable);
  };
}
