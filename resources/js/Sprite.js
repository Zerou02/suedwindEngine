import { drawImage } from "./canvasUtils.js";
import { gSpriteManager } from "./globals.js";
import { assignID } from "./utils.js";
export class Sprite {
    constructor(src, layer, position = { x: 0, y: 0 }, size = { x: 0, y: 0 }) {
        this.move = (vector) => {
            this.transform.dimensions.x += vector.x;
            this.transform.dimensions.y += vector.y;
        };
        this.setSize = (w, h) => {
            this.transform.dimensions.h = w;
            this.transform.dimensions.w = h;
        };
        this.increaseSize = (rect) => {
            this.transform.dimensions.h += rect.y;
            this.transform.dimensions.w += rect.x;
        };
        this.rotate = (rotationDegrees) => {
            this.transform.dimensions.rotationDegrees = rotationDegrees;
        };
        this.setLayer = (layer) => {
            this.layer = layer;
            this.ctx = layer.canvas.getContext("2d");
        };
        this.draw = () => {
            const d = this.transform.dimensions;
            this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
        };
        this.src = src;
        this.layer = layer;
        this.imgElement = new Image();
        this.imgElement.src = src;
        this.ctx = layer.canvas.getContext("2d");
        drawImage(this.ctx, src, position, (img) => {
            this.imgElement = img;
            this.transform = {
                dimensions: {
                    x: position.x,
                    y: position.y,
                    h: size.y || this.imgElement.naturalHeight,
                    w: size.x || this.imgElement.naturalWidth,
                    rotationDegrees: 0,
                },
                layer: 0,
            };
            gSpriteManager.addSprite(this);
        });
        this.id = assignID();
    }
}
