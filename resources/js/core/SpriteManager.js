export class SpriteManager {
    constructor(sprites = []) {
        this.addSprite = (sprite) => {
            this.sprites.push(sprite);
        };
        this.sprites = sprites;
    }
}
