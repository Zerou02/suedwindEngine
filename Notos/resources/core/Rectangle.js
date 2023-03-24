export class Rectangle {
    dimension;
    layer;
    scene;
    colour;
    constructor(dimensions, colour, scene = null, layer = null) {
        this.dimension = dimensions;
        this.colour = colour;
        if (scene && layer)
            this.addToScene(scene, layer);
    }
    addToScene = (scene, layer) => {
        this.layer = layer;
        this.scene = scene;
        scene.drawableObjectManager.addDrawable(this);
    };
    draw = () => {
        let ctx = this.layer.canvas.getContext("2d");
        let { h, w, x, y } = this.dimension;
        ctx.fillStyle = this.colour;
        ctx.fillRect(x, y, w, h);
    };
}
