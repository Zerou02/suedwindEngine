export class Rectangle {
    dimension;
    type;
    layer;
    scene;
    colour;
    constructor(dimensions, layer, scene, colour) {
        this.dimension = dimensions;
        this.layer = layer;
        this.scene = scene;
        this.colour = colour;
        scene.drawableObjectManager.addDrawable(this);
    }
    draw = () => {
        let ctx = this.layer.canvas.getContext("2d");
        let { h, w, x, y } = this.dimension;
        ctx.fillStyle = this.colour;
        ctx.fillRect(x, y, w, h);
    };
}
