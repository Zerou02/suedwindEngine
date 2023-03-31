export class SpriteSheet {
    sprite;
    padding;
    tileSize;
    currentSelectedPicture;
    constructor(sprite, padding, tileSize) {
        this.sprite = sprite;
        this.padding = padding;
        this.tileSize = tileSize;
    }
}
