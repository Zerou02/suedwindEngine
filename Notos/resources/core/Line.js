export class Line {
    startPoint;
    endPoint;
    layer;
    scene;
    colour;
    constructor(startPoint, endPoint, colour, scene = null, layer = null) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
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
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
    };
}
