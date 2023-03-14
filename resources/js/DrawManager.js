export class DrawManager {
    constructor(scene) {
        this.spriteManager = scene.spriteManager;
        this.layerManager = scene.layerManager;
        setInterval(() => this.redrawFn(), 1000 / 30);
    }
    redrawFn() {
        this.layerManager.orderedLayers.forEach((x) => {
            let ctx = x.canvas.getContext("2d");
            if (x.shouldRedraw) {
                ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
            }
        });
        Object.values(this.spriteManager.sprites).forEach((x) => {
            if (x.layer.shouldRedraw)
                x.draw();
        });
    }
}
