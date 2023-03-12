import type { Sprite } from "./Sprite.js";

interface OrderedSpriteMap {
  [key: string]: Sprite[];
}
export class SpriteManager {
  sprites: Sprite[];
  orderedSprites: OrderedSpriteMap = {};
  lowestLayer = 0;
  highestLayer = 0;

  constructor(sprites: Sprite[] = []) {
    this.sprites = sprites;

    this._findLayerExtrema();
    this.sprites.forEach((x) => {
      this._addToMap(x);
      x.spriteManager = this;
    });

    setInterval(() => {
      Object.values(this.orderedSprites).forEach((x) =>
        x.forEach((y) => y.draw())
      ),
        1000 / 30;
    });
  }

  _findLayerExtrema = () => {
    let localLowest = 999;
    let localHighest = 0;
    this.sprites.forEach((x) => {
      if (x.transform.layer < localLowest) {
        localLowest = x.transform.layer;
      }
      if (x.transform.layer > localHighest) {
        localHighest = x.transform.layer;
      }
    });
  };

  _addToMap = (sprite: Sprite) => {
    let key = sprite.transform.layer.toString();
    if (!this.orderedSprites[key]) {
      this.orderedSprites[key] = [sprite];
    } else {
      this.orderedSprites[key].push(sprite);
    }
  };

  addSprite = (sprite: Sprite) => {
    sprite.spriteManager = this;
    this.sprites.push(sprite);
    this._addToMap(sprite);
    this._findLayerExtrema();
  };

  reorderInMap = (sprite: Sprite) => {
    Object.entries(this.orderedSprites).forEach(([key, value]) => {
      const index = value.findIndex((x) => x.id === sprite.id);
      if (index !== -1) {
        value.splice(index, 1);
      }
    });
    this.orderedSprites[sprite.transform.layer.toString()].push(sprite);
  };
}
