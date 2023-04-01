import { Drawable } from "./Drawable.js";
export class Rectangle extends Drawable {
    layer;
    scene;
    colour;
    mode;
    constructor(dimensions, colour, scene = null, layer = null, mode = "filled") {
        super(dimensions);
        this.colour = colour;
        this.mode = mode;
        if (scene && layer)
            this.addToScene(scene, layer);
    }
    addToScene = (scene, layer) => {
        this.layer = layer;
        this.scene = scene;
        scene.drawableObjectManager.addDrawable(this);
    };
    setMode(mode) {
        this.mode = mode;
    }
    draw = () => {
        let ctx = this.layer.canvas.getContext("2d");
        let { h, w, x, y } = this.dimensions;
        if (this.mode === "filled") {
            ctx.fillStyle = this.colour;
            ctx.fillRect(x, y, w, h);
        }
        else {
            ctx.strokeStyle = this.colour;
            ctx.strokeRect(x, y, w, h);
        }
    };
}
