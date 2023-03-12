import { drawImage } from "./canvasUtils.js";
import { gSpriteManager } from "./globals.js";
import { assignID } from "./utils.js";
export class Sprite {
    constructor(src, ctx, position = { x: 0, y: 0 }) {
        this.move = (vector) => {
            this.transform.dimensions.x += vector.x;
            this.transform.dimensions.y += vector.y;
        };
        this.draw = () => {
            const d = this.transform.dimensions;
            this.ctx.drawImage(this.imgElement, d.x, d.y);
        };
        this.src = src;
        this.ctx = ctx;
        this.imgElement = new Image();
        this.imgElement.src = src;
        drawImage(ctx, src, position, (img) => {
            this.imgElement = img;
            this.transform = {
                dimensions: {
                    x: position.x,
                    y: position.y,
                    h: this.imgElement.naturalHeight,
                    w: this.imgElement.naturalWidth,
                },
                layer: 0,
            };
            gSpriteManager.addSprite(this);
            console.log(this.transform);
        });
        this.id = assignID();
    }
}
