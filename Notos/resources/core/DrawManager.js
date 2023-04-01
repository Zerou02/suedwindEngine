import { gLoopManager } from "./globals.js";
export class DrawManager {
    drawableObjectManager;
    layerManager;
    _intervalID;
    constructor(scene) {
        this.layerManager = scene.layerManager;
        this.drawableObjectManager = scene.drawableObjectManager;
        gLoopManager.addFn(() => this.redrawFn());
    }
    redrawFn() {
        this.layerManager.orderedLayers.forEach((x) => {
            let ctx = x.canvas.getContext("2d");
            if (x.shouldRedraw) {
                ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
            }
            if (x.redrawRequested) {
                x.redrawRequested = false;
                ctx.clearRect(0, 0, x.canvas.width, x.canvas.height);
            }
        });
        Object.values(this.drawableObjectManager.drawableObjects).forEach((x) => {
            if (x.visible) {
                x.draw();
            }
        });
    }
    deconstruct() {
        clearInterval(this._intervalID);
        const canvases = Object.values(this.layerManager.layers);
        for (let a = 0; a < canvases.length; a++) {
            canvases[a].canvas.remove();
        }
    }
}
