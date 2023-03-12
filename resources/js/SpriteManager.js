export class SpriteManager {
    constructor(sprites = []) {
        this.orderedSprites = {};
        this.lowestLayer = 0;
        this.highestLayer = 0;
        this._findLayerExtrema = () => {
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
        this._addToMap = (sprite) => {
            let key = sprite.transform.layer.toString();
            if (!this.orderedSprites[key]) {
                this.orderedSprites[key] = [sprite];
            }
            else {
                this.orderedSprites[key].push(sprite);
            }
        };
        this.addSprite = (sprite) => {
            sprite.spriteManager = this;
            this.sprites.push(sprite);
            this._addToMap(sprite);
            this._findLayerExtrema();
        };
        this.reorderInMap = (sprite) => {
            Object.entries(this.orderedSprites).forEach(([key, value]) => {
                const index = value.findIndex((x) => x.id === sprite.id);
                if (index !== -1) {
                    value.splice(index, 1);
                }
            });
            this.orderedSprites[sprite.transform.layer.toString()].push(sprite);
        };
        this.sprites = sprites;
        this._findLayerExtrema();
        this.sprites.forEach((x) => {
            this._addToMap(x);
            x.spriteManager = this;
        });
    }
}
