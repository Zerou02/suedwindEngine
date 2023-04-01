export class SpriteSheet {
    sprite;
    padding;
    tileSize;
    totalTileSize;
    currentSelectedPicture;
    constructor(sprite, padding, tileSize) {
        this.sprite = sprite;
        this.padding = padding;
        this.tileSize = tileSize;
        this.totalTileSize = 2 * padding + tileSize;
    }
}
