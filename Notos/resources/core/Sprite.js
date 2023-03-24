import { drawImage } from "./canvasUtils.js";
import { assignID } from "./utils.js";
export class Sprite {
    dimension;
    src;
    id;
    imgElement;
    layer;
    ctx;
    scene;
    constructor(src, position, size, scene = null, layer = null) {
        this.id = assignID();
        this.src = src;
        this.imgElement = new Image();
        this.imgElement.src = src;
        this.dimension = {
            x: position.x,
            y: position.y,
            h: size?.y || 0,
            w: size?.x || 0,
        };
        if (scene && layer)
            this.addToScene(scene, layer);
        return this;
    }
    addToScene = (scene, layer) => {
        this.layer = layer;
        this.scene = scene;
        this.ctx = layer.canvas.getContext("2d");
        let { x, y, w, h } = this.dimension;
        drawImage(this.ctx, this.src, { x, y }, { x: w, y: h }, (img) => {
            this.imgElement = img;
            if (w === null || h === null) {
                this.dimension.w = img.clientWidth;
                this.dimension.h = img.clientHeight;
            }
            this.scene.drawableObjectManager.addDrawable(this);
        });
    };
    move = (vector) => {
        this.dimension.x += vector.x;
        this.dimension.y += vector.y;
    };
    setSize = (w, h) => {
        this.dimension.h = w;
        this.dimension.w = h;
    };
    increaseSize = (rect) => {
        this.dimension.h += rect.y;
        this.dimension.w += rect.x;
    };
    setLayer = (layer) => {
        this.layer = layer;
        this.ctx = layer.canvas.getContext("2d");
    };
    draw = () => {
        const d = this.dimension;
        this.ctx.drawImage(this.imgElement, d.x, d.y, d.w, d.h);
    };
}
