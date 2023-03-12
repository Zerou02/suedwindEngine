export class DrawManager {
    constructor(spriteManager, layerManager) {
        this.spriteManager = spriteManager;
        this.layerManager = layerManager;
        setInterval(() => {
            layerManager.layers.forEach((x) => {
                let ctx = x.getContext("2d");
                ctx.clearRect(0, 0, x.width, x.height);
            });
            Object.values(this.spriteManager.orderedSprites).forEach((x) => x.forEach((y) => y.draw())),
                1000 / 30;
        });
    }
}
