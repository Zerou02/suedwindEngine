import { drawImage } from "./canvasUtils.js";
import { assignID } from "./utils.js";
export class Sprite {
    constructor(src, layer, position, size, scene) {
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
        this.setLayer = (layer) => {
            this.layer = layer;
            this.ctx = layer.canvas.getContext("2d");
        };
        this.draw = () => {
            const d = this.transform.dimensions;
            console.log(d.w, d.h);
            this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
        };
        this.src = src;
        this.layer = layer;
        this.imgElement = new Image();
        this.imgElement.src = src;
        this.ctx = layer.canvas.getContext("2d");
        this.scene = scene;
        this.transform = {
            dimensions: {
                x: position.x,
                y: position.y,
                h: size?.y || 0,
                w: size?.x || 0,
            },
            layer: 0,
        };
        console.log(this.transform);
        drawImage(this.ctx, src, position, size, (img) => {
            this.imgElement = img;
            if (size === null) {
                this.transform.dimensions.w = img.clientWidth;
                this.transform.dimensions.h = img.clientHeight;
            }
            this.scene.spriteManager.addSprite(this);
        });
        this.id = assignID();
    }
}
