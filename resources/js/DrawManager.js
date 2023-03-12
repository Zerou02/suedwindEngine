export class DrawManager {
    constructor(spriteManager, layerManager) {
        this.spriteManager = spriteManager;
        this.layerManager = layerManager;
        setInterval(() => {
            layerManager.orderedLayers.forEach((x) => {
                let ctx = x.canvas.getContext("2d");
                ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
            });
            Object.values(this.spriteManager.orderedSprites).forEach((x) => x.forEach((y) => y.draw()));
            1000 / 30;
        });
    }
}
