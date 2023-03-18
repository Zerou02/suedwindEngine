export class SpriteManager {
    sprites;
    constructor(sprites = []) {
        this.sprites = sprites;
    }
    addSprite = (sprite) => {
        this.sprites.push(sprite);
    };
}
