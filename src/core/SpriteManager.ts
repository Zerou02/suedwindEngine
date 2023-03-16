import type { Sprite } from "./Sprite.js";

export class SpriteManager {
  sprites: Sprite[];

  constructor(sprites: Sprite[] = []) {
    this.sprites = sprites;
  }

  addSprite = (sprite: Sprite) => {
    this.sprites.push(sprite);
  };
}
