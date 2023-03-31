import { Sprite } from "../Sprite.js";
import { Coordinate2d } from "../types.js";

export class SpriteSheet {
  sprite: Sprite;
  padding: number;
  tileSize: number;
  currentSelectedPicture: Coordinate2d | null;

  constructor(sprite: Sprite, padding: number, tileSize: number) {
    this.sprite = sprite;
    this.padding = padding;
    this.tileSize = tileSize;
  }
}
