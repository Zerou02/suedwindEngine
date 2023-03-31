export class Circle {
    dimension;
    centre;
    radius;
    layer;
    scene;
    colour;
    constructor(centre, radius, colour, scene = null, layer = null) {
        this.centre = centre;
        this.radius = radius;
        this.calcDimensionsFromRadius();
        this.colour = colour;
        if (scene && layer)
            this.addToScene(scene, layer);
    }
    calcDimensionsFromRadius() {
        this.dimension = {
            x: this.centre.x - this.radius,
            y: this.centre.y - this.radius,
            w: 2 * this.radius,
            h: 2 * this.radius,
        };
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
        ctx.beginPath();
        ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    };
}
