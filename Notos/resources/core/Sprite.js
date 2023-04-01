import { drawImage } from "./canvasUtils.js";
import { Drawable } from "./Drawable.js";
import { assignID } from "./utils.js";
export class Sprite extends Drawable {
    src;
    id;
    imgElement;
    layer;
    ctx;
    scene;
    constructor(src, position, size, scene = null, layer = null) {
        super({
            x: position.x,
            y: position.y,
            h: size?.y || 0,
            w: size?.x || 0,
        });
        this.id = assignID();
        this.src = src;
        this.imgElement = new Image();
        this.imgElement.src = src;
        if (scene && layer)
            this.addToScene(scene, layer);
        return this;
    }
    addToScene = (scene, layer) => {
        this.layer = layer;
        this.scene = scene;
        this.ctx = layer.canvas.getContext("2d");
        let { x, y, w, h } = this.dimensions;
        drawImage(this.ctx, this.src, { x, y }, { x: w, y: h }, (img) => {
            this.imgElement = img;
            if (w === null || h === null) {
                this.dimensions.w = img.clientWidth;
                this.dimensions.h = img.clientHeight;
            }
            this.scene.drawableObjectManager.addDrawable(this);
        });
    };
    move = (vector) => {
        this.dimensions.x += vector.x;
        this.dimensions.y += vector.y;
    };
    setSize = (w, h) => {
        this.dimensions.h = w;
        this.dimensions.w = h;
    };
    increaseSize = (rect) => {
        this.dimensions.h += rect.y;
        this.dimensions.w += rect.x;
    };
    setLayer = (layer) => {
        this.layer = layer;
        this.ctx = layer.canvas.getContext("2d");
    };
    draw = () => {
        const d = this.dimensions;
        this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
    };
}
